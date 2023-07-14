import "./style/Fboard.css";
import { NavLink } from 'react-router-dom';
import {useState} from "react";
import Axios from "axios";

function Fboard(props) {

  const handleRefresh = () => {
    window.location.reload();
  };

  const [freeBoardList, setFreeBoardList] = useState([]);
  const [freeBoard, setFreeBoard] = useState([]);


  return (
    <div className="fboard">
      <div className="advertise-box">
        <div className="advertise-main" />
        <b className="advertise-text">광고</b>
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
        <NavLink to="/qboard" activeClassName="active" className="fboard-selection-qna">
            <div className="fboard-selection-qna-box" />
            <div className="fboard-selection-qna-text">{`Q&A`}</div>
        </NavLink>
        <NavLink to="/hboard" activeClassName="active" className="fboard-selection-hire">
          <div className="fboard-selection-hire-box" />
          <div className="fboard-selection-hire-text">채용정보</div>
        </NavLink>
        <NavLink to="/aboard" activeClassName="active" className="fboard-selection-academy">
          <div className="fboard-selection-qna-box" />
          <div className="fboard-selection-academy-text">학원별</div>
        </NavLink>
      </div>


      <NavLink to="/fboard/form" activeClassName="active" className="fboard-write">
        <div className="fboard-write-box" />
        <img
          className="fboard-write-icon"
          alt=""
          src={require("./assets/board_write_icon.svg").default}
        />
        <div className="fboard-write-text">글쓰기</div>
      </NavLink>
      <div className="fboard-function-sort">
        <div className="fboard-function-sort-box" />
        <div className="fboard-function-sort-reset">전체</div>
        <img
          className="fboard-function-sort-bar-icon"
          alt=""
          src={require("./assets/board_function_sort_bar.svg").default}
        />
        <img
          className="fboard-function-sort-by-icon"
          alt=""
          src={require("./assets/board_function_sort_by.svg").default}
        />
      </div>


      <div className="fboard-function-search-input">
        <input type="text" className="fboard-function-search-input1" />
        <img
          className="fboard-function-search-icon"
          alt=""
          src={require("./assets/board_function_search_icon2.svg").default}
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
        <div className="fboard-pages-current">12345 / 12345 페이지</div>
        <img
          className="fboard-pages-back-icon"
          alt=""
          src={require("./assets/board_pages_back.svg").default}
        />
        <img
          className="fboard-pages-forward-icon"
          alt=""
          src={require("./assets/board_pages_forward.svg").default}

        />
      </div>
      {/* <img className="board-hr-icon1" alt="" src="/board-hr1.svg" /> */}
      <div className="fboard-notice">
        <div className="fboard-notice-box" />
        <div className="fboard-notice-preview">
          <div className="fboard-notice-preview-info">
            <img
              className="fboard-notice-preview-info-logo-icon"
              alt=""
              src={require("./assets/board_notice_preview_info_logo.svg").default}
            />
            <div className="fboard-notice-preview-info-text">
              admin_01 · 약 4시간 전
            </div>
          </div>
          <b className="fboard-notice-preview-subject">DEVSTER 공지사항</b>
          <div className="fboard-notice-preview-notice">
            <div className="fboard-notice-preview-notice-bo" />
            <div className="fboard-notice-preview-notice-te">공지사항</div>
          </div>
          <div className="fboard-notice-preview-hash">#공지사항 # Devster</div>
          <div className="fboard-notice-preview-icons">
            <div className="fboard-notice-preview-views">
              <div className="fboard-notice-preview-views-tex">800</div>
              <img
                className="fboard-notice-preview-views-ico-icon"
                alt=""
                src={require("./assets/board_preview_views_icon.svg").default}
              />
            </div>
            <div className="fboard-notice-preview-icons-com">
              <div className="fboard-notice-preview-views-tex">99</div>
              <img
                className="fboard-notice-preview-icons-com2"
                alt=""
                src={require("./assets/board_preview_comments_icon.svg").default}
              />
            </div>
            <div className="fboard-notice-preview-icons-lik">
              <div className="fboard-notice-preview-icons-lik1">9</div>
              <img
                className="fboard-notice-preview-icons-lik2"
                alt=""
                src={require("./assets/board_preview_likes_icon.svg").default}
              />
            </div>
          </div>
        </div>
      </div>


      <div className="fboard-preview">
        <div className="fboard-preview-box" />
        <div className="fboard-preview-img-profile" />
        <div className="fboard-preview-type">
          <b className="fboard-preview-type-text">게시판명길이최대로</b>
          <div className="fboard-preview-type-date">작성시간</div>
        </div>
        <div className="fboard-preview-id">
          <div className="fboard-preview-type-text">아이디명최대로</div>
        </div>
        <b className="fboard-preview-subject">제목 일이삼사오육칠팔구...</b>
        <div className="fboard-preview-contents">
          본문 일이삼사오육칠팔구십일이...
        </div>
        <div className="fboard-preview-img-preview" />
        <div className="fboard-preview-likes">
          <div className="fboard-preview-likes-text">99.9k</div>
          <img
            className="fboard-preview-likes-icon"
            alt=""
            src={require("./assets/board_preview_likes_icon.svg").default}
          />
        </div>
        <div className="fboard-preview-comments">
          <div className="fboard-preview-likes-text">99.9k</div>
          <img
            className="fboard-preview-comments-icon"
            alt=""
            src={require("./assets/board_preview_comments_icon.svg").default}
          />
        </div>
        <div className="fboard-preview-views">
          <div className="fboard-preview-views-text">99.9k</div>
          <img
            className="fboard-preview-views-icon"
            alt=""
            src={require("./assets/board_preview_views_icon.svg").default}
          />
        </div>
      </div>


    </div>
  );
};

export default Fboard;
