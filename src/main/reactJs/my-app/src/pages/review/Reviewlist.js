import React, {useEffect, useState} from 'react';
import './style/Reviewlist.css';
import axios from "axios";
import axiosIns from "../../api/JwtConfig";
function Reviewlist(props) {
    const [reviews, setReviews] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages]=useState(1);

    useEffect(()=>{
        fetchReviews(currentPage);
    },[currentPage]);

    const fetchReviews = (page) => {
        axiosIns.get('/review', { params: { page } })
            .then(response => {
                setReviews(response.data.reviews);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
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


    useEffect(() => {
        // JPA로부터 데이터 가져오는 API 호출
        axiosIns.get('/review')
            .then(response => {
                setReviews(response.data.reviews); // 리뷰 데이터 설정
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    }, []);


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
            <button className="review-headerbar-btn">
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
                    <div className="div2">전체</div>
                    <img
                        className="review-headerbar-function-sort-icon"
                        alt=""
                        src={require('./assets/review_headerbar_function_sort_icon.svg').default}
                    />
                </div>
            </div>
            <div className="review-function-search-input">
                <input className="review-function-search-input1" />
                <img
                    className="review-function-search-icon"
                    alt=""
                    src={require('./assets/review-search-icon.svg').default}
                />
            </div>
            <img
                className="review-pages-reload-icon"
                alt=""
                src={require('./assets/review_pages_reload_icon.svg').default}
            />
            <div className="review-pages-paging">
                <div className="div3">{`${currentPage} / ${totalPages} 페이지`}</div>
                {/*1 / 12345 페이지*/}
                <img
                    className="review-pages-paging-backwardic-icon"
                    alt=""
                    src={require('./assets/review_pages_paging_backwardicon.svg').default}
                    onClick={goToPreviousPage}
                />
                <img
                    className="review-pages-paging-forwardico-icon"
                    alt=""
                    src={require('./assets/review_pages_paging_forwardicon.svg').default}
                    onClick={goToNextPage}
                />
            </div>

            <div className="review-list-box">
                <img className="review-list-box-child" alt=""

                     src="/vector-179.svg" />

                <div className="review-list-box-rec">

                    {reviews.map((review)=>(
                        <div className="list-ee">
                <img
                    className="review-list-box-img-icon"
                    alt=""
                    src={require('./assets/review_list_box_img.png').default}
                />

                <div className="review-list-box-title">
                    <div className="review-list-box-title-user">
                        <img className="logo-icon" alt=""
                             src={require('./assets/logo.svg').default} />
                        <div className="user-01234">User_01234 · 약 4시간 전</div>
                    </div>
                    <div className="div5">
                        <p className="p4">{`리뷰 종류 : 면접 `}</p>
                    </div>
                    <b className="b">{review.ci_idx}</b>
                </div>
                <div className="review-list-box-star">
                    <div className="div6">3.0</div>
                    <img
                        className="review-list-box-star-icons"
                        alt=""
                        src={require('./assets/review-stars_icons.svg').default}
                    />
                </div>
                <div className="review-list-box-header">
                    <div className="review-list-box-header-likes">
                        <div className="review-list-box-header-likes-t">9</div>
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
                        <div className="review-list-box-header-views-t">800</div>
                        <img
                            src={require('./assets/review_list_box_header_views_icon.svg').default}
                            className="review-list-box-header-views-i-icon"
                            alt=""
                        />
                    </div>
                </div>
                        </div>

                    ))}

            </div>
            </div>

            <div className="review-child" />
            <div className="review-item" />
        </div>
    );
}

export default Reviewlist;