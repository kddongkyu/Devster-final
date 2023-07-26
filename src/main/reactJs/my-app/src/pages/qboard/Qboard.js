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
    <div className="qboard">
    <div className="qboard-advertise-box">
      <div className="qboard-advertise-main" />
      <b className="qboard-advertise-text">광고</b>
    </div>
    <div className="qboard-name">
      <div className="qboard-name-box" />
      <div className="qboard-name-text">
        <b className="qboard-name-text-type">{`Q&A`}</b>
        <div className="qboard-name-text-detail">질문 및 답변 게시판</div>
      </div>
    </div>
    <div className="qboard-selection">
      <NavLink to="/fboard" activeClassName="active" className="qboard-selection-freeboard">
        <div className="qboard-selection-freeboard-box" />
        <div className="qboard-selection-freeboard-text">자유</div>
      </NavLink>
      <div className="qboard-selection-qna">
        <div className="qboard-selection-qna-box" />
        <div className="qboard-selection-qna-text">{`Q&A`}</div>
      </div>
      <NavLink to="/hboard" activeClassName="active" className="qboard-selection-hire">
        <div className="qboard-selection-hire-box" />
        <div className="qboard-selection-hire-text">채용정보</div>
      </NavLink>
      <NavLink to="/aboard" activeClassName="active" className="qboard-selection-academy">
        <div className="qboard-selection-academy-box" />
        <div className="qboard-selection-academy-text">학원별</div>
      </NavLink>
    </div>
    <NavLink to="/qboard/form" activeClassName="active" className="qboard-write">
      <div className="qboard-write-box" />
      <img className="qboard-write-icon" alt="" src={require("./assets/board_write_icon.svg").default} />
      <div className="qboard-write-text">질문하기</div>
    </NavLink>
    <div className="qboard-function-sort">
      <div className="qboard-function-sort-box" />
      <div className="qboard-function-sort-reset">전체</div>
      <img
        className="qboard-function-sort-bar-icon"
        alt=""
        src={require("./assets/board_function_sort_bar.svg").default}
      />
      <img
        className="qboard-function-sort-by-icon"
        alt=""
        src={require("./assets/board_function_sort_by.svg").default}
      />
    </div>
    <div className="qboard-function-search-input">
      <input type="text" className="qboard-function-search-input1" />
      <img
        className="qboard-function-search-icon"
        alt=""
        src={require("./assets/board_function_search_icon2.svg").default}
      />
    </div>
    {/* <img className="qboard-hr-icon" alt="" src="/qboard-hr.svg" /> */}
    <img
      className="qboard-pages-reset-icon"
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
    <div className="qboard-notice">
      <div className="qboard-notice-box" />
      <div className="qboard-notice-preview">
        <div className="qboard-notice-preview-info">
          <img
            className="qboard-notice-preview-info-logo-icon"
            alt=""
            src={require("./assets/board_notice_preview_info_logo.svg").default}
          />
          <div className="qboard-notice-preview-info-text">
            admin_01 · 약 4시간 전
          </div>
        </div>
        <b className="qboard-notice-preview-subject">DEVSTER 공지사항</b>
        <div className="qboard-notice-preview-notice">
          <div className="qboard-notice-preview-notice-bo" />
          <div className="qboard-notice-preview-notice-te">공지사항</div>
        </div>
        <div className="qboard-notice-preview-hash">#공지사항 # Devster</div>
        <div className="qboard-notice-preview-icons">
          <div className="qboard-notice-preview-views">
            <div className="qboard-notice-preview-views-tex">800</div>
            <img
              className="qboard-notice-preview-views-ico-icon"
              alt=""
              src={require("./assets/board_preview_views_icon.svg").default}
            />
          </div>
          <div className="qboard-notice-preview-icons-com">
            <div className="qboard-notice-preview-views-tex">99</div>
            <img
              className="qboard-notice-preview-icons-com2"
              alt=""
              src={require("./assets/board_preview_comments_icon.svg").default}
            />
          </div>
          <div className="qboard-notice-preview-icons-lik">
            <div className="qboard-notice-preview-icons-lik1">9</div>
            <img
              className="qboard-notice-preview-icons-lik2"
              alt=""
              src={require("./assets/board_preview_likes_icon.svg").default}
            />
          </div>
        </div>
      </div>
    </div>
      <div className="qboard-list">
        {qboardList.map((data, idx) =>
            <QboardPreview key={idx} data={data} currentPage={currentPage}/>
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