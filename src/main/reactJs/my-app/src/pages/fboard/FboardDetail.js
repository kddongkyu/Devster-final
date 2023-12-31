import React, { useCallback, useEffect, useState } from "react";
import "./style/FboardDetail.css";
import axiosIns from "../../api/JwtConfig";
import { useNavigate, useParams } from "react-router-dom";
import ToastAlert from "../../api/ToastAlert";
import { jwtHandleError } from "../../api/JwtHandleError";
import { checkToken } from "../../api/checkToken";
import { useSnackbar } from "notistack";
import FboardCommentForm from "./comment/FboardCommentForm";
import ad1 from './assets/007.png';
import ad2 from './assets/008.png';
import FboardComment from "./comment/FboardComment";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


function FboardDetail(props) {
  //에러 호출용 변수
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
  //디코딩 함수
  const de = checkToken();
  const [m_idx, setM_idx] = useState();
  const [fboardData, setFboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fb_idx, currentPage } = useParams();
  const [isGood, setIsGood] = useState(false);
  const [isBad, setIsBad] = useState(false);
  const [arrayFromString, setArrayFromString] = useState([]);
  const navi = useNavigate();
  const photoUrl = process.env.REACT_APP_PHOTO + "fboard/";
  const profileUrl = process.env.REACT_APP_MEMBERURL;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //모달 & SNS공유
  const url = window.location.href; // 현재 페이지의 URL
  const title = "devster"; // 공유하고 싶은 제목
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;
  const bandShareUrl = `https://www.band.us/plugin/share?body=${encodeURIComponent(
    title
  )}&route=${encodeURIComponent(url)}}`;

  const fetchFboard = useCallback(
    (fb_idx, currentPage = null) => {
      const url = `/api/fboard/D0/${fb_idx}`;
      axiosIns
        .get(url)
        .then((response) => {
          setFboardData(response.data);
          if (response.data.fboard.fb_photo != null) {
            setArrayFromString(response.data.fboard.fb_photo.split(","));
          }
          setIsLoading(false);

          if (de && de.idx && fb_idx) {
            axiosIns
              .get(`/api/fboard/D1/${de.idx}/checkGood/${fb_idx}`)
              .then((response) => {
                setIsGood(response.data); // 좋아요 상태를 받아서 상태 변수에 저장
              })
              .catch((error) => {
                jwtHandleError(error, toastAlert);
              });

            axiosIns
              .get(`/api/fboard/D1/${de.idx}/checkBad/${fb_idx}`)
              .then((response) => {
                setIsBad(response.data); // 싫어요 상태를 받아서 상태 변수에 저장
              })
              .catch((error) => {
                jwtHandleError(error, toastAlert);
              });
          }
        })
        .catch((error) => {
          jwtHandleError(error, toastAlert);
        });
    },
    [fb_idx, currentPage]
  );

  // 업데이트 폼으로 이동하는 변수
  const navigateToPurchase = useCallback(() => {
    const updateFormUrl = `/fboard/updateform/${fb_idx}/${currentPage}`;
    navi(updateFormUrl, { state: fboardData }); // fboardData를 state로 전달
  }, [fb_idx, currentPage, fboardData, navi]);

  useEffect(() => {
    fetchFboard(fb_idx, currentPage);
  }, [fb_idx, currentPage, fetchFboard]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 좋아요 싫어요
  const handlelike = (fb_idx) => {
    if (de && de.idx) {
      let m_idx = de.idx;
      // 먼저 좋아요 상태를 체크합니다.
      axiosIns
        .get(`/api/fboard/D1/${m_idx}/checkBad/${fb_idx}`)
        .then((response) => {
          if (response.data === 2) {
            // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
            fetchFboard(fb_idx, currentPage);
          } else {
            // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
            axiosIns
              .get(`/api/fboard/D1/${m_idx}/checkGood/${fb_idx}`)
              .then((response) => {
                if (response.data === 1) {
                  // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                  alert("이미 좋아요가 눌려 있습니다");
                  axiosIns
                    .post(`/api/fboard/D1/${m_idx}/like/${fb_idx}`)
                    .then((response) => {
                      fetchFboard(fb_idx, currentPage);
                    })
                    .catch((error) => {
                      jwtHandleError(error, toastAlert);
                    });
                } else {
                  // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                  axiosIns
                    .post(`/api/fboard/D1/${m_idx}/like/${fb_idx}`)
                    .then((response) => {
                      fetchFboard(fb_idx, currentPage);
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

  const handleDislike = (fb_idx) => {
    if (de && de.idx) {
      let m_idx = de.idx;
      // 먼저 좋아요 상태를 체크합니다.
      axiosIns
        .get(`/api/fboard/D1/${m_idx}/checkGood/${fb_idx}`)
        .then((response) => {
          if (response.data === 1) {
            // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
            fetchFboard(fb_idx, currentPage);
          } else {
            // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
            axiosIns
              .get(`/api/fboard/D1/${m_idx}/checkBad/${fb_idx}`)
              .then((response) => {
                if (response.data === 2) {
                  // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                  axiosIns
                    .post(`/api/fboard/D1/${m_idx}/dislike/${fb_idx}`)
                    .then((response) => {
                      fetchFboard(fb_idx, currentPage);
                    })
                    .catch((error) => {
                      jwtHandleError(error, toastAlert);
                    });
                } else {
                  // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                  axiosIns
                    .post(`/api/fboard/D1/${m_idx}/dislike/${fb_idx}`)
                    .then((response) => {
                      fetchFboard(fb_idx, currentPage);
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

  // 삭제
  const deleteFboard = (fb_idx) => {
    if (window.confirm("해당 게시글을 삭제하시겠습니까?")) {
      axiosIns
        .delete(`/api/fboard/D1/${fb_idx}`)
        .then((response) => {
          window.location.href = "/fboard";
        })
        .catch((error) => {
          jwtHandleError(error, toastAlert);
        });
    }
  };

  // 목록 돌아가기
  const fboardNavigation = () => {
    const url = "/fboard";
    window.location.href = url;
  };

  const handleNicknameClick = () => {
    // recv_nick은 이 컴포넌트에서 사용할 수 있는 형태로 가져옵니다.
    const recv_nick = fboardData.mNicname;
    navi(`/message/form/${recv_nick}`);
  };

  // 시간 변환
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
    <div className="fboard-detail">
      <div className="fboard-advertise-box">
        <img className="fboard-advertise-main"
             alt="" src={ad1}/>

      </div>

      <div className="fboard-detail-type-text">자유게시판</div>
      <div className="fboard-detail-info">
        <img
          className="fboard-detail-info-profile-img-icon"
          alt=""
          src={
            fboardData.mPhoto
              ? `${profileUrl}${fboardData.mPhoto}`
              : require("./assets/logo_profile.svg").default
          }
          onClick={handleNicknameClick}
        />
        <div
          className="fboard-detail-info-nickname"
          onClick={handleNicknameClick}
        >
          {fboardData.mNicname}
        </div>

        <div className="fboard-detail-info-status-text">
          <span>{fboardData.fboard.fb_readcount}</span>
        </div>
        <div className="fboard-detail-info-status-text1">
          {timeForToday(fboardData.fboard.fb_writeday)}
        </div>
        <img
          className="fboard-detail-info-status-view-icon"
          alt=""
          src={
            require("./assets/boarddetail/notice_detail_info_status_views.svg")
              .default
          }
        />
      </div>

      <img
        className="fboard-url-icon"
        alt=""
        src={
          require("./assets/boarddetail/notice_detail_header_function_url.svg")
            .default
        }
        onClick={() => handleOpen()}
      />

      {de && de.idx === fboardData.fboard.m_idx && (
        <>
          <img
            className="fboard-update-icon"
            alt=""
            src={require("./assets/boarddetail/edit.svg").default}
            onClick={navigateToPurchase}
          />
          <img
            className="fboard-delete-icon"
            alt=""
            src={require("./assets/boarddetail/trash.svg").default}
            onClick={() => deleteFboard(fb_idx)}
          />
        </>
      )}
      <div className="fboard-detail-header-btn">
        <div className="fboard-detail-header-btn-like">
          <img
            className="fboard-detail-header-btn-like-i-icon"
            alt=""
            src={
              require("./assets/boarddetail/board_detail_header_btn_like_icon.svg")
                .default
            }
          />
          <div className="fboard-detail-header-btn-like-t">
            {fboardData.fboard.fb_like}
          </div>
        </div>
        <div className="fboard-detail-header-btn-disli">
          <img
            className="fboard-detail-header-btn-dislik-icon"
            alt=""
            src={
              require("./assets/boarddetail/board_detail_header_btn_dislike_icon.svg")
                .default
            }
          />
          <div className="fboard-detail-header-btn-like-t">
            {fboardData.fboard.fb_dislike}
          </div>
        </div>
      </div>

      <div className="fboard-detail-textarea">
        <div className="fboard-detail-textarea-subject">
          {fboardData.fboard.fb_subject}
        </div>

        <div className="fboard-detail-textarea-contents">
          <pre
            className="fboard-detail-textarea-pre"
            style={{ marginBottom: "5rem", wordWrap: "break-word" }}
          >
            {fboardData.fboard.fb_content}
          </pre>
        </div>

        <div className="fboard-detail-photo-list">
          {arrayFromString.map((imageId, index) => {
            if (imageId && imageId.length > 0) {
              return (
                <img
                  className="fboard-detail-photo"
                  key={index}
                  src={`${photoUrl}${imageId}`}
                  alt={`Image ${index}`}
                />
              );
            }
            return null;
          })}

          {/* 여기서부터 밑으로 정렬 */}
          <div className="fboard-detail-listbackcounter">
            <div className="fboard-detail-listback" onClick={fboardNavigation}>
              <div className="fboard-detail-listback-rec" />
              <div className="fboard-detail-listback-text">목록</div>
              <img
                className="fboard-detail-listback-icon"
                alt=""
                src={
                  require("./assets/boarddetail/board_detail_listback_icon.svg")
                    .default
                }
              />
            </div>
            <div className="fboard-detail-counter">
              <div className="fboard-detail-counter-like">
                <div
                  className="fboard-detail-counter-like-box"
                  style={isGood ? { backgroundColor: "#F5EFF9" } : {}}
                  onClick={() => handlelike(fb_idx)}
                />
                <img
                  className="fboard-detail-counter-like-icon"
                  alt=""
                  src={
                    require("./assets/boarddetail/review_detail_counter_like_icon.svg")
                      .default
                  }
                />
              </div>
              <div className="fboard-detail-counter-num">
                <div className="fboard-detail-counter-num-box" />
                <div className="fboard-detail-counter-num-text">
                  {fboardData.fboard.fb_like - fboardData.fboard.fb_dislike}
                </div>
              </div>
              <div className="fboard-detail-counter-dislike">
                <div
                  className="fboard-detail-counter-dislike-b"
                  style={isBad ? { backgroundColor: "#F5EFF9" } : {}}
                  onClick={() => handleDislike(fb_idx)}
                />
                <img
                  className="fboard-detail-counter-like-icon"
                  alt=""
                  src={
                    require("./assets/boarddetail/review_detail_counter_dislike_icon.svg")
                      .default
                  }
                />
              </div>
            </div>
          </div>
          <div className="fboard-advertise-box2">
            <img className="fboard-advertise-main"
                 alt="" src={ad2}/>

          </div>
        </div>
      </div>

      <div className="fboard-comments-box">
        <FboardCommentForm fb_idx={fb_idx} />
        <FboardComment fb_idx={fb_idx} />
      </div>

      {/* SNS공유 모달            */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="hboard-modal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              SNS 공유하기
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img
                style={{ width: 30 }}
                src={require("./assets/fbicon.svg").default}
                onClick={() => window.open(facebookShareUrl, "_blank")}
              />
              &nbsp;&nbsp;&nbsp;
              <img
                style={{ width: 30 }}
                src={require("./assets/twiticon.svg").default}
                onClick={() => window.open(twitterShareUrl, "_blank")}
              />
              &nbsp;&nbsp;&nbsp;
              <img
                style={{ width: 30 }}
                src={require("./assets/bandicon.svg").default}
                onClick={() => window.open(bandShareUrl, "_blank")}
              />
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default FboardDetail;
