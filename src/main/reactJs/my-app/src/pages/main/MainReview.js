import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import ToastAlert from "../../api/ToastAlert";
import { useSnackbar } from "notistack";
import { jwtHandleError } from "../../api/JwtHandleError";
import StarRating from "../review/StarRating";
import { checkToken } from "../../api/checkToken";

function MainReview(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [contentCount, setContentCount] = useState(15);
  const [subjectCount, setsubjectCount] = useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
  const [rboardNewestList, setRboardNewestList] = useState([]);
  const navi = useNavigate();
  const profileUrl = process.env.REACT_APP_MEMBERURL;

  useEffect(() => {
    //JPA로부터 자유게시판 최신순 글 3개 가져오는 API 호출
    axiosIns
      .get("/api/mainpage/D0/rboard")
      .then((response) => {
        console.log(response.data);
        setRboardNewestList(response.data);
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

  //타입
  const reviewTypes = {
    1: "면접",
    2: "코딩",
    3: "합격",
  };

  const compareValues = (value1, value2) => {
    return value1.length > value2;
  };
  const handleLinkClick = async (rb_idx) => {
    try {
      const tokenData = await checkToken();

      if (!tokenData) {
        toastAlert("로그인 후 이용 가능한 서비스입니다.", "warning"); // Show login requirement toast
        // window.location.href='/signin';
        // navi("/signin"); // Redirect to login page
      } else {
        navi(`/review/detail/${rb_idx}/${currentPage}`);
      }
    } catch (error) {
      jwtHandleError(error, toastAlert);
    }
  };

  return (
    <div>
      {rboardNewestList &&
        rboardNewestList.map((rboard) => (
          <div
            onClick={() => handleLinkClick(rboard.rboard.rb_idx)}
            key={rboard.rboard.rb_idx}
          >
            <div className="main-review-preview">
              <img
                className="review-list-box-img-icon"
                alt=""
                src={rboard.ciPhoto}
              />
              <div className="review-list-subject-text">
                {compareValues(String(rboard.rboard.rb_subject), subjectCount)
                  ? rboard.rboard.rb_subject.slice(0, subjectCount) + "···"
                  : rboard.rboard.rb_subject}
              </div>
              <img
                className="logo-icon"
                alt=""
                src={
                  rboard.mPhoto
                    ? `${profileUrl}${rboard.mPhoto}`
                    : require("./assets/logo.svg").default
                }
              />
              <div className="review-list-user-time">
                {rboard.mNicname} ·{timeForToday(rboard.rboard.rb_writeday)}
              </div>
              <div className="review-list-rb-type">
                <p className="p1">
                  {`리뷰 종류 : `}
                  {reviewTypes[rboard.rboard.rb_type]}
                </p>
              </div>
              <b className="review-list-companyname">{rboard.ciName}</b>
              <div className="review-list-box-star-text">
                {rboard.rboard.rb_star}.0
              </div>
              <div className="review-list-box-star-icons">
                <StarRating rating={rboard.rboard.rb_star} />
              </div>

              <div className="review-bottom-bar" />
              <div className="review-list-box-icons">
                <div className="review-list-box-header-comment-parent">
                  <div className="review-list-box-header-comment">
                    {rboard.reviewCommentCount}
                  </div>
                  <img
                    className="review-list-box-header-comment-icon"
                    alt=""
                    src={
                      require("./assets/review_list_box_header_comments_icon.svg")
                        .default
                    }
                  />
                </div>
                <div className="review-list-box-header-likes-t-parent">
                  <div className="review-list-box-header-likes-t">
                    {rboard.rboard.rb_like}
                  </div>
                  <img
                    className="review-ist-box-header-like-icon"
                    alt=""
                    src={
                      require("./assets/review_list_box_header_likes_icon.svg")
                        .default
                    }
                  />
                </div>
                <div className="review-list-box-header-views-t-parent">
                  <div className="review-list-box-header-comment">
                    {rboard.rboard.rb_readcount}
                  </div>
                  <img
                    className="review-list-box-header-view-icon"
                    alt=""
                    src={
                      require("./assets/review_list_box_header_views_icon.svg")
                        .default
                    }
                  />
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        ))}
    </div>
  );
}

export default MainReview;
