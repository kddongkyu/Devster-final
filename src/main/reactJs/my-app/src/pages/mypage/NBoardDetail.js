import React, { useCallback, useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";
import { useNavigate, useParams } from "react-router-dom";
import "./style/NboardDetail.css";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function NBoardDetail(props) {
  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const memberType = decodedToken.type;

  const { nb_idx, currentPage } = useParams();
  const [detailData, setDetailData] = useState({});
  const [arrayFromString, setArrayFromString] = useState([]);
  const navi = useNavigate();

  const photoUrl = process.env.REACT_APP_PHOTO + "nboard/";

  useEffect(() => {
    axiosIns
      .get(`/api/nboard/D0/${nb_idx}`)
      .then((response) => {
        setDetailData(response.data);
        if (response.data.nboard.nb_photo != null) {
          setArrayFromString(response.data.nboard.nb_photo.split(","));
        }
      })
      .catch((e) => {
        jwtHandleError(e, toastAlert);
      });
  }, [nb_idx]);

  const timeForToday = (value) => {
    if (!value) {
      return "";
    }

    const valueConv = value.slice(0, -10);
    const today = new Date();
    const timeValue = new Date(valueConv);

    // timeValue를 한국 시간대로 변환
    const timeValueUTC = new Date(timeValue.toISOString());
    const offset = timeValue.getTimezoneOffset() * 60 * 1000; // 분 단위를 밀리초 단위로 변환
    const timeValueKST = new Date(timeValueUTC.getTime() - offset);

    const betweenTime = Math.floor(
      (today.getTime() - timeValueKST.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 8) {
      return `${betweenTimeDay}일 전`;
    }

    const year = String(timeValue.getFullYear()).slice(0, 4);
    const month = String(timeValue.getMonth() + 1).padStart(2, "0");
    const day = String(timeValue.getDate()).padStart(2, "0");

    const formattedDateWithoutTime = `${year}-${month}-${day}`;

    return formattedDateWithoutTime;
  };

  // 업데이트 폼으로 이동하는 변수
  const navigateToPurchase = useCallback(() => {
    const updateFormUrl = `/nboard/updateform/${nb_idx}/${currentPage}`;
    navi(updateFormUrl, { state: detailData }); // fboardData를 state로 전달
  }, [nb_idx, currentPage, detailData, navi]);

  const deleteNboard = useCallback(() => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axiosIns
        .delete(`/api/nboard/D1/${nb_idx}`)
        .then((response) => {
          alert("공지사항이 삭제되었습니다.");
          navi("/notice/admin"); // 삭제 후 공지사항 목록 페이지로 이동
        })
        .catch((e) => {
          jwtHandleError(e, toastAlert);
          alert("공지사항 삭제에 실패했습니다.");
        });
    }
  }, [nb_idx, navi]);

  const [member, setMember] = useState({});

  const [companyMember, setCompanyMember] = useState([]);

  const getMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  const getCompMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/compmember/D1/${idx}`);
      setCompanyMember(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  // Effects
  useEffect(() => {
    if (memberType === "normal") {
      getMemberData(decodedToken.idx);
    } else if (memberType === "company") {
      getCompMemberData(decodedToken.idx);
    }
  }, [memberType, decodedToken.idx]);

  return (
    <div className="nboard-detail">
      <div className="nboard-detail-type-text">공지사항</div>
      {/* <h1>{detailData.nboard.nb_subject}</h1>
      <p>{detailData.nboard.nb_content}</p> */}
      {detailData.nboard && (
        <div className="nboard-detail-info">
          <img
            className="nboard-detail-info-profile-img-icon"
            alt=""
            //   src={detailData.nboard.nb_photo}
          />
          <div className="nboard-detail-info-nickname">관리자</div>
          <div className="nboard-detail-info-status-text">
            <span>{detailData.nboard.nb_readcount}</span>
            {/*<span className="span">{`수정됨 `}</span>*/}
          </div>
          <div className="nboard-detail-info-status-text1">
            {timeForToday(detailData.nboard.nb_writeday)}
          </div>
          <img
            className="nboard-detail-info-status-view-icon"
            alt=""
            src={
              require("./assets/boarddetail/notice_detail_info_status_views.svg")
                .default
            }
          />
        </div>
      )}

      {memberType === "normal" && member.m_role === "ADMIN" && (
        <>
          <img
            className="nboard-update-icon"
            alt=""
            src={require("./assets/boarddetail/edit.svg").default}
            onClick={navigateToPurchase}
          />
          <img
            className="nboard-delete-icon"
            alt=""
            src={require("./assets/boarddetail/trash.svg").default}
            onClick={deleteNboard}
          />
        </>
      )}
      {detailData.nboard && (
        <div className="nboard-detail-textarea">
          <div className="nboard-detail-textarea-subject">
            {detailData.nboard.nb_subject}
          </div>

          <div className="nboard-detail-textarea-contents">
            <pre style={{ marginBottom: "5rem" }}>
              {detailData.nboard.nb_content}
            </pre>
          </div>

          <div className="nboard-detail-photo-list">
            {/* 이미지 출력 부분 수정 */}
            {arrayFromString.map((imageId, index) => (
              <div key={index}>
                <img
                  className="nboard-detail-photo"
                  src={`${photoUrl}${imageId}`}
                  alt={`Image ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NBoardDetail;
