import React, { useEffect, useState } from "react";
import "./style/HboardDetail.css";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";
import { useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../../api/checkToken";

function HboardDetail(props) {
  //currentPage , dto(subject, writeday, readcount, photo, content) 정보 갖고 와야 하고
  //bkmk , del , edit 버튼 구현 해야함

  // let de = jwt_decode(localStorage.getItem("accessToken"));
  //디코딩 함수
  const de = checkToken();
  const m_idx = de.idx;

  const [hboardData, setHboardData] = useState(null);
  const { hb_idx, currentPage } = useParams();
  const [isBkmk, setIsBkmk] = useState(false);
  const [arrayFromString, setArrayFromString] = useState([]);

  const navi = useNavigate();
  const photoUrl = process.env.REACT_APP_PHOTO + "hboard/";

  useEffect(() => {
    console.log(de.idx);
  }, []);

  useEffect(() => {
    // JPA로부터 데이터 가져오는 API 호출(detail 값 DTO 가져오기 )
    const url = `/api/hboard/D0/${hb_idx}`;
    axiosIns
      .get(url, { params: { m_idx: de.idx } })
      .then((response) => {
        console.log("axios테스트");
        console.log(response);
        console.log(response.data);
        console.log(response.data.isAlreadyAddBkmk);
        console.log(response.data.hb_photo);
        setHboardData(response.data);
        if (response.data.hb_photo != null) {
          setArrayFromString(response.data.hb_photo.split(","));
        }
        //북마크 이미 눌렀는지 여부를 첫 렌더링 때 저장
        setIsBkmk(response.data.isAlreadyAddBkmk);
      })
      .catch((error) => {
        console.error("Error fetching hboard detail:", error);
      });
  }, []);

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
        alert("북마크 요청 실패");
        console.error("북마크 요청 실패:", error);
      });
  };

  const hboardNavigation = () => {
    const url = "/hboard";
    window.location.href = url;
  };

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
    console.log(betweenTime);

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
      <div className="advertise-box">
        <div className="advertise-main" />
        <b className="advertise-text">광고</b>
      </div>
      <img
        className="hboard-detail-type-hr-icon"
        alt=""
        src="/board-detail-type-hr.svg"
      />
      <div className="hboard-detail-type-text">채용게시판</div>
      <div className="hboard-detail-info">
        <img
          className="hboard-detail-info-profile-img-icon"
          alt=""
          src={hboardData?.cm_filename}
        />
        <div className="hboard-detail-info-nickname">
          {hboardData?.cm_compname}
        </div>
        <div className="hboard-detail-info-status-text">
          <span>{hboardData?.hb_readcount}</span>
          {/* <span className="span">{`수정됨 `}</span> */}
        </div>
        <div className="hboard-detail-info-status-text1">
          {timeForToday(hboardData?.hb_writeday)}
        </div>
        <img
          className="hboard-detail-info-status-view-icon"
          alt=""
          src={require("./assets/hire_detail_info_status_views.svg").default}
        />
      </div>
      <img
        className="hboard-url-icon2"
        style={isBkmk ? { backgroundColor: "#F5EFF9" } : {}}
        alt=""
        src={require("./assets/Vector.svg").default}
        onClick={() => addbkmk(m_idx, hb_idx)}
      />
      <img
        className="hboard-url-icon"
        alt=""
        src={require("./assets/hboard_url_icon.svg").default}
      />
      {m_idx === hboardData?.cm_idx && (
        <>
          <img
            className="hboard-update-icon"
            alt=""
            src={require("./assets/fboard_update_icon.svg").default}
          />
          <img
            className="hboard-delete-icon"
            alt=""
            src={require("./assets/fboard_delete_icon.svg").default}
          />
        </>
      )}
      <div className="hboard-detail-header-btn">
        <div className="hboard-detail-header-btn-like"></div>
        <div className="hboard-detail-header-btn-disli"></div>
      </div>

      <div className="hboard-detail-textarea">
        <div className="hboard-detail-textarea-contents">
          {hboardData?.hb_content}
        </div>
        <b className="hboard-detail-textarea-subject">
          {/* 지방자치단체는 주민의 복리 */}
          {hboardData?.hb_subject}
        </b>
      </div>

      {/* <div className="hboard-detail-photo" /> */}

      <div className="hboard-detail-photo-list">
        {arrayFromString.map((imageId, index) => (
          <div>
            <img
              className="hboard-detail-photo"
              key={index}
              src={`${photoUrl}${imageId}`}
              alt={`Image ${index}`}
            />
          </div>
        ))}
      </div>

      <div className="hboard-detail-listback" onClick={hboardNavigation}>
        <div className="hboard-detail-listback-rec" />
        <div className="hboard-detail-listback-text">목록</div>
        <img
          className="hboard-detail-listback-icon"
          alt=""
          src={require("./assets/hboard_detail_listback_icon.svg").default}
        />
      </div>

      <div className="advertise-box1">
        <div className="advertise-main" />
        <b className="advertise-text1">광고 2</b>
      </div>

      <img
        className="hboard-detail-hr-icon"
        alt=""
        src="/board-detail-hr.svg"
      />
    </div>
  );
}

export default HboardDetail;
