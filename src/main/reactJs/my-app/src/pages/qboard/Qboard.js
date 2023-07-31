import React, {useEffect, useState} from 'react';
import "./style/Board.css";
import {NavLink, useNavigate} from 'react-router-dom';
import QboardPreview from "./QboardPreview";
import axiosIns from "../../api/JwtConfig";
import {JwtPageChk} from "../../api/JwtPageChk";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {jwtHandleError} from "../../api/JwtHandleError";

const Qboard = () => {
  const {enqueueSnackbar} = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
  const navi = useNavigate();

  const [qboardList, setQboardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [noticePost,setNoticePost] = useState({});

  //정렬
  const [sortProperty, setSortProperty] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  //검색
  const [inputKeyword, setInputKeyword] = useState(''); // 사용자가 입력하는 검색어
  const [finalKeyword, setFinalKeyword] = useState(''); // 최종 검색어 (검색 버튼)

  const handleRefresh = () => {
    window.location.reload();
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

  const fetchQboards = async (page, keyword, sortProperty, sortDirection) => {
    const searchKeyword = keyword && keyword.trim() !== '' ? keyword.trim() : null;

    try {
      const response = await axiosIns.get(`/api/qboard/D0/list`, {
        params: {
          currentPage: page - 1, // Use the page parameter
          keyword: searchKeyword,
          sortProperty,
          sortDirection
        }
      });

      setQboardList(response.data.qboardDetailDtoList);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      //axios용 에러함수
      jwtHandleError(error, toastAlert);
    }
  };

  const getNoticeData = () => {
    axiosIns.get(`/api/nboard/D0/notice`)
        .then(response => {
          setNoticePost(response.data.nboard);
        })
        .catch(error => {
          jwtHandleError(error, toastAlert);
        })
  }

  useEffect(() => {
    const page = Math.max(1, currentPage);
    getNoticeData();
    fetchQboards(page, finalKeyword, sortProperty, sortDirection);
  }, [currentPage, finalKeyword, sortProperty, sortDirection]);

  useEffect(() => {
    // JPA로부터 데이터 가져오는 API 호출
    axiosIns.get('/api/qboard/D0/list')
        .then(response => {
          setQboardList(response.data.qboardDetailDtoList);
        })
        .catch(error => {
          //axios용 에러함수
          jwtHandleError(error, toastAlert);
        });
  }, []);

  // 정렬
  const onClickLatest = () => {
    setSortProperty('QBwriteDay');
    setSortDirection('DESC');
  };

  const onClickViews = () => {
    setSortProperty('QBreadCount');
    setSortDirection('DESC');
  };

  const timeForToday = (value) => {
    if (!value) {
      return '';
    }

    const valueConv = value.slice(0, -10);
    const today = new Date();
    const timeValue = new Date(valueConv);

    // timeValue를 한국 시간대로 변환
    const timeValueUTC = new Date(timeValue.toISOString());
    const offset = timeValue.getTimezoneOffset() * 60 * 1000; // 분 단위를 밀리초 단위로 변환
    const timeValueKST = new Date(timeValueUTC.getTime() - offset);


    const betweenTime = Math.floor((today.getTime() - timeValueKST.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금 전';
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
    const month = String(timeValue.getMonth() + 1).padStart(2, '0');
    const day = String(timeValue.getDate()).padStart(2, '0');

    const formattedDateWithoutTime = `${year}-${month}-${day}`;

    return formattedDateWithoutTime;
  };


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
      <NavLink to="/qboard" activeClassName="active" className="qboard-selection-freeboard">
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
      <div
          className='qboard-write'
          onClick={() => {
            //페이지 이동시 토큰여부 확인 함수
            JwtPageChk(navi, '/qboard/form');
          }}
      >
        <div className="qboard-write-box"/>
        <img
            className="qboard-write-icon"
            alt=""
            src={require("./assets/board_write_icon.svg").default}
        />
        <div className="qboard-write-text">질문하기</div>
      </div>

      <div className="qboard-function-sort">
        <div className="qboard-function-sort-box" />
        <img
            className="qboard-function-sort-bar-icon"
            alt=""
            src={require("./assets/qboard_function_sort_bar.svg").default}
        />
        <div className="qboard-function-sort-time" onClick={onClickLatest}>최신순</div>
        <div className="qboard-function-sort-view"  onClick={onClickViews}>조회순</div>
      </div>
      <div className="qboard-function-search-input">
        <input className="qboard-function-search-input1"
               type="text"
               value={inputKeyword}
               placeholder='검색어를 입력해주세요'
               onChange={(e) => setInputKeyword(e.target.value)}
               onKeyDown={handleEnterKeyPress}
        />
        <img
            className="qboard-function-search-icon"
            alt=""
            src={require("./assets/board_function_search_icon2.svg").default}
            onClick={handleSearchButtonClick}
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
      <div className="qboard-notice-preview"
           onClick={() => {
             window.location.href = `/notice/detail/${noticePost.nb_idx}/1`;
           }}
      >
        <div className="qboard-notice-preview-info">
          <img
            className="qboard-notice-preview-info-logo-icon"
            alt=""
            src={require("./assets/board_notice_preview_info_logo.svg").default}
          />
          <div className="qboard-notice-preview-info-text">
            관리자 · {timeForToday(noticePost.nb_writeday)}
          </div>
        </div>
        <b className="qboard-notice-preview-subject">{noticePost.nb_subject}</b>
        <div className="qboard-notice-preview-notice">
          <div className="qboard-notice-preview-notice-bo" />
          <div className="qboard-notice-preview-notice-te">공지사항</div>
        </div>
        <div className="qboard-notice-preview-hash"># 공지사항 # 필독 # Devster</div>
        <div className="qboard-notice-preview-icons">
          <div className="qboard-notice-preview-views">
            <div className="qboard-notice-preview-views-tex">1</div>
            <img
              className="qboard-notice-preview-views-ico-icon"
              alt=""
              src={require("./assets/board_preview_views_icon.svg").default}
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