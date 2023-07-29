import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";
import { checkToken } from "../../api/checkToken";

function NoticeAdmin(props) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const [noticeBoardList, setNoticeBoardList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [contentCount, setContentCount] = useState(15);
  const [subjectCount, setsubjectCount] = useState(10);

  const handleResize = () => {
    // 화면 너비에 따라 텍스트 개수를 업데이트
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1000) {
      setContentCount(80);
    } else if (screenWidth >= 768) {
      setContentCount(45);
    } else if (screenWidth >= 600) {
      setContentCount(35);
    } else if (screenWidth >= 480) {
      setContentCount(25);
    } else {
      setContentCount(15);
    }
  };
  const handleSubjectResize = () => {
    // 화면 너비에 따라 텍스트 개수를 업데이트
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1000) {
      setsubjectCount(50);
    } else if (screenWidth >= 768) {
      setsubjectCount(35);
    } else if (screenWidth >= 600) {
      setsubjectCount(25);
    } else if (screenWidth >= 480) {
      setsubjectCount(20);
    } else {
      setsubjectCount(10);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleSubjectResize);
    handleSubjectResize();

    return () => {
      window.removeEventListener("resize", handleSubjectResize);
    };
  }, []);

  const compareValues = (value1, value2) => {
    return value1.length > value2;
  };

  useEffect(() => {
    fetchNoticeboards(currentPage);
  }, [currentPage]);

  const fetchNoticeboards = (page) => {
    axiosIns
      .get("/api/nboard/D0", { params: { page: page - 1 } })
      .then((response) => {
        setNoticeBoardList(response.data.noticeBoardList);
        setTotalPages(response.data.totalPages);
      })
      .catch((e) => {
        jwtHandleError(e, toastAlert);
      });
  };

  useEffect(() => {
    axiosIns
      .get("/api/nboard/D0")
      .then((response) => {
        setNoticeBoardList(response.data.noticeBoardList);
      })
      .catch((error) => {
        console.error("Error fetching nboards:", error);
      });
  }, []);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const timeForToday = (value) => {
    if (!value) {
      return "";
    }

    const valueConv = value.slice(0, -10);
    const today = new Date();
    const timeValue = new Date(valueConv);

    const timeValueUTC = new Date(timeValue.toISOString());
    const offset = timeValue.getTimezoneOffset() * 60 * 1000;
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

  const [member, setMember] = useState({});

  const [companyMember, setCompanyMember] = useState([]);

  const memberType = jwt_decode(localStorage.accessToken).type;

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
    <div
      className="notice"
      style={{
        height: `${15 + noticeBoardList.length * 14}rem`,
      }}
    >
      <div className="notice-content-box-admin">
        <div className="notice-header">
          <div className="notice-header-box" />
          <b className="text-content-notice">공지사항</b>
          <p className="text-content-notice-sub">
            DEVSTER 새소식, 행사, 이벤트 정보
          </p>
        </div>

        {memberType === "normal" && member.m_role === "ADMIN" && (
          <NavLink to="/nboard/form" className="nboard-write">
            <div className="nboard-write-box" />
            <img
              className="nboard-write-icon"
              alt=""
              src={require("./assets/board_write_icon.svg").default}
            />
            <div className="nboard-write-text">글쓰기</div>
          </NavLink>
        )}

        <div className="notice-options">
          <img
            className="nboard-pages-reset-icon"
            alt=""
            src={require("./assets/board_pages_reset.svg").default}
            onClick={handleRefresh}
            style={{
              right:
                memberType === "normal" && member.m_role === "ADMIN"
                  ? "15rem"
                  : "",
              left:
                (memberType === "normal" && member.m_role === "USER") ||
                (memberType === "normal" && member.m_role === "GUEST") ||
                memberType === "company"
                  ? "1.6rem"
                  : "",
            }}
          />
          <div className="nboard-pages">
            <div className="nboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
            <img
              className="nboard-pages-back-icon"
              alt=""
              src={require("./assets/board_pages_back.svg").default}
              onClick={goToPreviousPage}
              style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
            />
            <img
              className="nboard-pages-forward-icon"
              alt=""
              src={require("./assets/board_pages_forward.svg").default}
              onClick={goToNextPage}
              style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
            />
          </div>
        </div>
        <hr className="nboard-pages-hr" />

        {noticeBoardList &&
          noticeBoardList.map((nboard, index) => {
            return (
              <div
                className={`content-notice-${index + 1}`}
                key={nboard.nboard.nb_idx}
              >
                <div className="notice-content-box1" />
                <div className="notice-content-text-01">
                  <img
                    className="logo-content-notice-icon"
                    alt=""
                    src={require("./assets/logo_content_notice.svg").default}
                  />
                  <span style={{ position: "absolute", left: "2.7rem" }}>
                    관리자
                  </span>
                  <div className="text-notice-write-time">
                    {timeForToday(nboard.nboard.nb_writeday)}
                  </div>
                </div>
                <NavLink
                  to={`/nboard/detail/${nboard.nboard.nb_idx}/${currentPage}`}
                >
                  <b className="notice-content-title">
                    {compareValues(
                      String(nboard.nboard.nb_subject),
                      subjectCount
                    )
                      ? nboard.nboard.nb_subject.slice(0, subjectCount) + "···"
                      : nboard.nboard.nb_subject}
                  </b>
                </NavLink>
                <div className="notice-content-badge">공지사항</div>
                <div className="notice-content-hashtag"></div>
                <div className="content-notice-utils">
                  <div className="content-notice-viewcount">
                    <div className="number-viewcount">
                      {nboard.nboard.nb_readcount}
                    </div>
                    <img
                      className="icon-view"
                      alt=""
                      src={require("./assets/icon_readcount.png")}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        <div className="nboard-pages2">
          <div className="nboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
          <img
            className="nboard-pages-back-icon"
            alt=""
            src={require("./assets/board_pages_back.svg").default}
            onClick={goToPreviousPage}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          />
          <img
            className="nboard-pages-forward-icon"
            alt=""
            src={require("./assets/board_pages_forward.svg").default}
            onClick={goToNextPage}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          />
        </div>
      </div>
    </div>
  );
}

export default NoticeAdmin;
