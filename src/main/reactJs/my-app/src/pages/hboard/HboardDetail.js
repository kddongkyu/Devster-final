import React, { useCallback, useEffect, useState } from "react";
import "./style/HboardDetail.css";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";
import { useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../../api/checkToken";
import ToastAlert from "../../api/ToastAlert";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";

function HboardDetail(props) {
  //에러 호출용 변수
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  //디코딩 함수
  const de = checkToken();
  const m_idx = de.idx;

  const [hboardData, setHboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { hb_idx, currentPage } = useParams();
  const [isBkmk, setIsBkmk] = useState(false);
  const [arrayFromString, setArrayFromString] = useState([]);
  const navi = useNavigate();
  const photoUrl = process.env.REACT_APP_PHOTO + "hboard/";

  const fetchHboard = useCallback(
    (hb_idx, currentPage = null) => {
      // JPA로부터 데이터 가져오는 API 호출(detail 값 DTO 가져오기 )
      const url = `/api/hboard/D0/${hb_idx}`;
      axiosIns
        .get(url, { params: { m_idx: de.idx } })
        .then((response) => {
          console.log(response);
          setHboardData(response.data);
          if (response.data.hb_photo != null) {
            setArrayFromString(response.data.hb_photo.split(","));
          }
          //북마크 이미 눌렀는지 여부를 첫 렌더링 때 저장
          setIsBkmk(response.data.isAlreadyAddBkmk);
          setIsLoading(false);
        })
        .catch((error) => {
          jwtHandleError(error, toastAlert);
        });
    },
    [hb_idx, currentPage]
  );

  useEffect(() => {
    fetchHboard(hb_idx, currentPage);
  }, [hb_idx, currentPage, fetchHboard]);

  //북마크
  const addbkmk = (m_idx, hb_idx) => {
    m_idx = Number(m_idx);
    hb_idx = Number(hb_idx);
    console.log(m_idx);
    console.log(hb_idx);
    console.log("파라미터 값 테스트");
    axiosIns
      .post(`/api/hboard/D1/${m_idx}/increaseBkmk/${hb_idx}`)
      .then((response) => {
        if (isBkmk == false) {
          setIsBkmk(true);
        } else if (isBkmk == true) {
          setIsBkmk(false);
        }
      })
      .catch((error) => {
        jwtHandleError(error, toastAlert);
      });
  };

  // 업데이트 폼으로 이동하는 함수
  const navigateToPurchase = useCallback(() => {
    const updateFormUrl = `/hboard/updateform/${hb_idx}/${currentPage}`;
    navi(updateFormUrl, { state: hboardData }); //hboardData를 state로 전달
  }, [hb_idx, currentPage, hboardData, navi]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //삭제
  const deleteHboard = (hb_idx) => {
    if (window.confirm("해당 게시글을 삭제하시겠습니까?")) {
      axiosIns
        .delete(`/api/compmember/hboard/D1/${hb_idx}`)
        .then((response) => {
          window.location.href = "/hboard";
        })
        .catch((error) => {
          jwtHandleError(error, toastAlert);
        });
    }
  };

  //목록 돌아가기
  const hboardNavigation = () => {
    const url = "/hboard";
    window.location.href = url;
  };

  //시간 변환
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

  return (
    <div className="hboard-detail">
      <div className="hboard-advertise-box">
        <div className="hboard-advertise-main" />
        <b className="hboard-advertise-text">광고</b>
      </div>
      <div className="board-detail-type-text">자유게시판</div>
      <div className="hboard-detail-info">
        <img
          className="hboard-detail-info-profile-img-icon"
          alt=""
          src={hboardData.hb_photo}
        />
        <div className="hboard-detail-info-nickname">
          {hboardData.cm_compname}
        </div>
        <div className="hboard-detail-info-status-text">
          <span>{hboardData.hb_readcount}</span>
        </div>
        <div className="hboard-detail-info-status-text1">
          {timeForToday(hboardData.hb_writeday)}
        </div>
        <img
          className="hboard-detail-info-status-view-icon"
          alt=""
          src={require("./assets/hire_detail_info_status_views.svg").default}
        />
      </div>

      <img
        className="hboard-url-icon2"
        alt=""
        src={
          isBkmk
            ? require("./assets/Vector_bkmk2.svg").default
            : require("./assets/Vector.svg").default
        }
        onClick={() => addbkmk(m_idx, hb_idx)}
      />

      <img
        className="hboard-url-icon"
        alt=""
        src={require("./assets/hboard_url_icon.svg").default}
      />
      {m_idx === hboardData.cm_idx && (
        <>
          <img
            className="hboard-update-icon"
            alt=""
            src={require("./assets/fboard_update_icon.svg").default}
            onClick={navigateToPurchase}
          />
          <img
            className="hboard-delete-icon"
            alt=""
            src={require("./assets/fboard_delete_icon.svg").default}
            onClick={() => deleteHboard(hb_idx)}
          />
        </>
      )}
      <div className="hboard-detail-textarea">
        <div className="hboard-detail-textarea-subject">
          {hboardData.hb_subject}
        </div>

        <div className="hboard-detail-textarea-contents">
          <pre style={{ marginBottom: "5rem" }}>{hboardData.hb_content}</pre>
        </div>

        <div className="hboard-detail-photo-list">
          {arrayFromString.map((imageId, index) => (
            <div>
              <img
                className="board-detail-photo"
                key={index}
                src={`${photoUrl}${imageId}`}
                alt={`Image ${index}`}
              />
            </div>
          ))}

          {/* 여기서부터 밑으로 정렬 */}
          <div className="hboard-detail-listbackcounter">
            <div className="hboard-detail-listback" onClick={hboardNavigation}>
              <div className="hboard-detail-listback-rec" />
              <div className="hboard-detail-listback-text">목록</div>
              <img
                className="hboard-detail-listback-icon"
                alt=""
                src={
                  require("./assets/hboard_detail_listback_icon.svg").default
                }
              />
            </div>
          </div>
          <div className="hboard-advertise-box2">
            <div className="hboard-advertise-main" />
            <b className="hboard-advertise-text1">광고 2</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HboardDetail;
