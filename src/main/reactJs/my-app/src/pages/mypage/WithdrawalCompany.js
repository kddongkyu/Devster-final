import React, { useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmailRegChk,
  setEmailRegInput,
  setIsEmailSent,
  setSeconds,
} from "../../redux/normMemberSlice";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function WithdrawalCompany(props) {
  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const [companyMember, setCompanyMember] = useState({
    cm_email: "",
  });

  const getCompMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/compmember/D1/${idx}`);
      setCompanyMember(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  useEffect(() => {
    getCompMemberData(decodedToken.idx);
  }, [decodedToken.idx]);

  const dispatch = useDispatch();
  const cm_email = companyMember.cm_email;
  const seconds = useSelector((state) => state.norm.seconds);
  const emailRegInput = useSelector((state) => state.norm.emailRegInput);
  // const emailIsValid = useSelector(state => state.norm.emailIsValid);
  const isEmailSent = useSelector((state) => state.norm.isEmailSent);
  const emailRegChk = useSelector((state) => state.norm.emailRegChk);
  const [emailRegNum, setEmailRegNum] = useState("");

  const handleSendButton = async () => {
    try {
      const res = await axiosIns({
        method: "post",
        url: "/api/compmember/D0/email/validation",
        data: JSON.stringify({ cm_email: cm_email }),
        headers: { "Content-Type": "application/json" },
      });

      if (res?.status === 200) {
        dispatch(setIsEmailSent(true));
        dispatch(setSeconds(30));
        setEmailRegNum(res.data);
        dispatch(setEmailRegInput(""));
        alert(
          isEmailSent
            ? "인증번호가 재발송되었습니다."
            : "인증번호가 발송되었습니다."
        );
      } else {
        dispatch(setIsEmailSent(false));
        alert("인증번호 발송에 실패했습니다.\n잠시후 다시 시도해주세요.");
      }
    } catch (e) {
      dispatch(setIsEmailSent(false));
      jwtHandleError(e, toastAlert);
    }
  };

  const handleEmailRegChange = (e) => {
    dispatch(setEmailRegInput(e.target.value));
  };

  const handleRegChk = () => {
    if (isEmailSent && emailRegNum === emailRegInput) {
      dispatch(setEmailRegChk(true));
      dispatch(setSeconds(null));
      alert("인증 되었습니다.");
    } else {
      dispatch(setEmailRegChk(false));
      alert("인증에 실패했습니다.\n인증번호를 확인해주세요.");
    }
  };

  useEffect(() => {}, [emailRegChk]);

  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;
  let timerMessage = "";

  useEffect(() => {
    if (isEmailSent && seconds > 0) {
      const regTimer = setTimeout(() => {
        dispatch(setSeconds(seconds - 1));
      }, 1000);
      return () => clearTimeout(regTimer);
    } else if (seconds !== null && seconds <= 0) {
      dispatch(setEmailRegChk(false));
    }
  }, [isEmailSent, seconds]);

  if (isEmailSent && seconds > 0) {
    timerMessage = (
      <span>
        남은 인증시간 :{minutes < 30 ? "0" : ""}
        {minutes}:{displaySeconds < 30 ? "0" : ""}
        {displaySeconds}
      </span>
    );
  } else if (emailRegChk) {
    timerMessage = <span style={{ color: "#721ea6" }}>인증 되었습니다.</span>;
  } else if (isEmailSent && seconds <= 0) {
    timerMessage = <span>인증시간이 만료되었습니다.</span>;
  }

  const navigate = useNavigate();

  const handleSignOut = async () => {
    const confirmSignOut = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirmSignOut) {
      try {
        const res = await axios({
          method: "delete",
          url: "/api/compmember/D1",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
        });
        if (res?.status === 200) {
          alert("탈퇴가 완료되었습니다.");
          localStorage.clear();
          navigate("/signin");
        }
      } catch (e) {
        jwtHandleError(e, toastAlert);
      }
    }
  };

  return (
    <div className="withrawal">
      <div className="content-withrawal-guest">
        <b className="text-constent-withdrawal">계정 탈퇴</b>
        <b className="text-before-withdrawal">
          <p className="p">회원 탈퇴 전, 안내 사항을 꼭 확인해주세요.</p>
        </b>
        <b className="text-withdrawal-confirm-01">
          <ul className="ul">1) 탈퇴 아이디 복구 불가</ul>
        </b>
        <div className="text-withdrawal-confirm-conten">
          <p className="p">
            탈퇴 후에는 아이디와 데이터 복구가 불가능합니다. 신중하게
            선택해주세요.
          </p>
        </div>
        <b className="text-withdrawal-confirm-02">
          <ul className="ul">2) 서비스 이용기록 삭제</ul>
        </b>
        <div className="text-withdrawal-confirm-conten1">
          <p className="p">
            서비스 이용 기록이 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.
            필요한 데이터는 미리 백업을 해두시기 바랍니다.
          </p>
        </div>
        <div className="content-withrawal-child" />
        <b className="text-user-confirm">본인 확인</b>
        <div className="user-email-confirm">
          본인 확인을 위해 이메일을 입력해주세요.
        </div>
        <div className="text-content-withdrawal-email">이메일</div>
        <div className="email-confirm-box">
          <input
            className="email-input-box"
            type="text"
            value={companyMember.cm_email}
            disabled
          />

          <button className="withrawal-button" onClick={handleSendButton}>
            인증번호 전송
          </button>
        </div>

        {/* ===========================인증번호 확인 ======================= */}
        <div className="withdrawal-signup-guest-email-reg-input">
          <input
            type="text"
            className="signup-guest-email-input-reg-b"
            disabled={!isEmailSent || emailRegChk || seconds <= 0}
            value={emailRegInput}
            onChange={handleEmailRegChange}
          />
          <div
            className={`withdrawal-signup-guest-email-reg-chk
              ${
                !isEmailSent || emailRegChk || seconds <= 0
                  ? "signup-guest-button-disabled"
                  : ""
              }`}
            onClick={handleRegChk}
          >
            <div className="signup-guest-email-inputbox2" />
            <div className="withdrawal-signup-guest-email-reg-send-te1">
              확인
            </div>
          </div>
        </div>
        {/* ===========================인증번호 확인 ======================= */}
        <div
          className={`withdrawal-signup-guest-email-reg-timelef
        ${seconds >= 60 ? "" : "withdrawal-signup-guest-text-color-error"}`}
        >
          {timerMessage}
        </div>

        <button
          type="button"
          className="withrawal-button-finish"
          disabled={!emailRegChk}
          onClick={handleSignOut}
          style={{ backgroundColor: emailRegChk ? "#dc2626" : "#fee2e2" }}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}

export default WithdrawalCompany;
