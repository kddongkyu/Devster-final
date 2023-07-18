import { NavLink } from "react-router-dom";
import "./style/Aboard.css";
const Aboard = () => {

  const handleRefresh = () => {
    window.location.reload();
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
        <NavLink to="/fboard" activeClassName="active" className="aboard-selection-freeboard">
          <div className="aboard-selection-freeboard-box" />
          <div className="aboard-selection-freeboard-tex">자유</div>
        </NavLink>
        <NavLink to="/qboard" activeClassName="active" className="aboard-selection-qna">
          <div className="aboard-selection-qna-box" />
          <div className="aboard-selection-qna-text">{`Q&A`}</div>
        </NavLink>
        <NavLink to="/hboard" activeClassName="active" className="aboard-selection-hire">
          <div className="aboard-selection-hire-box" />
          <div className="aboard-selection-hire-text">채용정보</div>
        </NavLink>
       
        <div className="aboard-selection-academy">
          <div className="aboard-selection-academy-box" />
          <div className="aboard-selection-academy-text">학원별</div>
        </div>
      </div>
      <NavLink to="/aboard/form" activeClassName="active" className="aboard-write">
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
        <div className="aboard-function-sort-reset">전체</div>
        <img
          className="aboard-function-sort-bar-icon"
          alt=""
          src={require("./assets/board_function_sort_bar.svg").default}
        />
        <img
          className="aboard-function-sort-by-icon"
          alt=""
          src={require("./assets/board_function_sort_by.svg").default}
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
        <div className="aboard-pages-current">12345 / 12345 페이지</div>
        <img
          className="aboard-pages-back-icon"
          alt=""
          src={require("./assets/board_pages_back.svg").default}
        />
        <img
          className="aboard-pages-forward-icon"
          alt=""
          src={require("./assets/board_pages_forward.svg").default}
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
              src={require("./assets/board_notice_preview_info_logo.svg").default}
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
                src={require("./assets/board_preview_comments_icon.svg").default}
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
      <div className="aboard-preview">
        <div className="aboard-preview-box" />
        <div className="aboard-preview-img-profile" />
        <div className="aboard-preview-type">
          <b className="aboard-preview-type-text">게시판명길이최대로</b>
          <div className="aboard-preview-type-date">작성시간</div>
        </div>
        <div className="aboard-preview-id">
          <div className="aboard-preview-type-text">아이디명최대로</div>
        </div>
        <b className="aboard-preview-subject">제목 일이삼사오육칠팔구...</b>
        <div className="aboard-preview-contents">
          본문 일이삼사오육칠팔구십일이...
        </div>
        <div className="aboard-preview-img-preview" />
        <div className="aboard-preview-likes">
          <div className="aboard-preview-likes-text">99.9k</div>
          <img
            className="aboard-preview-likes-icon"
            alt=""
            src={require("./assets/board_preview_likes_icon.svg").default}
          />
        </div>
        <div className="aboard-preview-comments">
          <div className="aboard-preview-likes-text">99.9k</div>
          <img
            className="aboard-preview-comments-icon"
            alt=""
            src={require("./assets/board_preview_comments_icon.svg").default}
          />
        </div>
        <div className="aboard-preview-views">
          <div className="aboard-preview-views-text">99.9k</div>
          <img
            className="aboard-preview-views-icon"
            alt=""
            src={require("./assets/board_preview_views_icon.svg").default}

          />
        </div>
      </div>
    </div>
  );
};

export default Aboard;
