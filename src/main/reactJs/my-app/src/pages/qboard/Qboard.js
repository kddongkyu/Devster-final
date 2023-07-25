import React, {useEffect, useState} from 'react';
import "./style/Board.css";
import { NavLink } from 'react-router-dom';
import QboardPreview from "./QboardPreview";
import axiosIns from "../../api/JwtConfig";

const Qboard = () => {

  const [qboardList, setQboardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleRefresh = () => {
    window.location.reload();
  };

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

  const fetchQboards = () => {
    axiosIns.get(`/api/qboard/D0/list?currentPage=${currentPage}`)
        .then(response => {
          setQboardList(response.data.qboardDetailDtoList);
          setTotalPages(response.data.totalPages);
        })
        .catch(error => {
          console.error('Error fetching qboards:', error);
        });
  };

  useEffect(() => {
    fetchQboards();
  }, [currentPage]);



  useEffect(() => {
    // JPA로부터 데이터 가져오는 API 호출
    axiosIns.get(`/api/qboard/D0/list`)
        .then(response => {
          setQboardList(response.data.qboardDetailDtoList);
        })
        .catch(error => {
          console.error('Error fetching qboards:', error);
        });
  }, []);


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
      <input type="text" className="board-function-search-input1" />
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
      onClick={handleRefresh}
    />
      <div className="qboard-pages">
        <div className="qboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
        <img
            className="qboard-pages-back-icon"
            alt=""
            src={require("./assets/board_pages_back.svg").default}
            onClick={goToPreviousPage}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        />
        <img
            className="qboard-pages-forward-icon"
            alt=""
            src={require("./assets/board_pages_forward.svg").default}
            onClick={goToNextPage}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
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
      <div className="qboard-list">
        {qboardList.map((data, idx) =>
            <QboardPreview key={idx} data={data} />
        )}
      </div>
      <div className="qboard-pages2">
        <div className="qboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
        <img
            className="qboard-pages-back-icon"
            alt=""
            src={require("./assets/board_pages_back.svg").default}
            onClick={goToPreviousPage}
            style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
        />
        <img
            className="qboard-pages-forward-icon"
            alt=""
            src={require("./assets/board_pages_forward.svg").default}
            onClick={goToNextPage}
            style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
        />
      </div>
  </div>
  );
};

export default Qboard;