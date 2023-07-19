import { NavLink, useParams } from "react-router-dom";
import "./style/Hboard.css";
import Axios from "axios";
import { useEffect, useState } from "react";

const Hboard = () => {
  const handleRefresh = () => {
    window.location.reload();
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
          <div className="board-selection-freeboard-box" />
          <div className="board-selection-freeboard-text">자유</div>
        </NavLink>
        <NavLink
          to="/qboard"
          activeClassName="active"
          className="hboard-selection-qna"
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
      <NavLink
        to="/hboard/form"
        activeClassName="active"
        className="hboard-write"
      >
        <div className="hboard-write-box" />
        <img
          className="hboard-write-icon"
          alt=""
          src={require("./assets/board_write_icon.svg").default}
        />
        <div className="hboard-write-text">글쓰기</div>
      </NavLink>
      <div className="hboard-function-sort">
        <div className="hboard-function-sort-box" />
        <div className="hboard-function-sort-reset">전체</div>
        <img
          className="hboard-function-sort-bar-icon"
          alt=""
          src={require("./assets/board_function_sort_bar.svg").default}
        />
        <img
          className="hboard-function-sort-by-icon"
          alt=""
          src={require("./assets/board_function_sort_by.svg").default}
        />
      </div>
      <div className="hboard-function-search-input">
        <input type="text" className="hboard-function-search-input1" />
        <img
          className="hboard-function-search-icon"
          alt=""
          src={require("./assets/board_function_search_icon2.svg").default}
        />
      </div>
      <img
        className="hboard-pages-reset-icon"
        alt=""
        src={require("./assets/board_pages_reset.svg").default}
        onClick={handleRefresh}
      />
      <div className="hboard-pages">
        <div className="hboard-pages-current">12345 / 12345 페이지</div>
        <img
          className="hboard-pages-back-icon"
          alt=""
          src={require("./assets/board_pages_back.svg").default}
        />
        <img
          className="hboard-pages-forward-icon"
          alt=""
          src={require("./assets/board_pages_forward.svg").default}
        />
      </div>
      {/* <img className="board-hr-icon" alt="" src="/board-hr.svg" /> */}
      <div className="hboard-notice">
        <div className="hboard-notice-box" />
        <div className="hboard-notice-preview">
          <div className="hboard-notice-preview-info">
            <img
              className="hboard-notice-preview-info-logo-icon"
              alt=""
              src={
                require("./assets/board_notice_preview_info_logo.svg").default
              }
            />
            <div className="hboard-notice-preview-info-tex">
              admin_01 · 약 4시간 전
            </div>
          </div>
          <b className="hboard-notice-preview-subject">DEVSTER 공지사항</b>
          <div className="hboard-notice-preview-notice">
            <div className="hboard-notice-preview-notice-b" />
            <div className="hboard-notice-preview-notice-t">공지사항</div>
          </div>
          <div className="hboard-notice-preview-hash">#공지사항 # Devster</div>
          <div className="hboard-notice-preview-icons">
            <div className="hboard-notice-preview-views">
              <div className="hboard-notice-preview-views-te">800</div>
              <img
                className="hboard-notice-preview-views-ic-icon"
                alt=""
                src={require("./assets/board_preview_views_icon.svg").default}
              />
            </div>
            <div className="hboard-notice-preview-icons-co">
              <div className="hboard-notice-preview-views-te">99</div>
              <img
                className="hboard-notice-preview-icons-co2"
                alt=""
                src={
                  require("./assets/board_preview_comments_icon.svg").default
                }
              />
            </div>
            <div className="hboard-notice-preview-icons-li">
              <div className="hboard-notice-preview-icons-li1">9</div>
              <img
                className="hboard-notice-preview-icons-li2"
                alt=""
                src={require("./assets/board_preview_likes_icon.svg").default}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hboard-preview">
        <div className="hboard-preview-box" />
        <div className="hboard-preview-img-profile" />
        <div className="hboard-preview-type">
          <b className="hboard-preview-type-text">게시판명길이최대로</b>
          <div className="hboard-preview-type-date">작성시간</div>
        </div>
        <div className="hboard-preview-id">
          <div className="hboard-preview-type-text">아이디명최대로</div>
        </div>
        <b className="hboard-preview-subject">제목 일이삼사오육칠팔구...</b>
        <div className="hboard-preview-contents">
          본문 일이삼사오육칠팔구십일이...
        </div>
        <div className="hboard-preview-img-preview" />
        <div className="hboard-preview-likes">
          <div className="hboard-preview-likes-text">99.9k</div>
          <img
            className="hboard-preview-likes-icon"
            alt=""
            src={require("./assets/board_preview_likes_icon.svg").default}
          />
        </div>
        <div className="hboard-preview-comments">
          <div className="hboard-preview-likes-text">99.9k</div>
          <img
            className="hboard-preview-comments-icon"
            alt=""
            src={require("./assets/board_preview_comments_icon.svg").default}
          />
        </div>
        <div className="hboard-preview-views">
          <div className="hboard-preview-views-text">99.9k</div>
          <img
            className="hboard-preview-views-icon"
            alt=""
            src={require("./assets/board_preview_views_icon.svg").default}
          />
        </div>
      </div>
    </div>
  );
};

export default Hboard;
