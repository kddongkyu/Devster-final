import React, {useEffect, useState} from 'react';
import './style/Reviewlist.css';
import axiosIns from "../../api/JwtConfig";
import {Link, NavLink} from "react-router-dom";
import StarRating from "./StarRating";
function Reviewlist(props) {

    const [inputKeyword, setInputKeyword] = useState(''); // 사용자가 입력하는 검색어
    const [finalKeyword, setFinalKeyword] = useState(''); // 최종 검색어 (검색 버튼
    const [reviews, setReviews] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages]=useState(1);



    const handleRefresh = () => {
        window.location.reload();
    };

    //검색 기능
    const handleSearchButtonClick = () => {
    // 검색 버튼을 눌렀을 때 '최종 검색어'를 업데이트합니다.
    const searchKeyword = inputKeyword.trim();
    setFinalKeyword(searchKeyword);
    // 첫 페이지의 검색 결과를 가져옵니다.
    setCurrentPage(1);
     };
      

    useEffect(() => {
        fetchReviews(currentPage,finalKeyword);
      }, [currentPage, finalKeyword]);
      

      const fetchReviews = async (currentPage, keyword) => {
        const searchKeyword = finalKeyword && finalKeyword.trim() !== '' ? finalKeyword.trim() : null;
      
        try {
          const response = await axiosIns.get('/api/review/D0', { params: { currentPage: currentPage, keyword: searchKeyword } });
         console.log(finalKeyword);
          setReviews(response.data.reviews);
          setTotalPages(response.data.totalPages);
          console.log(response.data.reviews)
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };
      

      const goToPreviousPage = () => {
        if (currentPage > 1) {
            fetchReviews(currentPage - 1, finalKeyword);
            setCurrentPage(currentPage - 1);
        }
    };
    
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            fetchReviews(currentPage + 1, finalKeyword);
            setCurrentPage(currentPage + 1);
        }
    };
    

    const reviewTypes = {
        1: '면접',
        2: '코딩',
        3: '합격',
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
        //console.log(betweenTime);

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
        <div className="review">
        <div className="review-advertise">
          <div className="review-advertise-main" />
          <b className="review-advertise-text">광고</b>
        </div>
        <div className="review-name">
          <div className="review-name-rec" />
          <b className="review-goat">Review</b>
          <div className="review-sub-goat">
            코딩테스트 / 면접 / 합격 후기 게시판
          </div>
        </div>
        <NavLink to={`/review/form`} >
        <button className="review-headerbar-btn">
          <div className="review-headerbar-btn-text">{`후기작성 `}</div>
          <img
            className="review-headerbar-btn-icon"
            alt=""
            src={require('./assets/review_headerbar_btn_icon.svg').default}
          />
        </button>
        </NavLink>
        <div className="review-function-search-input">
          <div className="review-function-search-input1" />
          <img className="vector-icon" alt="" src="/vector.svg" />
        </div>
        <div className="rboard-function-sort">
          <div className="rboard-function-sort-box" />
          <div className="rboard-function-sort-time">최신순</div>
          <div className="rboard-function-sort-view">조회순</div>
          <div className="rboard-function-sort-like">인기순</div>
          <img
            className="rboard-function-sort-bar2-icon"
            alt=""
            src="/rboard-function-sort-bar2.svg"
          />
          <img
            className="rboard-function-sort-bar-icon"
            alt=""
            src="/rboard-function-sort-bar.svg"
          />
        </div>
        <img
          className="review-pages-reload-icon"
          alt=""
          src="/review-pages-reload-icon.svg"
        />
        <div className="review-top-page-text">1 / 12345 페이지</div>
        <img
          className="review-top-pages-next-icon"
          alt=""
          src="/reviewtoppagesnext.svg"
        />
        <img
          className="rboard-top-pages-back-icon"
          alt=""
          src="/rboardtop-pages-back.svg"
        />
        <div className="review-child" />
        <div className="review-list">
          <div className="review-list-box-rec" />
          <img
            className="review-list-box-img-icon"
            alt=""
            src="/review-list-box-img@2x.png"
          />
          <div className="review-list-subject-text">
            <p className="p">{`▶ 지원 시기 : `}</p>
            <p className="p1">{` `}</p>
          </div>
          <img className="logo-icon" alt="" src="/logo.svg" />
          <div className="review-list-user-time">User_01234 · 약 4시간 전</div>
          <div className="review-list-rb-type">
            <p className="p1">{`리뷰 종류 : 면접 `}</p>
          </div>
          <b className="review-list-companyname">삼성전자</b>
          <div className="review-list-box-star-text">3.0</div>
          <img
            className="review-list-box-star-icons"
            alt=""
            src="/review-list-box-star-icons.svg"
          />
          <div className="review-list-box-header-likes-t">9</div>
          <img
            className="review-list-box-header-likes-i-icon"
            alt=""
            src="/review-list-box-header-likes-icon.svg"
          />
          <div className="review-list-box-header-comment">99</div>
          <img
            className="review-list-box-header-comment-icon"
            alt=""
            src="/review-list-box-header-comments-icon.svg"
          />
          <div className="review-list-box-header-views-t">800</div>
          <img
            className="review-list-box-header-views-i-icon"
            alt=""
            src="/review-list-box-header-views-icon.svg"
          />
          <div className="review-bottom-bar" />
        </div>
        <div className="review-bottom-page-text">1 / 12345 페이지</div>
        <img
          className="review-bottom-page-next-icon"
          alt=""
          src="/reviewbottompagenext.svg"
        />
        <img
          className="review-bottom-page-pre-icon"
          alt=""
          src="/reviewbottompagepre.svg"
        />
      </div>
    );
}

export default Reviewlist;