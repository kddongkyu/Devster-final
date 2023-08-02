import React, { useCallback, useEffect, useState } from "react";
import axiosIns from "../../../api/JwtConfig";
import "../style/FboardReplyForm.css";
import "../style/FboardDetail.css";
import { checkToken } from "../../../api/checkToken";
import ToastAlert from "../../../api/ToastAlert";
import { jwtHandleError } from "../../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import FboardReplyUpdateForm from "./FboardReplyUpdateForm";
import FboardCommentReplyForm from "./FboardCommentReplyForm";

function FboardCommentItem({ comment, index, toggleReplyComments }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const de = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const [isGood, setIsGood] = useState(false);
  const [isBad, setIsBad] = useState(false);
  const dislike = comment.fboardcommentdto.fbc_dislike;
  const [likeCount, setLikeCount] = useState(comment.likeDislikeDifference);
  const fbc_idx = comment.fboardcommentdto.fbc_idx;
  const profileUrl = process.env.REACT_APP_MEMBERURL;

  const fetchFboard = useCallback(
    (fbc_idx) => {
      if (de && de.idx && fbc_idx) {
        let m_idx = de.idx;
        axiosIns
          .get(`/api/fboard/D0/comment/${m_idx}/checkGood/${fbc_idx}`)
          .then((res) => {
            setIsGood(res.data);
          })
          .catch((err) => {
            toastAlert("에러 발생", "warning");
          });

        axiosIns
          .get(`/api/fboard/D0/comment/${m_idx}/checkBad/${fbc_idx}`)
          .then((res) => {
            setIsBad(res.data);
          })
          .catch((err) => {
            toastAlert("에러 발생", "warning");
          });
      }
    },
    [comment.fboardcommentdto.fbc_idx]
  );

  useEffect(() => {
    fetchFboard(fbc_idx);
  }, [fbc_idx, fetchFboard, likeCount]);

  const handleReplyButtonClick = () => {
    try {
      if (!de.idx) throw new Error();
      setShowReplyForm(!showReplyForm);
    } catch (error) {
      toastAlert(
        <>
          댓글 작성은 로그인 회원만 이용 가능합니다.
          <br />
          댓글을 작성하시려면 로그인해주세요.
        </>,
        "warning"
      );
    }
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const deleteComment = (fbc_idx) => {
    axiosIns
      .delete(`/api/fboard/D1/comment/${fbc_idx}`)
      .then((res) => {
        fetchFboard(fbc_idx);
      })
      .catch((err) => jwtHandleError(err, toastAlert));
  };

  const handleDeleteClick = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment(comment.fboardcommentdto.fbc_idx);
      window.location.reload();
    }
  };

  //좋아요 싫어요 체크
  const handleLikeClick = (fbc_idx) => {
    if (de && de.idx) {
      let m_idx = de.idx;
      // 좋아요 상태 확인
      axiosIns
        .get(`/api/fboard/D0/comment/${m_idx}/checkBad/${fbc_idx}`)
        .then((response) => {
          if (response.data === 2) {
            setIsBad(false);
            setLikeCount(response.data.likeCount);
          } else {
            axiosIns
              .get(`/api/fboard/D0/comment/${m_idx}/checkGood/${fbc_idx}`)
              .then((response) => {
                if (response.data === 1) {
                  axiosIns
                    .post(`/api/fboard/D1/comment/${m_idx}/like/${fbc_idx}`)
                    .then((response) => {
                      setIsGood(false);
                      setLikeCount(response.data.likeCount);
                    })
                    .catch((error) => {
                      toastAlert("에러 발생", "warning");
                    });
                } else {
                  // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                  axiosIns
                    .post(`/api/fboard/D1/comment/${m_idx}/like/${fbc_idx}`)
                    .then((response) => {
                      toastAlert("좋아요를 누르셨습니다.", "success");
                      setIsGood(true);
                      setLikeCount(response.data.likeCount);
                    })
                    .catch((error) => {
                      jwtHandleError(error, toastAlert);
                    });
                }
              })
              .catch((error) => {
                jwtHandleError(error, toastAlert);
              });
          }
        })
        .catch((error) => {
          jwtHandleError(error, toastAlert);
        });
    }
  };

  const handleDislikeClick = (fbc_idx) => {
    if (de && de.idx) {
      let m_idx = de.idx;
      // 먼저 좋아요 상태를 체크합니다.
      axiosIns
        .get(`/api/fboard/D0/comment/${m_idx}/checkGood/${fbc_idx}`)
        .then((response) => {
          if (response.data === 1) {
            setIsGood(false);
            setLikeCount(response.data.likeCount);
          } else {
            // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
            axiosIns
              .get(`/api/fboard/D0/comment/${m_idx}/checkBad/${fbc_idx}`)
              .then((response) => {
                if (response.data === 2) {
                  axiosIns
                    .post(`/api/fboard/D1/comment/${m_idx}/dislike/${fbc_idx}`)
                    .then((response) => {
                      setIsBad(false);
                      setLikeCount(response.data.likeCount);
                    })
                    .catch((error) => {
                      jwtHandleError(error, toastAlert);
                    });
                } else {
                  // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                  axiosIns
                    .post(`/api/fboard/D1/comment/${m_idx}/dislike/${fbc_idx}`)
                    .then((response) => {
                      setIsBad(true);
                      setLikeCount(response.data.likeCount);
                    })
                    .catch((error) => {
                      jwtHandleError(error, toastAlert);
                    });
                }
              })
              .catch((error) => {
                jwtHandleError(error, toastAlert);
              });
          }
        })
        .catch((error) => {
          jwtHandleError(error, toastAlert);
        });
    }
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
    <div className="fboard-detail-comments-all" key={index}>
      <div className="fboard-detail-commnets-detail-">
        <div className="fboard-detail-commnets-detail-1">
          <div className="fboard-detail-commnets-detail-2">
            {comment.nickname}
          </div>
          <div className="fboard-detail-commnets-detail-3">
            <span>{timeForToday(comment.fboardcommentdto.fbc_writeday)}</span>
          </div>
        </div>
        <img
          className="fboard-detail-commnets-detail-icon"
          alt=""
          src={
            comment.photo
              ? `${profileUrl}${comment.photo}`
              : require("../assets/logo_profile.svg").default
          }
        />
      </div>

      {/* 좋아요 싫어요 */}
      <div className="fboard-detail-commnets-all-lik">
        <div
          className="fboard-detail-commnets-all-up-"
          style={isGood ? { backgroundColor: "#F5EFF9" } : {}}
          onClick={() => handleLikeClick(fbc_idx)}
        />
        <img
          className="fboard-detail-commnets-all-up-icon"
          alt=""
          src={require("../../review/assets/star-like-icon.svg").default}
          onClick={() => handleLikeClick(fbc_idx)}
        />
        <div className="fboard-detail-commnets-all-lik1">
          <div className="fboard-detail-commnets-all-box" />
          <div className="fboard-detail-commnets-all-lik2">
            {likeCount < 0 ? "-" + dislike : likeCount}
          </div>
        </div>
        <div
          className="fboard-detail-commnets-all-dow"
          style={isBad ? { backgroundColor: "#F5EFF9" } : {}}
          onClick={() => handleDislikeClick(fbc_idx)}
        />
        <img
          className="fboard-detail-commnets-all-dow-icon"
          alt=""
          src={require("../../review/assets/star-dislike-icon.svg").default}
          onClick={() => handleDislikeClick(fbc_idx)}
        />
      </div>

      {/* content */}
      <div className="fboard-detail-commnets-all-con">
        {comment.fboardcommentdto.fbc_content}
        <br />
        {de && de.idx === comment.fboardcommentdto.m_idx && (
          <>
            <div className="fboard-detail-commnets-btns">
              {/* 이 부분 시간나면 닉네임 옆으로 옮기기 */}
              <div
                className="fboard-detail-commnets-btns-delete"
                onClick={handleDeleteClick}
              >
                삭제
              </div>{" "}
              &nbsp;&nbsp;
              <div
                className="fboard-detail-commnets-btns-update"
                onClick={handleUpdateClick}
              >
                수정
              </div>
            </div>
            {showUpdateForm && (
              <FboardReplyUpdateForm
                fbc_idx={comment.fboardcommentdto.fbc_idx}
                fb_idx={comment.fboardcommentdto.fb_idx}
                currentContent={comment.fboardcommentdto.fbc_content}
              />
            )}
          </>
        )}
      </div>
      <div className="fboard-detail-commnets-hide">
        {comment.replyConut != 0 ? (
          <div
            className="fboard-detail-commnets-hide-te"
            onClick={() =>
              toggleReplyComments(comment.fboardcommentdto.fbc_idx)
            }
          >
            <img
              alt=""
              src={
                require("../../qboard/assets/qboard_detail_commnets_all_up_icon.svg")
                  .default
              }
              className="fboard-detail-commnets-hide-img"
            />
            &nbsp;&nbsp;답글 숨기기&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        ) : (
          ""
        )}

        <div
          className="fboard-detail-commnets-hide-co"
          onClick={handleReplyButtonClick}
        >
          답글 쓰기
        </div>
        {showReplyForm && (
          <FboardCommentReplyForm
            fbc_idx={comment.fboardcommentdto.fbc_idx}
            fb_idx={comment.fboardcommentdto.fb_idx}
          />
        )}
      </div>
    </div>
  );
}

export default FboardCommentItem;
