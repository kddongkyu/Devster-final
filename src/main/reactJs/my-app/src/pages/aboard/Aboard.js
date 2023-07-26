import { NavLink } from "react-router-dom";
import "./style/Aboard.css";
import { useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";

function Aboard(props) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const [academyBoardList, setAcademyBoardList] = useState([]);
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
    fetchAboards(currentPage);
  }, [currentPage]);

  const fetchAboards = (page) => {
    axiosIns
      .get("/api/aboard/D0", { params: { page: page - 1 } })
      .then((response) => {
        setAcademyBoardList(response.data.academyBoardList);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching aboards:", error);
      });
  };

  useEffect(() => {
    // JPA로부터 데이터 가져오는 API 호출
    axiosIns
      .get("/api/aboard/D0")
      .then((response) => {
        setAcademyBoardList(response.data.academyBoardList);
      })
      .catch((error) => {
        console.error("Error fetching aboards:", error);
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

  const setPhotoUrl = (value) => {
    if (value == null) {
      return require("./assets/logo-img.svg").default;
    }
    const photoUrl = process.env.REACT_APP_PHOTO + "fboard/";
    const firstCommaIndex = value.indexOf(",");
    const parsedPhoto = value.substring(0, firstCommaIndex);
    const srcUrl = photoUrl + parsedPhoto;

    return srcUrl;
  };

  return (
    <div className="aboard">
      <div className="advertise-box">
        <div className="advertise-main" />
        <b className="advertise-text">광고</b>
      </div>
      <div className="aboard-name">
        <div className="aboard-name-box" />
        <div className="aboard-name-text">
          <b className="board-name-text-type">학원별 게시판</b>
          <div className="board-name-text-detail">
            인증이 완료된 사용자만 열람할 수 있는 게시판입니다.
          </div>
        </div>
      </div>
      <div className="aboard-selection">
        <NavLink
          to="/fboard"
          activeClassName="active"
          className="aboard-selection-freeboard"
        >
          <div className="aboard-selection-freeboard-box" />
          <div className="aboard-selection-freeboard-tex">자유</div>
        </NavLink>
        <NavLink
          to="/qboard"
          activeClassName="active"
          className="aboard-selection-qna"
        >
          <div className="aboard-selection-qna-box" />
          <div className="aboard-selection-qna-text">{`Q&A`}</div>
        </NavLink>
        <NavLink
          to="/hboard"
          activeClassName="active"
          className="aboard-selection-hire"
        >
          <div className="aboard-selection-hire-box" />
          <div className="aboard-selection-hire-text">채용정보</div>
        </NavLink>

        <div className="aboard-selection-academy">
          <div className="aboard-selection-academy-box" />
          <div className="aboard-selection-academy-text">학원별</div>
        </div>
      </div>
      <NavLink
        to="/aboard/form"
        activeClassName="active"
        className="aboard-write"
      >
        <div className="aboard-write-box" />
        <img
          className="aboard-write-icon"
          alt=""
          src={require("./assets/board_write_icon.svg").default}
        />
        <div className="aboard-write-text">글쓰기</div>
      </NavLink>
      <div className="aboard-function-sort">
        <div className="aboard-function-sort-box" />
        <div className="aboard-function-sort-time">최신순</div>
        <div className="aboard-function-sort-view">조회순</div>
        <div className="aboard-function-sort-like">인기순</div>
        <img
          className="aboard-function-sort-bar2-icon"
          alt=""
          src={require("./assets/aboard_function_sort_bar.svg").default}
        />
        <img
          className="aboard-function-sort-bar-icon"
          alt=""
          src={require("./assets/aboard_function_sort_bar2.svg").default}
        />
      </div>

      <div className="aboard-function-search-input">
        <input type="text" className="aboard-function-search-input1" />
        <img
          className="aboard-function-search-icon"
          alt=""
          src={require("./assets/board_function_search_icon2.svg").default}
        />
      </div>
      <img className="aboard-hr-icon" alt="" src="/aboard-hr.svg" />
      <img
        className="aboard-pages-reset-icon"
        alt=""
        src={require("./assets/board_pages_reset.svg").default}
        onClick={handleRefresh}
      />
      <div className="aboard-pages">
        <div className="aboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
        <img
          className="aboard-pages-back-icon"
          alt=""
          src={require("./assets/board_pages_back.svg").default}
          onClick={goToPreviousPage}
          style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        />
        <img
          className="aboard-pages-forward-icon"
          alt=""
          src={require("./assets/board_pages_forward.svg").default}
          onClick={goToNextPage}
          style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        />
      </div>
      <img className="aboard-hr-icon1" alt="" src="/aboard-hr1.svg" />
      <div className="aboard-notice">
        <div className="aboard-notice-box" />
        <div className="aboard-notice-preview">
          <div className="aboard-notice-preview-info">
            <img
              className="aboard-notice-preview-info-log-icon"
              alt=""
              src={
                require("./assets/board_notice_preview_info_logo.svg").default
              }
            />
            <div className="aboard-notice-preview-info-tex">
              admin_01 · 약 4시간 전
            </div>
          </div>
          <b className="aboard-notice-preview-subject">DEVSTER 공지사항</b>
          <div className="aboard-notice-preview-notice">
            <div className="aboard-notice-preview-notice-b" />
            <div className="aboard-notice-preview-notice-t">공지사항</div>
          </div>
          <div className="aboard-notice-preview-hash">#공지사항 # Devster</div>
          <div className="aboard-notice-preview-icons">
            <div className="aboard-notice-preview-views">
              <div className="aboard-notice-preview-views-te">800</div>
              <img
                className="aboard-notice-preview-views-ic-icon"
                alt=""
                src={require("./assets/board_preview_views_icon.svg").default}
              />
            </div>
            <div className="aboard-notice-preview-icons-co">
              <div className="aboard-notice-preview-views-te">99</div>
              <img
                className="aboard-notice-preview-icons-co2"
                alt=""
                src={
                  require("./assets/board_preview_comments_icon.svg").default
                }
              />
            </div>
            <div className="aboard-notice-preview-icons-li">
              <div className="aboard-notice-preview-icons-li1">9</div>
              <img
                className="aboard-notice-preview-icons-li2"
                alt=""
                src={require("./assets/board_preview_likes_icon.svg").default}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="aboard_list">
        {academyBoardList &&
          academyBoardList.map((aboard) => {
            return (
              <div key={aboard.aboard.ab_idx} className="aboard-preview">
                <div className="aboard-preview-box" />
                <div className="aboard-preview-img-profile">
                  <img alt="" src={aboard.mPhoto} />
                </div>
                <div className="aboard-preview-type">
                  <b className-="aboard-preview-type-text">학원별게시판</b>
                  <div className="aboard-preview-type-date">
                    {timeForToday(aboard.aboard.ab_writeday)}
                  </div>
                </div>
                <div className="aboard-preview-id">
                  <div className="aboard-preview-type-text">
                    {aboard.mNicname}
                  </div>
                </div>
                <NavLink
                  to={`/aboard/detail/${aboard.aboard.ab_idx}/${currentPage}`}
                >
                  <b className="aboard-preview-subject">
                    {compareValues(
                      String(aboard.aboard.ab_subject),
                      subjectCount
                    )
                      ? aboard.aboard.ab_subject.slice(0, subjectCount) + "···"
                      : aboard.aboard.ab_content}
                  </b>
                  <div className="aboard-preview-contents">
                    {compareValues(
                      String(aboard.aboard.ab_content),
                      contentCount
                    )
                      ? aboard.aboard.ab_content.slice(0, contentCount) + "···"
                      : aboard.aboard.ab_content}
                  </div>
                  <div>
                    <img
                      alt=""
                      src={setPhotoUrl(aboard.aboard.ab_photo)}
                      className="aboard-preview-img-preview"
                    />
                  </div>
                </NavLink>

                <div className="aboard-preview-likes">
                  <div className="aboard-preview-likes-text">
                    {aboard.aboard.ab_like - aboard.aboard.ab_dislike}
                  </div>
                  <img
                    className="aboard-preview-likes-icon"
                    alt=""
                    src={
                      require("./assets/board_preview_likes_icon.svg").default
                    }
                  />
                </div>
                <div className="aboard-preview-comments">
                  <div className="aboard-preview-likes-text">99</div>
                  <img
                    className="aboard-preview-comments-icon"
                    alt=""
                    src={
                      require("./assets/board_preview_comments_icon.svg")
                        .default
                    }
                  />
                </div>
                <div className="aboard-preview-views">
                  <div className="aboard-preview-views-text">
                    {aboard.aboard.ab_readcount}
                  </div>
                  <img
                    className="aboard-preview-views-icon"
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

      <div className="aboard-pages2">
        <div className="aboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
        <img
          className="aboard-pages-back-icon"
          alt=""
          src={require("./assets/board_pages_back.svg").default}
          onClick={goToPreviousPage}
          style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        />
        <img
          className="aboard-pages-forward-icon"
          alt=""
          src={require("./assets/board_pages_forward.svg").default}
          onClick={goToNextPage}
          stype={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        />
      </div>
    </div>

    //   <div className="aboard-preview">
    //     <div className="aboard-preview-box" />
    //     <div className="aboard-preview-img-profile" />
    //     <div className="aboard-preview-type">
    //       <b className="aboard-preview-type-text">게시판명길이최대로</b>
    //       <div className="aboard-preview-type-date">작성시간</div>
    //     </div>
    //     <div className="aboard-preview-id">
    //       <div className="aboard-preview-type-text">아이디명최대로</div>
    //     </div>
    //     <b className="aboard-preview-subject">제목 일이삼사오육칠팔구...</b>
    //     <div className="aboard-preview-contents">
    //       본문 일이삼사오육칠팔구십일이...
    //     </div>
    //     <div className="aboard-preview-img-preview" />
    //     <div className="aboard-preview-likes">
    //       <div className="aboard-preview-likes-text">99.9k</div>
    //       <img
    //         className="aboard-preview-likes-icon"
    //         alt=""
    //         src={require("./assets/board_preview_likes_icon.svg").default}
    //       />
    //     </div>
    //     <div className="aboard-preview-comments">
    //       <div className="aboard-preview-likes-text">99.9k</div>
    //       <img
    //         className="aboard-preview-comments-icon"
    //         alt=""
    //         src={require("./assets/board_preview_comments_icon.svg").default}
    //       />
    //     </div>
    //     <div className="aboard-preview-views">
    //       <div className="aboard-preview-views-text">99.9k</div>
    //       <img
    //         className="aboard-preview-views-icon"
    //         alt=""
    //         src={require("./assets/board_preview_views_icon.svg").default}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default Aboard;
