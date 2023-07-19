import React, {useEffect, useState} from 'react';
import './style/Reviewlist.css';
import axiosIns from "../../api/JwtConfig";
import {Link} from "react-router-dom";
import StarRating from "./StarRating";
function Reviewlist(props) {

    const [inputKeyword, setInputKeyword] = useState(''); // 사용자가 입력하는 검색어
    const [finalKeyword, setFinalKeyword] = useState(''); // 최종 검색어 (검색 버튼
    const [reviews, setReviews] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages]=useState(1);

    const handleClick = () => {
        window.location.href = '/review/form';
    };

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
        2: '합격',
        3: '코딩',
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
                <div className="review-name-text">
                    <b className="goat">Review</b>
                    <div className="div">코딩테스트 / 면접 / 합격 후기 게시판</div>
                </div>
            </div>
            <button className="review-headerbar-btn"  onClick={handleClick}>
                {/*<div className="review-headerbar-rec" />*/}
                <div className="div1">{`후기작성 `}</div>
                <img
                    className="review-headerbar-btn-icon"
                    alt=""
                    src={require('./assets/review_headerbar_btn_icon.svg').default}
                />
            </button>
            <div className="review-headerbar-function">
                <div className="review-headerbar-function-sort">
                    <div className="review-headerbar-function-sort1" />
                    <img
                        className="review-headerbar-function-sort-child"
                        alt=""
                        src={require('./assets/Vector 176.svg').default}
                    />
                    <div className="div2"
                          // onClick={handleSortByDate}
                        >전체</div>
                    <button
                        // onClick={handleSortByRating}
                    >
                    <img
                        className="review-headerbar-function-sort-icon"
                        alt=""
                        src={require('./assets/review_headerbar_function_sort_icon.svg').default}

                    />
                    </button>
                </div>
            </div>
            <div className="review-function-search-input">
                <input className="review-function-search-input1" 
                value={inputKeyword}
                placeholder='검색어를 입력해주세요'
                onChange={(e) => setInputKeyword(e.target.value)}
               />
                <img
                    className="review-function-search-icon"
                    alt=""
                    src={require('./assets/review-search-icon.svg').default}
                    onClick={handleSearchButtonClick}
                />
            </div>
            <img
                className="review-pages-reload-icon"
                alt=""
                src={require('./assets/review_pages_reload_icon.svg').default}
                onClick={handleRefresh}
            />
            <div className="review-pages-paging">
                <div className="div3">{`${currentPage} / ${totalPages} 페이지`}</div>
                {/*1 / 12345 페이지*/}
                <img
                    className="review-pages-paging-backwardic-icon"
                    alt=""
                    src={require('./assets/review_pages_paging_backwardicon.svg').default}
                    onClick={() => goToPreviousPage(finalKeyword)}
                />
                <img
                    className="review-pages-paging-forwardico-icon"
                    alt=""
                    src={require('./assets/review_pages_paging_forwardicon.svg').default}
                    onClick={() => goToNextPage(finalKeyword)}
                />
            </div>

            <div className="review-list-box">
                <div className="review-list-box-rec">

                    {reviews.map((review)=>(
                        <Link to={`/review/detail/${review.review.rb_idx}/${currentPage}`} key={review.review.rb_idx}>

                            <div className="list-ee" >
                <img
                    className="review-list-box-img-icon"
                    alt=""
                    src={review.ciPhoto}
                />
                            <div className="review-list-subject-text">
                                {review.review.rb_subject}
                            </div>
                <div className="review-list-box-title">
                    <div className="review-list-box-title-user">
                        <img className="logo-icon" alt=""
                             src={review.mPhoto} />
                        <div className="user-01234">{review.mNicname} ·
                            {timeForToday(review.review.rb_writeday)}
                        </div>
                    </div>
                    <div className="div5">
                        <p className="p4">{`리뷰 종류 : `}{reviewTypes[review.review.rb_type]}</p>
                    </div>
                    <div className="review-list-companyname">{review.ciName}</div>
                </div>
                <div className="review-list-box-star">
                    <div className="div6">{review.review.rb_star}</div>
                    <div className="review-list-box-star-icons">
                        <StarRating rating={review.review.rb_star} />
                    </div>

                    {/*<img*/}
                    {/*   */}
                    {/*    alt=""*/}
                    {/*    */}
                    {/*    src={require('./assets/review-stars_icons.svg').default}*/}
                    {/*/>*/}
                </div>
                <div className="review-list-box-header">
                    <div className="review-list-box-header-likes">
                        <div className="review-list-box-header-likes-t">{review.review.rb_like}</div>
                        <img
                            className="review-list-box-header-likes-i-icon"
                            alt=""
                            src={require('./assets/review_list_box_header_likes_icon.svg').default}
                        />
                    </div>
                    <div className="review-list-box-header-comment">
                        <div className="review-list-box-header-views-t">99</div>
                        <img
                            className="review-list-box-header-comment-icon"
                            alt=""
                            src={require('./assets/review_list_box_header_comments_icon.svg').default}
                        />
                    </div>
                    <div className="review-list-box-header-views">
                        <div className="review-list-box-header-views-t">{review.review.rb_readcount}</div>
                        <img
                            src={require('./assets/review_list_box_header_views_icon.svg').default}
                            className="review-list-box-header-views-i-icon"
                            alt=""
                        />
                    </div>
                </div>
                    <hr className="review-rectangle"/>
                        </div>
                        </Link>
                    ))}

            </div>
            </div>

            <div className="review-child" />
            <div className="review-item" />
        </div>
    );
}

export default Reviewlist;