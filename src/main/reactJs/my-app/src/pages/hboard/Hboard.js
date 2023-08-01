import { NavLink, useParams, useNavigate, redirect } from "react-router-dom";
import "./style/Hboard.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";
import { JwtPageChk } from "../../api/JwtPageChk";
import { checkToken } from "../../api/checkToken";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";
import { jwtHandleError } from "../../api/JwtHandleError";

function Hboard(props) {
  const handleRefresh = () => {
    //새로고침 버튼용
    window.location.reload();
  };

  const [hireBoardList, setHireBoardList] = useState([]);
  const [noticeArticle, setNoticeArticle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navi = useNavigate();
  const [contentCount, setContentCount] = useState(15); //텍스트의 초기 개수
  const [subjectCount, setsubjectCount] = useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
  const profileUrl = process.env.REACT_APP_MEMBERURL;

  //정렬
  const [sortProperty, setSortProperty] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  //검색
  const [inputKeyword, setInputKeyword] = useState(""); //사용자가 입력하는 검색어
  const [finalKeyword, setFinalKeyword] = useState(""); //최종 검색어 (검색버튼)

  //디코딩 함수
  const de = checkToken();

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

  //검색 기능
  const handleSearchButtonClick = () => {
    //검색 버튼을 눌렀을 때 '최종 검색어'를 업데이트합니다.
    const searchKeyword = inputKeyword;
    setFinalKeyword(searchKeyword);
    //첫 페이지의 검색 결과를 가져옵니다.
    setCurrentPage(1);
  };
  //엔터로 검색
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  useEffect(() => {
    const page = Math.max(1, currentPage);
    fetchHboards(page, finalKeyword, sortProperty, sortDirection);
  }, [currentPage, finalKeyword, sortProperty, sortDirection]);

  const fetchHboards = async (page, keyword, sortProperty, sortDirection) => {
    const searchKeyword =
      keyword && keyword.trim() !== "" ? keyword.trim() : null;

    try {
      const response = await axiosIns.get("/api/hboard/D0", {
        params: {
          page: page - 1, //Use the page parameter
          keyword: searchKeyword,
          sortProperty,
          sortDirection,
        },
      });

      setHireBoardList(response.data.hireBoardList);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      jwtHandleError(error, toastAlert);
    }
  };

  useEffect(() => {
    // JPA로부터 데이터 가져오는 API 호출
    axiosIns
      .get("/api/hboard/D0")
      .then((response) => {
        setHireBoardList(response.data.hireBoardList);
      })
      .catch((error) => {
        jwtHandleError(error, toastAlert);
      });
  }, []);

  useEffect(() => {
    // notice board에서 최신 글 가져오는 API 호출
    axiosIns
      .get("/api/nboard/D0/notice")
      .then((response) => {
        setNoticeArticle(response.data.nboard);
      })
      .catch((error) => {
        jwtHandleError(error, toastAlert);
      });
  }, []);

  //페이징
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

  //정렬
  const onClickLatest = () => {
    setSortProperty("HBwriteday");
    setSortDirection("DESC");
  };

  const onClickViews = () => {
    setSortProperty("HBreadcount");
    setSortDirection("DESC");
  };

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
    const photoUrl = process.env.REACT_APP_PHOTO + "hboard/";
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
    <div className="hboard">
      <div className="advertise-box">
        <div className="advertise-main" />
        <b className="advertise-text">광고</b>
      </div>
      <div className="hboard-name">
        <div className="hboard-name-box" />
        <div className="hboard-name-text">
          <b className="hboard-name-text-type">채용정보 게시판</b>
          <div className="hboard-name-text-detail">
            다양한 기업들의 공고를 확인할 수 있는 게시판
          </div>
        </div>
      </div>
      <div className="hboard-selection">
        <NavLink
          to="/fboard"
          activeClassName="active"
          className="hboard-selection-freeboard"
        >
          <div className="hboard-selection-freeboard-box" />
          <div className="hboard-selection-freeboard-text">자유</div>
        </NavLink>
        <NavLink
          to="/qboard"
          activeClassName="active"
          className="fboard-selection-qna"
        >
          <div className="hboard-selection-qna-box" />
          <div className="hboard-selection-qna-text">{`Q&A`}</div>
        </NavLink>
        <div className="hboard-selection-hire">
          <div className="hboard-selection-hire-box" />
          <div className="hboard-selection-hire-text">채용정보</div>
        </div>
        <NavLink
          to="/aboard"
          activeClassName="active"
          className="hboard-selection-academy"
        >
          <div className="hboard-selection-qna-box" />
          <div className="hboard-selection-academy-text">학원별</div>
        </NavLink>
      </div>

      {de.type === "company" && (
        <div
          className="hboard-write"
          onClick={() => {
            JwtPageChk(navi, "/hboard/form");
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="hboard-write-box" />
          <img
            className="hboard-write-icon"
            alt=""
            src={require("./assets/hboard_write_icon.svg").default}
          />
          <div className="hboard-write-text">글쓰기</div>
        </div>
      )}

      <div className="hboard-function-sort">
        <div className="hboard-function-sort-box" />
        <div className="hboard-function-sort-time" onClick={onClickLatest}>
          최신순
        </div>
        <div className="hboard-function-sort-view" onClick={onClickViews}>
          조회순
        </div>
        {/* <div className="fboard-function-sort-like">인기순</div> */}
        <img
          className="fboard-function-sort-bar2-icon"
          alt=""
          src={require("./assets/hboard_function_sort_bar.svg").default}
        />
        {/* <img
          className="fboard-function-sort-bar-icon"
          alt=""
          src={require("./assets/hboard_function_sort_bar2.svg").default}
        /> */}
      </div>

      <div className="hboard-function-search-input">
        <input
          className="hboard-function-search-input1"
          type="text"
          value={inputKeyword}
          placeholder="검색어를 입력해주세요"
          onChange={(e) => setInputKeyword(e.target.value)}
          onKeyDown={handleEnterKeyPress}
        />
        <img
          className="hboard-function-search-icon"
          alt=""
          src={require("./assets/hboard_function_search_icon.svg").default}
          onClick={handleSearchButtonClick}
        />
      </div>
      <img
        className="hboard-pages-reset-icon"
        alt=""
        src={require("./assets/hboard_pages_reset.svg").default}
        onClick={handleRefresh}
      />
      <div className="hboard-pages">
        <div className="hboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
        <img
          className="hboard-pages-back-icon"
          alt=""
          src={require("./assets/hboard_pages_back.svg").default}
          onClick={goToPreviousPage}
          style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        />
        <img
          className="hboard-pages-forward-icon"
          alt=""
          src={require("./assets/hboard_pages_forward.svg").default}
          onClick={goToNextPage}
          style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        />
      </div>

      {/* <img className="board-hr-icon1" alt="" src="/board-hr1.svg" /> */}

      <div className="hboard-notice">
        <div className="hboard-notice-box" />

        <div key={noticeArticle.nb_idx} className="hboard-notice-preview">
          <div className="hboard-notice-preview-info">
            <img
              className="board-notice-preview-info-logo-icon"
              alt=""
              src={
                require("./assets/board_notice_preview_info_logo.svg").default
              }
            />
            <div className="hboard-notice-preview-info-tex">
              {/* admin_01 · 약 4시간 전 */}
              관리자 · {timeForToday(noticeArticle.nb_writeday)}
            </div>
          </div>
          <b
            className="hboard-notice-preview-subject"
            onClick={() => {
              JwtPageChk(navi, `api/nboard/D0/${noticeArticle.nb_idx}`);
            }}
            style={{ cursor: "pointer" }}
          >
            {noticeArticle.nb_subject}
          </b>
          <div className="hboard-notice-preview-notice">
            <div className="hboard-notice-preview-notice-b" />
            <div className="hboard-notice-preview-notice-t">공지사항</div>
          </div>
          <div className="hboard-notice-preview-hash">#공지사항 # Devster</div>
          <div className="hboard-notice-preview-icons">
            <div className="hboard-notice-preview-views">
              <div className="hboard-notice-preview-views-te">
                {noticeArticle.nb_readcount}
              </div>
              <img
                className="hboard-notice-preview-views-ic-icon"
                alt=""
                src={
                  require("./assets/hboard_notice_preview_views_icon.svg")
                    .default
                }
              />
            </div>
            {/* <div className="hboard-notice-preview-icons-co">
              <div className="hboard-notice-preview-views-te">99</div>
              <img
                className="hboard-notice-preview-icons-co2"
                alt=""
                src={
                  require("./assets/hboard_notice_preview_icons_comments_icon.svg")
                    .default
                }
              />
            </div>
            <div className="hboard-notice-preview-icons-li">
              <div className="hboard-notice-preview-icons-li1">9</div>
              <img
                className="hboard-notice-preview-icons-li2"
                alt=""
                src={
                  require("./assets/hboard_notice_preview_icons_likes_icon.svg")
                    .default
                }
              />
            </div> */}
          </div>
        </div>
      </div>

      <div className="hboard_list">
        {hireBoardList &&
          hireBoardList.map((hboard) => {
            return (
              <div key={hboard.hboard.hb_idx} className="hboard-preview">
                <div className="hboard-preview-box" />
                <div className="fboard-preview-img-profile">
                  <img
                    alt=""
                    src={require("./assets/companymembericon.svg").default}
                    className="fboard-preview-img-profile"
                  />
                </div>
                <div className="hboard-preview-type">
                  <b className="hboard-preview-type-text">채용게시판</b>
                  <div className="hboard-preview-type-date">
                    {timeForToday(hboard.hboard.hb_writeday)}
                    &nbsp;&nbsp;&nbsp;
                    <img
                      src={
                        require("./assets/hboard_preview_views_icon.svg")
                          .default
                      }
                    />
                    &nbsp;
                    {hboard.hboard.hb_readcount}
                  </div>
                </div>
                <div className="hboard-preview-id">
                  <div className="hboard-preview-type-text">
                    {hboard.cmCompname}
                  </div>
                </div>

                <div
                  onClick={() => {
                    // JwtPageChk(
                    //   navi,
                    //   `/hboard/detail/${hboard.hboard.hb_idx}/${currentPage}`
                    // );
                    navi(
                      `/hboard/detail/${hboard.hboard.hb_idx}/${currentPage}`
                    );
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <b className="hboard-preview-subject">
                    {compareValues(
                      String(hboard.hboard.hb_subject),
                      subjectCount
                    )
                      ? hboard.hboard.hb_subject.slice(0, subjectCount) + "···"
                      : hboard.hboard.hb_subject}
                  </b>
                  <div className="hboard-preview-contents">
                    {compareValues(
                      String(hboard.hboard.hb_content),
                      contentCount
                    )
                      ? hboard.hboard.hb_content.slice(0, contentCount) + "···"
                      : hboard.hboard.hb_content}
                    {/* {hboard.hboard.hb_content.slice(0, contentCount)} */}
                  </div>
                  <div>
                    <img
                      alt=""
                      src={setPhotoUrl(hboard.hboard.hb_photo)}
                      className="hboard-preview-img-preview"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="hboard-pages2">
        <div className="hboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
        <img
          className="hboard-pages-back-icon"
          alt=""
          src={require("./assets/hboard_pages_back.svg").default}
          onClick={goToPreviousPage}
          style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        />
        <img
          className="hboard-pages-forward-icon"
          alt=""
          src={require("./assets/hboard_pages_forward.svg").default}
          onClick={goToNextPage}
          style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        />
      </div>
    </div>
  );
}

export default Hboard;
