import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import { jwtHandleError } from "../../api/JwtHandleError";
import toastAlert from '../../api/ToastAlert';
function MainBest(props) {
  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [popularFreeArticle, setPopularFreeArticle] = useState([]);
  const [subjectCount, setsubjectCount] = useState(10);
  const [contentCount, setContentCount] = useState(15);
  const [popularQnaArticle, setPopularQnaArticle] = useState([]);
  const profileUrl = process.env.REACT_APP_MEMBERURL;

  useEffect(() => {
    // fboard에서 인기글 가져오는 API 호출
    axiosIns
      .get("/api/mainpage/D0/popularFarticle")
      .then((response) => {
        setPopularFreeArticle(response.data);
      })
      .catch((error) => {
        jwtHandleError(error, toastAlert);
      });
  }, []);

  //작성시간 몇 시간전으로 변경
  const timeForToday = (value) => {
    if (!value) {
      return "";
    }

    //timeValue를 한국 시간대로 변환
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
      {popularFreeArticle &&
        popularFreeArticle.map((fboard) => {
          return (
            <div className="main-best-preview">
              <div className="main-best-box" />
              <div>
                <img
                  alt=""
                  src={
                    fboard.mPhoto
                      ? `${profileUrl}${fboard.mPhoto}`
                      : require("./assets/logo_profile.svg").default
                  }
                  className="main-best-profile-img"
                />
              </div>
              <div className="main-best-info">
                <b className="main-best-info-type">자유게시판</b>
                <div className="main-best-info-date">
                  {timeForToday(fboard.freeBoardHotArticle.fbwriteDay)}
                </div>
              </div>
              <div className="main-best-id">
                <div className="main-best-info-type">{fboard.mNicname}</div>
              </div>
              <NavLink
                to={`/fboard/detail/${fboard.freeBoardHotArticle.fbidx}/${currentPage}`}
              >
                <b className="main-best-subject">
                  {compareValues(
                      String(fboard.freeBoardHotArticle.fbsubject),
                      subjectCount
                  )
                      ? fboard.freeBoardHotArticle.fbsubject.slice(0, subjectCount) + "···"
                      : fboard.freeBoardHotArticle.fbsubject}

                </b>
                <div className="main-best-content">
                  {compareValues(
                      String(fboard.freeBoardHotArticle.fbcontent),
                      contentCount
                  )
                      ? fboard.freeBoardHotArticle.fbcontent.slice(0, contentCount) + "···"
                      : fboard.freeBoardHotArticle.fbcontent}
                </div>
                {/* <div>
                  <img
                    alt=""
                    // src={setPhotoUrl(fboard.freeBoardHotArticle.fbphoto)}
                    src={setPhotoUrl(fboard.fboafreeBoardHotArticlerd.fbphoto)}
                    className="main-best-img"
                  />
                </div> */}
                <div>
                  <img
                    alt=""
                    src={
                      fboard.freeBoardHotArticle.fbphoto &&
                      fboard.freeBoardHotArticle.fbphoto.length > 0
                        ? setPhotoUrl(fboard.freeBoardHotArticle.fbphoto)
                        : require("./assets/logo-img.svg").default
                    }
                    className="main-best-img"
                  />
                </div>
              </NavLink>
              <div className="main-best-likes">
                <div className="main-best-likes-text">
                  {fboard.freeBoardHotArticle.fblikeCount -
                    fboard.freeBoardHotArticle.fbdislikeCount}
                </div>
                <img
                  className="main-best-likes-icon"
                  alt=""
                  src={require("./assets/main_likes_icon.svg").default}
                />
              </div>
              <div className="main-best-coments">
                <div className="main-best-likes-text">
                  {fboard.fboardCommentCount}
                </div>
                <img
                  className="main-best-coments-icon"
                  alt=""
                  src={require("./assets/main_coments_icon.svg").default}
                />
              </div>
              <div className="main-best-views">
                <div className="main-best-views-text">
                  {fboard.freeBoardHotArticle.fbreadCount}
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
  );
}

export default MainBest;
