import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import ToastAlert from "../../api/ToastAlert";
import { useSnackbar } from "notistack";
import { jwtHandleError } from "../../api/JwtHandleError";

function MainFreeboard(props) {
  const [freeBoardNewestList, setFreeBoardNewestList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentCount, setContentCount] = useState(15);
  const [subjectCount, setsubjectCount] = useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  useEffect(() => {
    //JPA로부터 자유게시판 최신순 글 3개 가져오는 API 호출
    axiosIns
      .get("/api/mainpage/D0/fboard")
      .then((response) => {
        console.log(response.data);
        setFreeBoardNewestList(response.data);
      })
      .catch((error) => {
        jwtHandleError(error, toastAlert);
      });
  }, []);

  // 작성시간 몇시간전으로 변경
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

  // 사진 url 설정
  const setPhotoUrl = (value) => {
    if (value == null) {
      return require("./assets/logo-img.svg").default;
    }
    const photoUrl = process.env.REACT_APP_PHOTO + "fboard/";
    if (value.includes(",")) {
      const firstCommaIndex = value.indexOf(",");
      const parsedPhoto = value.substring(0, firstCommaIndex);
      const srcUrl = photoUrl + parsedPhoto;
      return srcUrl;
    } else {
      const srcUrl = photoUrl + value;
      return srcUrl;
    }
  };

  const compareValues = (value1, value2) => {
    return value1.length > value2;
  };

  return (
    <div>
      <div>
        {freeBoardNewestList &&
          freeBoardNewestList.map((fboard) => {
            return (
              <div className="main-best-preview3">
                <div className="main-best-box" />
                <div>
                  <img
                    alt=""
                    src={fboard.mPhoto}
                    className="main-best-profile-img"
                  />
                </div>
                <div className="main-best-info">
                  <b className="main-best-info-type">자유게시판</b>
                  <div className="main-best-info-date">
                    {timeForToday(fboard.fboard.fb_writeday)}
                  </div>
                </div>
                <div className="main-best-id">
                  <div className="main-best-info-type">{fboard.mNicname}</div>
                </div>
                <NavLink
                  to={`/fboard/detail/${fboard.fboard.fb_idx}/${currentPage}`}
                >
                  <b className="main-best-subject">
                    {" "}
                    {compareValues(
                      String(fboard.fboard.fb_subject),
                      subjectCount
                    )
                      ? fboard.fboard.fb_subject.slice(0, subjectCount) + "···"
                      : fboard.fboard.fb_subject}
                  </b>
                  <div className="main-best-content">
                    {compareValues(
                      String(fboard.fboard.fb_content),
                      contentCount
                    )
                      ? fboard.fboard.fb_content.slice(0, contentCount) + "···"
                      : fboard.fboard.fb_content}
                  </div>
                  <div>
                    <img
                      alt=""
                      src={setPhotoUrl(fboard.fboard.fb_photo)}
                      className="main-best-img"
                    />
                  </div>
                </NavLink>

                <div className="main-best-likes">
                  <div className="main-best-likes-text">
                    {fboard.fboard.fb_like - fboard.fboard.fb_dislike}
                  </div>
                  <img
                    className="main-best-likes-icon"
                    alt=""
                    src={require("./assets/main_likes_icon.svg").default}
                  />
                </div>
                <div className="main-best-coments">
                  <div className="main-best-likes-text">99</div>
                  <img
                    className="main-best-coments-icon"
                    alt=""
                    src={require("./assets/main_coments_icon.svg").default}
                  />
                </div>
                <div className="main-best-views">
                  <div className="main-best-views-text">
                    {fboard.fboard.fb_readcount}
                  </div>
                  <img
                    className="main-best-views-icon"
                    alt=""
                    src={require("./assets/main_views_icon.svg").default}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MainFreeboard;
