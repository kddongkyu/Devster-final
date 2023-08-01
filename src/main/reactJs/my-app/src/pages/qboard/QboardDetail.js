import React, { useCallback, useEffect, useState } from "react";
import "./style/QboardDetail.css";
import axiosIns from "../../api/JwtConfig";
import { useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../../api/checkToken";
import ToastAlert from "../../api/ToastAlert";
import { useSnackbar } from "notistack";
import { jwtHandleError } from "../../api/JwtHandleError";
import QboardCommentForm from "./comment/QboardCommentForm";
import QboardComment from "./comment/QboardComment";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function QboardDetail(props) {
  //에러 호출용 변수
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
  //디코딩 함수
  const de = checkToken();
  const [qboardData, setQboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { qb_idx, currentPage } = useParams();
  const [arrayFromString, setArrayFromString] = useState([]);
  const [m_photo, setM_photo] = useState(null);
  const [m_nickname, setM_nickname] = useState(null);

  const navi = useNavigate();
  const photoUrl = process.env.REACT_APP_PHOTO + "qboard/";
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

  useEffect(() => {
    const getDetailData = () => {
      axiosIns
        .get(`/api/qboard/D0/${qb_idx}`)
        .then((response) => {
          setM_photo(response.data.photo);
          setM_nickname(response.data.nickname);
          setQboardData(response.data.qboardDto);
          if (response.data.qboardDto.qb_photo) {
            setArrayFromString(response.data.qboardDto.qb_photo.split(","));
          }
          setIsLoading(false);
        })
        .catch((error) => {
          jwtHandleError(error, toastAlert);
        });
    };

    getDetailData();
  }, [qb_idx]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const deleteQboard = (qb_idx) => {
    if (window.confirm("해당 게시글을 삭제하시겠습니까?")) {
      axiosIns
        .delete(`/api/qboard/D1/${qb_idx}`)
        .then((response) => {
          window.location.href = "/qboard";
        })
        .catch((error) => {
          jwtHandleError(error, toastAlert);
        });
    }
  };

  const qboardNavigation = () => {
    const url = "/qboard";
    window.location.href = url;
  };

  const updateNavigation = () => {
    const url = `/qboard/form/${qb_idx}/${currentPage}`;
    window.location.href = url;
  };

  const handleNicknameClick = () => {
    // recv_nick은 이 컴포넌트에서 사용할 수 있는 형태로 가져옵니다.
    const recv_nick = m_nickname;
    navi(`/message/form/${recv_nick}`);
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

  const setMemberPhotoUrl = (value) => {
    if (!value) {
      return require("./assets/logo_profile.svg").default;
    }
    const photoUrl = process.env.REACT_APP_PHOTO + "member/";
    const srcUrl = photoUrl + value;

    return srcUrl;
  };

  return (
    <div className="qboard-detail">
      <div className="qboard-advertise-box">
        <div className="qboard-advertise-main" />
        <b className="qboard-advertise-text">광고</b>
      </div>

      <div className="qboard-detail-type-text">Q&A 게시판</div>
      <div className="qboard-detail-info">
        <img
          className="qboard-detail-info-profile-img-icon"
          alt=""
          src={setMemberPhotoUrl(m_photo)}
          onClick={handleNicknameClick}
        />
        <div
          className="qboard-detail-info-nickname"
          onClick={handleNicknameClick}
        >
          {m_nickname}
        </div>
        <div className="qboard-detail-info-status-text">
          <span>{qboardData.qb_readcount}</span>
        </div>
        <div className="qboard-detail-info-status-text1">
          {timeForToday(qboardData.qb_writeday)}
        </div>
        <img
          className="qboard-detail-info-status-view-icon"
          alt=""
          src={
            require("./assets/boarddetail/notice_detail_info_status_views.svg")
              .default
          }
        />
      </div>

      <img
        className="qboard-url-icon"
        alt=""
        src={
          require("./assets/boarddetail/notice_detail_header_function_url.svg")
            .default
        }
        onClick={() => handleOpen()}
      />

      {de && de.idx === qboardData.m_idx && (
        <>
          <img
            className="qboard-update-icon"
            alt=""
            src={require("./assets/boarddetail/edit.svg").default}
            onClick={() => updateNavigation()}
          />
          <img
            className="qboard-delete-icon"
            alt=""
            src={require("./assets/boarddetail/trash.svg").default}
            onClick={() => deleteQboard(qb_idx)}
          />
        </>
      )}

      <div className="qboard-detail-textarea">
        <div className="qboard-detail-textarea-subject">
          {qboardData.qb_subject}
        </div>

        <div className="qboard-detail-textarea-contents">
          <pre style={{ marginBottom: "5rem" }}>{qboardData.qb_content}</pre>
        </div>

        <div className="qboard-detail-photo-list">
          {arrayFromString &&
            arrayFromString.map((imageId, index) => (
              <div>
                <img
                  className="qboard-detail-photo"
                  key={index}
                  src={`${photoUrl}${imageId}`}
                  alt={`Image ${index}`}
                />
              </div>
            ))}

          {/* 여기서부터 밑으로 정렬 */}
          <div className="qboard-detail-listbackcounter">
            <div className="qboard-detail-listback" onClick={qboardNavigation}>
              <div className="qboard-detail-listback-rec" />
              <div className="qboard-detail-listback-text">목록</div>
              <img
                className="qboard-detail-listback-icon"
                alt=""
                src={
                  require("./assets/boarddetail/board_detail_listback_icon.svg")
                    .default
                }
              />
            </div>
          </div>
          <div className="qboard-advertise-box2">
            <div className="qboard-advertise-main" />
            <b className="qboard-advertise-text1">광고 2</b>
          </div>
        </div>
      </div>

      <div className="qboard-comments-box">
        <QboardCommentForm qb_idx={qb_idx} />
        <QboardComment qb_idx={qb_idx} />
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

export default QboardDetail;
