import React from "react";
import { useState } from "react";
import axiosIns from "../../api/JwtConfig";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function ResumeList(props) {
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const handleRefresh = () => {
    window.location.reload();
  };

  const [resumeList, setResumeList] = useState([]);

  console.log(resumeList);

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
    // 컴포넌트가 마운트되거나 화면 크기가 변경될 때 리사이즈 이벤트 핸들러 등록
    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 렌더링 시 텍스트 개수 설정

    return () => {
      // 컴포넌트가 언마운트될 때 리사이즈 이벤트 핸들러 제거
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // 컴포넌트가 마운트되거나 화면 크기가 변경될 때 리사이즈 이벤트 핸들러 등록
    window.addEventListener("resize", handleSubjectResize);
    handleSubjectResize(); // 초기 렌더링 시 텍스트 개수 설정

    return () => {
      // 컴포넌트가 언마운트될 때 리사이즈 이벤트 핸들러 제거
      window.removeEventListener("resize", handleSubjectResize);
    };
  }, []);

  const compareValues = (value1, value2) => {
    return value1.length > value2;
  };

  useEffect(() => {
    fetchResumeList(currentPage);
  }, [currentPage]);

  const fetchResumeList = (page) => {
    axiosIns
      .get("/api/resume/D1/alllist", { params: { page: page - 1 } })
      .then((response) => {
        console.log(response.data);
        setResumeList(response.data);
        //setTotalPages(response.data.totalPages);
      })
      .catch((e) => {
        jwtHandleError(e, toastAlert);
      });
  };

  useEffect(() => {
    // JPA로부터 데이터 가져오는 API 호출
    axiosIns
      .get("/api/resume/D1/alllist")
      .then((response) => {
        setResumeList(response.data);
      })
      .catch((e) => {
        jwtHandleError(e, toastAlert);
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
    <div
      className="notice"
      style={{
        height: `${11.4 + resumeList.length * 14}rem`,
      }}
    >
      <div className="notice-content-box-admin">
        <div className="notice-header">
          <div className="notice-header-box" />
          <b className="text-content-notice">구직자 이력서 리스트</b>
          <p className="text-content-notice-sub">
            구직자 이력서 목록 조회 페이지
          </p>
        </div>

        <hr className="nboard-pages-hr" />

        {resumeList &&
          resumeList.map((resume, index) => {
            return (
              <div className={`content-notice-${index + 1}`} key={index}>
                <div className="notice-content-box1" />
                <div className="notice-content-text-01">
                  <img
                    className="logo-content-notice-icon"
                    alt=""
                    //   src="/logo-content-notice.svg"
                    src={require("./assets/logo_content_notice.svg").default}
                  />
                  <div className="text-notice-write-time">
                    {/* {timeForToday(resume.nboard.nb_writeday)} */}
                  </div>
                </div>
                <NavLink
                  to={`/resume/detail/${resume.resumeDto.m_idx}/${currentPage}`}
                >
                  <b className="notice-content-title">
                    {compareValues(String(resume.resumeDto.r_pos), subjectCount)
                      ? resume.resumeDto.r_pos.slice(0, subjectCount) + "···"
                      : resume.resumeDto.r_pos}
                  </b>
                </NavLink>
                <div className="notice-content-badge">이력서</div>
                <div className="notice-content-hashtag">#이력서 # Devster</div>
                <div className="content-notice-utils"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ResumeList;
