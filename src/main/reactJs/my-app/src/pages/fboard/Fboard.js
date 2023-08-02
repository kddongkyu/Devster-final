import "./style/Fboard.css";

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";
import { JwtPageChk, useJwtPageChk } from "../../api/JwtPageChk";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";
import { jwtHandleError } from "../../api/JwtHandleError";
import ad1 from './assets/devster.png';

function Fboard(props) {
  const handleRefresh = () => {
    // 새로고침 버튼용
    window.location.reload();
  };
  const JwtPageChk = useJwtPageChk();
  const [freeBoardList, setFreeBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [noticePost,setNoticePost] = useState({});
  const [contentCount, setContentCount] = useState(15);
  const [subjectCount, setsubjectCount] = useState(10);
  const navi = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
  //정렬
  const [sortProperty, setSortProperty] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  //검색
  const [inputKeyword, setInputKeyword] = useState(""); // 사용자가 입력하는 검색어
  const [finalKeyword, setFinalKeyword] = useState(""); // 최종 검색어 (검색 버튼
  const profileUrl = process.env.REACT_APP_MEMBERURL;

  const handleResize = () => {
    // 화면 너비에 따라 content 미리보기 갯수 반응형으로 변경
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
    // 화면 너비에 따라 subject 미리보기 갯수 반응형으로 변경
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

  //검색 기능
  const handleSearchButtonClick = () => {
    // 검색 버튼을 눌렀을 때 '최종 검색어'를 업데이트합니다.
    const searchKeyword = inputKeyword;
    setFinalKeyword(searchKeyword);
    // 첫 페이지의 검색 결과를 가져옵니다.
    setCurrentPage(1);
  };

  // 엔터로 검색
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  useEffect(() => {
    const page = Math.max(1, currentPage);
    getNoticeData();
    fetchFboards(page, finalKeyword, sortProperty, sortDirection);
  }, [currentPage, finalKeyword, sortProperty, sortDirection]);

  const getNoticeData = () => {
    axiosIns.get(`/api/nboard/D0/notice`)
        .then(response => {
          setNoticePost(response.data.nboard);
        })
        .catch(error => {
          jwtHandleError(error, toastAlert);
        })
  }

  const fetchFboards = async (page, keyword, sortProperty, sortDirection) => {
    const searchKeyword =
      keyword && keyword.trim() !== "" ? keyword.trim() : null;

    try {
      const response = await axiosIns.get("/api/fboard/D0", {
        params: {
          page: page - 1, // Use the page parameter
          keyword: searchKeyword,
          sortProperty,
          sortDirection,
        },
      });

      setFreeBoardList(response.data.freeBoardList);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      //axios용 에러함수
      jwtHandleError(error, toastAlert);
    }
  };

  useEffect(() => {
    // JPA로부터 데이터 가져오는 API 호출
    axiosIns
      .get("/api/fboard/D0")
      .then((response) => {
        setFreeBoardList(response.data.freeBoardList);
      })
      .catch((error) => {
        //axios용 에러함수
        jwtHandleError(error, toastAlert);
      });
  }, []);

  // 페이징
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

  // 정렬
  const onClickLatest = () => {
    setSortProperty("FBwriteDay");
    setSortDirection("DESC");
  };

  const onClickLikes = () => {
    setSortProperty("FBlikeCount");
    setSortDirection("DESC");
  };

  const onClickViews = () => {
    setSortProperty("FBreadCount");
    setSortDirection("DESC");
  };

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

  return (
    <div className="fboard">
      <div className="advertise-box">
        <img className="advertise-main"
        alt="" src={ad1}/>
      </div>
      <div className="fboard-name">
        <div className="board-name-box" />
        <div className="fboard-name-text">
          <b className="fboard-name-text-type">자유게시판</b>
          <div className="fboard-name-text-detail">
            다양한 주제의 자유로운 대화를 나누는 게시판
          </div>
        </div>
      </div>

      <div className="fboard-selection">
        <div className="fboard-selection-freeboard">
          <div className="fboard-selection-freeboard-box" />
          <div className="fboard-selection-freeboard-tex">자유</div>
        </div>
        <NavLink
          to="/qboard"
          activeClassName="active"
          className="fboard-selection-qna"
        >
          <div className="fboard-selection-qna-box" />
          <div className="fboard-selection-qna-text">{`Q&A`}</div>
        </NavLink>
        <NavLink
          to="/hboard"
          activeClassName="active"
          className="fboard-selection-hire"
        >
          <div className="fboard-selection-hire-box" />
          <div className="fboard-selection-hire-text">채용정보</div>
        </NavLink>
        <div
          className="fboard-selection-academy"
          onClick={()=>{
              JwtPageChk(navi, "/aboard")
            }}
        >
          <div className="fboard-selection-qna-box" />
          <div className="fboard-selection-academy-text">학원별</div>
        </div>
      </div>

      <div
        className="fboard-write"
        onClick={() => {
          //페이지 이동시 토큰여부 확인 함수
          JwtPageChk(navi, "/fboard/form");
        }}
      >
        <div className="fboard-write-box" />
        <img
          className="fboard-write-icon"
          alt=""
          src={require("./assets/board_write_icon.svg").default}
        />
        <div className="fboard-write-text">글쓰기</div>
      </div>

      <div className="fboard-function-sort">
        <div className="fboard-function-sort-box" />
        <div className="fboard-function-sort-time" onClick={onClickLatest}>
          최신순
        </div>
        <div className="fboard-function-sort-view" onClick={onClickViews}>
          조회순
        </div>
        <div className="fboard-function-sort-like" onClick={onClickLikes}>
          인기순
        </div>

        <img
          className="fboard-function-sort-bar2-icon"
          alt=""
          src={require("./assets/fboard_function_sort_bar.svg").default}
        />
        <img
          className="fboard-function-sort-bar-icon"
          alt=""
          src={require("./assets/fboard_function_sort_bar2.svg").default}
        />
      </div>

      <div className="fboard-function-search-input">
        <input
          className="fboard-function-search-input1"
          type="text"
          value={inputKeyword}
          placeholder="검색어를 입력해주세요"
          onChange={(e) => setInputKeyword(e.target.value)}
          onKeyDown={handleEnterKeyPress}
        />
        <img
          className="fboard-function-search-icon"
          alt=""
          src={require("./assets/board_function_search_icon2.svg").default}
          onClick={handleSearchButtonClick}
        />
      </div>
      {/* <img className="board-hr-icon" alt="" src="/board-hr.svg" /> */}
      <img
        className="fboard-pages-reset-icon"
        alt=""
        src={require("./assets/board_pages_reset.svg").default}
        onClick={handleRefresh}
      />
      <div className="fboard-pages">
        <div className="fboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
        <img
          className="fboard-pages-back-icon"
          alt=""
          src={require("./assets/board_pages_back.svg").default}
          onClick={goToPreviousPage}
          style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        />
        <img
          className="fboard-pages-forward-icon"
          alt=""
          src={require("./assets/board_pages_forward.svg").default}
          onClick={goToNextPage}
          style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        />
      </div>

      <div className="fboard-notice">
        <div className="fboard-notice-box" />
        <div className="fboard-notice-preview"
             onClick={() => {
               window.location.href = `/notice/detail/${noticePost.nb_idx}/1`;
             }}>
          <div className="fboard-notice-preview-info">
            <img
              className="fboard-notice-preview-info-logo-icon"
              alt=""
              src={
                require("./assets/board_notice_preview_info_logo.svg").default
              }
            />
            <div className="fboard-notice-preview-info-text">
              관리자 · {timeForToday(noticePost.nb_writeday)}
            </div>
          </div>
          <b className="fboard-notice-preview-subject">{noticePost.nb_subject}</b>
          <div className="fboard-notice-preview-notice">
            <div className="fboard-notice-preview-notice-bo" />
            <div className="fboard-notice-preview-notice-te">공지사항</div>
          </div>
          <div className="fboard-notice-preview-hash"># 공지사항 # 필독 # Devster</div>
          <div className="fboard-notice-preview-icons">
            <div className="fboard-notice-preview-views">
              <div className="fboard-notice-preview-views-tex">
                {noticePost.nb_readcount}
              </div>
              <img
                className="fboard-notice-preview-views-ico-icon"
                alt=""
                src={require("./assets/board_preview_views_icon.svg").default}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fboard_list">
        {freeBoardList &&
          freeBoardList.map((fboard) => {
            return (
              <div key={fboard.fboard.fb_idx} className="fboard-preview">
                <div className="fboard-preview-box" />
                <div className="fboard-preview-img-profile">
                  <img className="fboard-preview-img-profile"
                      alt=""
                       src={fboard.mPhoto ? `${profileUrl}${fboard.mPhoto}`
                           : require("./assets/logo_profile.svg").default}
                  />
                </div>
                <div className="fboard-preview-type">
                  <b className="fboard-preview-type-text">자유게시판</b>
                  <div className="fboard-preview-type-date">
                    {timeForToday(fboard.fboard.fb_writeday)}
                  </div>
                </div>
                <div className="fboard-preview-id">
                  <div className="fboard-preview-type-text">
                    {fboard.mNicname}
                  </div>
                </div>
                <NavLink
                  to={`/fboard/detail/${fboard.fboard.fb_idx}/${currentPage}`}
                >
                  <b className="fboard-preview-subject">
                    {compareValues(
                      String(fboard.fboard.fb_subject),
                      subjectCount
                    )
                      ? fboard.fboard.fb_subject.slice(0, subjectCount) + "···"
                      : fboard.fboard.fb_subject}
                  </b>
                  <div className="fboard-preview-contents">
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
                      src={fboard.fboard.fb_photo && fboard.fboard.fb_photo.length > 0
                      ? setPhotoUrl(fboard.fboard.fb_photo)
                          : require("./assets/logo-img.svg").default}
                      className="fboard-preview-img-preview"
                    />
                  </div>
                </NavLink>

                <div className="fboard-preview-likes">
                  <div className="fboard-preview-likes-text">
                    {fboard.fboard.fb_like - fboard.fboard.fb_dislike}
                  </div>
                  <img
                    className="fboard-preview-likes-icon"
                    alt=""
                    src={
                      require("./assets/board_preview_likes_icon.svg").default
                    }
                  />
                </div>
                <div className="fboard-preview-comments">
                  <div className="fboard-preview-likes-text">{fboard.fboardCommentCount}</div>
                  <img
                    className="fboard-preview-comments-icon"
                    alt=""
                    src={
                      require("./assets/board_preview_comments_icon.svg")
                        .default
                    }
                  />
                </div>
                <div className="fboard-preview-views">
                  <div className="fboard-preview-views-text">
                    {fboard.fboard.fb_readcount}
                  </div>
                  <img
                    className="fboard-preview-views-icon"
                    alt=""
                    src={
                      require("./assets/board_preview_views_icon.svg").default
                    }
                  />
                </div>
              </div>
            );
          })}
      </div>

      <div className="fboard-pages2">
        <div className="fboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
        <img
          className="fboard-pages-back-icon"
          alt=""
          src={require("./assets/board_pages_back.svg").default}
          onClick={goToPreviousPage}
          style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        />
        <img
          className="fboard-pages-forward-icon"
          alt=""
          src={require("./assets/board_pages_forward.svg").default}
          onClick={goToNextPage}
          style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        />
      </div>
    </div>
  );
}

export default Fboard;