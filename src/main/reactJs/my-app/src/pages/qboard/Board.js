import React, { useState } from 'react';
import "./style/Board.css";
import { NavLink } from 'react-router-dom';

const Board = () => {

  const [isShown, setIsShown] = useState(false);

  const toggleSlide = () => {
    setIsShown(!isShown);
  };

  return (
    <div className="board">
    <div className="advertise-box">
      <div className="advertise-main" />
      <b className="advertise-text">광고</b>
    </div>
    <div className="board-name">
      <div className="board-name-box" />
      <div className="board-name-text">
        <b className="board-name-text-type">{`Q&A`}</b>
        <div className="board-name-text-detail">질문 및 답변 게시판</div>
      </div>
    </div>
    <div className="board-selection">
      <NavLink to="/fboard" activeClassName="active" className="board-selection-freeboard">
        <div className="board-selection-freeboard-box" />
        <div className="board-selection-freeboard-text">자유</div>
      </NavLink>
      <div className="board-selection-qna">
        <div className="board-selection-qna-box" />
        <div className="board-selection-qna-text">{`Q&A`}</div>
      </div>
      <NavLink to="/hboard" activeClassName="active" className="board-selection-hire">
        <div className="board-selection-hire-box" />
        <div className="board-selection-hire-text">채용정보</div>
      </NavLink>
      <NavLink to="/aboard" activeClassName="active" className="board-selection-academy">
        <div className="board-selection-academy-box" />
        <div className="board-selection-academy-text">학원별</div>
      </NavLink>
    </div>
    <NavLink to="/qboard/form" activeClassName="active" className="board-write">
      <div className="board-write-box" />
      <img className="board-write-icon" alt="" src={require("./assets/board_write_icon.svg").default} />
      <div className="board-write-text">질문하기</div>
    </NavLink>
    <div className="board-function-sort">
      <div className="board-function-sort-box" />
      <div className="board-function-sort-reset">전체</div>
      <img
        className="board-function-sort-bar-icon"
        alt=""
        src={require("./assets/board_function_sort_bar.svg").default}
      />
      <img
        className="board-function-sort-by-icon"
        alt=""
        src={require("./assets/board_function_sort_by.svg").default}
      />
    </div>
    <div className="board-function-search-input">
      <div className="board-function-search-input1" />
      <img
        className="board-function-search-icon"
        alt=""
        src={require("./assets/board_function_search_icon2.svg").default}
      />
    </div>
    {/* <img className="board-hr-icon" alt="" src="/board-hr.svg" /> */}
    <img
      className="board-pages-reset-icon"
      alt=""
      src={require("./assets/board_pages_reset.svg").default}
    />
    <div className="board-pages">
      <div className="board-pages-current">12345 / 12345 페이지</div>
      <img
        className="board-pages-back-icon"
        alt=""
        src={require("./assets/board_pages_back.svg").default}
      />
      <img
        className="board-pages-forward-icon"
        alt=""
        src={require("./assets/board_pages_forward.svg").default}
      />
    </div>
    {/* <img className="board-hr-icon1" alt="" src="/board-hr1.svg" /> */}
    <div className="board-notice">
      <div className="board-notice-box" />
      <div className="board-notice-preview">
        <div className="board-notice-preview-info">
          <img
            className="board-notice-preview-info-logo-icon"
            alt=""
            src={require("./assets/board_notice_preview_info_logo.svg").default}
          />
          <div className="board-notice-preview-info-text">
            admin_01 · 약 4시간 전
          </div>
        </div>
        <b className="board-notice-preview-subject">DEVSTER 공지사항</b>
        <div className="board-notice-preview-notice">
          <div className="board-notice-preview-notice-bo" />
          <div className="board-notice-preview-notice-te">공지사항</div>
        </div>
        <div className="board-notice-preview-hash">#공지사항 # Devster</div>
        <div className="board-notice-preview-icons">
          <div className="board-notice-preview-views">
            <div className="board-notice-preview-views-tex">800</div>
            <img
              className="board-notice-preview-views-ico-icon"
              alt=""
              src={require("./assets/board_preview_views_icon.svg").default}
            />
          </div>
          <div className="board-notice-preview-icons-com">
            <div className="board-notice-preview-views-tex">99</div>
            <img
              className="board-notice-preview-icons-com2"
              alt=""
              src={require("./assets/board_preview_comments_icon.svg").default}
            />
          </div>
          <div className="board-notice-preview-icons-lik">
            <div className="board-notice-preview-icons-lik1">9</div>
            <img
              className="board-notice-preview-icons-lik2"
              alt=""
              src={require("./assets/board_preview_likes_icon.svg").default}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="board-preview">
      <div className="board-preview-box" />
      <div className="board-preview-img-profile" />
      <div className="board-preview-type">
        <b className="board-preview-type-text">게시판명길이최대로</b>
        <div className="board-preview-type-date">작성시간</div>
      </div>
      <div className="board-preview-id">
        <div className="board-preview-type-text">아이디명최대로</div>
      </div>
      <b className="board-preview-subject">제목 일이삼사오육칠팔구...</b>
      <div className="board-preview-contents">
        본문 일이삼사오육칠팔구십일이...
      </div>
      <div className="board-preview-img-preview" />
      <div className="board-preview-likes">
        <div className="board-preview-likes-text">99.9k</div>
        <img
          className="board-preview-likes-icon"
          alt=""
          src={require("./assets/board_preview_likes_icon.svg").default}

        />
      </div>
      <div className="board-preview-comments">
        <div className="board-preview-likes-text">99.9k</div>
        <img
          className="board-preview-comments-icon"
          alt=""
          src={require("./assets/board_preview_comments_icon.svg").default}

        />
      </div>
      <div className="board-preview-views">
        <div className="board-preview-views-text">99.9k</div>
        <img
          className="board-preview-views-icon"
          alt=""
          src={require("./assets/board_preview_views_icon.svg").default}
        />
      </div>
    </div>
  </div>
  );
};

export default Board;