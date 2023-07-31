import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function CompUserInfo(props) {
  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const [companyMember, setCompanyMember] = useState({
    cm_name: "",
    cm_email: "",
    cm_compname: "",
    cm_tele: "",
    cm_addr: "",
    cm_post: "",
  });

  const getCompMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/compmember/D1/${idx}`);
      setCompanyMember(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 회원 정보 업데이트 로직
    try {
      const response = await axiosIns.put("/api/compmember/D1", companyMember);
      if (response.status === 200) {
        alert("수정되었습니다");
        window.location.reload();
      } else {
        console.log("There was an issue updating the member");
      }
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  // Effects
  useEffect(() => {
    getCompMemberData(decodedToken.idx);
  }, [decodedToken.idx]);

  return (
    <div className="userinfo">
      <form className="userinfo-wrapper-guest " onSubmit={onSubmit}>
        <b className="text-userinfo">회원정보</b>
        <div className="text-name">이름</div>
        <div className="userinfo-name">
          <input
            className="userinfo-name-box"
            type="text"
            value={companyMember.cm_name}
            onChange={(e) =>
              setCompanyMember({
                ...companyMember,
                cm_name: e.target.value,
              })
            }
          />
        </div>
        <div className="text-email">이메일</div>
        <div className="userinfo-email">
          <input
            className="userinfo-name-box"
            type="text"
            disabled
            value={companyMember.cm_email}
            onChange={(e) =>
              setCompanyMember({
                ...companyMember,
                cm_email: e.target.value,
              })
            }
          />
        </div>
        <div className="text-belong">소속</div>
        <div className="userinfo-belong">
          <input
            className="userinfo-name-box"
            type="text"
            value={companyMember.cm_compname}
            onChange={(e) =>
              setCompanyMember({
                ...companyMember,
                cm_compname: e.target.value,
              })
            }
          />
        </div>
        <div className="text-nickname-guest">전화번호</div>
        <div className="userinfo-nickname">
          <input
            className="userinfo-name-box"
            type="text"
            value={companyMember.cm_tele}
            onChange={(e) =>
              setCompanyMember({
                ...companyMember,
                cm_tele: e.target.value,
              })
            }
          />
        </div>
        <div className="text-profilepic">주소</div>

        <div className="userinfo-profile-guest">
          <input
            className="userinfo-name-box-addr"
            type="text"
            value={companyMember.cm_addr}
            onChange={(e) =>
              setCompanyMember({
                ...companyMember,
                cm_addr: e.target.value,
              })
            }
          />
          <input
            className="userinfo-name-box-post"
            type="text"
            value={companyMember.cm_post}
            onChange={(e) =>
              setCompanyMember({
                ...companyMember,
                cm_post: e.target.value,
              })
            }
          />
        </div>

        <div className="button-userinfo-save">
          <button type="submit" className="button-userinfo-save-box">
            <b className="text-save" style={{ color: "#fff" }}>
              저장
            </b>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompUserInfo;
