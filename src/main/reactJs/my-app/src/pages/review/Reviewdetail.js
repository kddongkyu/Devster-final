import React, {useCallback, useEffect, useState} from 'react';
import './style/Reviewdetail.css';
import axiosIns from "../../api/JwtConfig";
import {Link, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";
import StarRating from "./StarRating";
function Reviewdetail() {

    let de = jwt_decode(localStorage.getItem('accessToken'));
    const m_idx = de.idx;
    const [reviewData, setReviewData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { rb_idx, currentPage } = useParams();
    const [isGood, setIsGood] = useState(false);
    const [isBad, setIsBad] = useState(false);

    const fetchReview = useCallback((rb_idx, currentPage = null) => {
        const url=`/review/${rb_idx}`;
        axiosIns.get(url)
            .then(response => {
                console.log(response.data);
                setReviewData(response.data);
                setIsLoading(false);

                // fetchReview가 성공적으로 완료된 후에 좋아요 상태 조회
                if (m_idx && rb_idx) {
                    axiosIns.get(`/review/${m_idx}/checkGood/${rb_idx}`)
                        .then(response => {
                            setIsGood(response.data); // 좋아요 상태를 받아서 상태 변수에 저장
                        })
                        .catch(error => {
                            console.error('Error checking good status:', error);
                        });

                    // fetchReview가 성공적으로 완료된 후에 싫어요 상태 조회
                    axiosIns.get(`/review/${m_idx}/checkBad/${rb_idx}`)
                        .then(response => {
                            setIsBad(response.data); // 싫어요 상태를 받아서 상태 변수에 저장
                        })
                        .catch(error => {
                            console.error('Error checking bad status:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching review:', error);
            });
    }, [m_idx, rb_idx]);


    useEffect(() => {
        fetchReview(rb_idx, currentPage);
    }, [rb_idx, currentPage, fetchReview]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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

    const handlelike = (m_idx, rb_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/review/${m_idx}/checkBad/${rb_idx}`)
            .then(response => {
                if (response.data === 2) {
                    // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                    alert("이미 싫어요가 눌려 있습니다");
                    window.location.reload();
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/review/${m_idx}/checkGood/${rb_idx}`)
                        .then(response => {
                            if (response.data === 1) {
                                // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                                alert("이미 좋아요가 눌려 있습니다");
                                axiosIns.post(`/review/${m_idx}/like/${rb_idx}`)
                                    .then(response => {
                                        window.location.reload();
                                    })
                                    .catch(error => {
                                        alert("좋아요 요청 실패");
                                        console.error('좋아요 요청 실패:', error);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/review/${m_idx}/like/${rb_idx}`)
                                    .then(response => {
                                        alert("좋아요를 눌렀습니다");
                                        console.log('좋아요 요청 성공:', response.data);
                                        window.location.reload();
                                    })
                                    .catch(error => {
                                        alert("좋아요 요청 실패");
                                        console.error('좋아요 요청 실패:', error);
                                    });
                            }
                        })
                        .catch(error => {
                            console.error('좋아요 상태 체크 실패:', error);
                        });
                }
            })
            .catch(error => {
                console.error('싫어요 상태 체크 실패:', error);
            });
    };


    const handleDislike = (m_idx, rb_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/review/${m_idx}/checkGood/${rb_idx}`)
            .then(response => {
                if (response.data === 1) {
                    // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                    alert("이미 좋아요가 눌려 있습니다");
                    window.location.reload();
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/review/${m_idx}/checkBad/${rb_idx}`)
                        .then(response => {
                            if (response.data === 2) {
                                // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                                alert("이미 싫어요가 눌려 있습니다");
                                axiosIns.post(`/review/${m_idx}/dislike/${rb_idx}`)
                                    .then(response => {
                                        window.location.reload();
                                    })
                                    .catch(error => {
                                        alert("싫어요 요청 실패");
                                        console.error('싫어요 요청 실패:', error);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/review/${m_idx}/dislike/${rb_idx}`)
                                    .then(response => {
                                        alert("싫어요를 눌렀습니다");
                                        console.log('싫어요 요청 성공:', response.data);
                                        window.location.reload();
                                    })
                                    .catch(error => {
                                        alert("싫어요 요청 실패");
                                        console.error('싫어요 요청 실패:', error);
                                    });
                            }
                        })
                        .catch(error => {
                            console.error('싫어요 상태 체크 실패:', error);
                        });
                }
            })
            .catch(error => {
                console.error('좋아요 상태 체크 실패:', error);
            });
    };

    const deleteReview = (rb_idx) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            axiosIns.delete(`/review/${rb_idx}`)
                .then(response => {
                    console.log('Review deleted successfully');
                    window.location.href="/review";
                })
                .catch(error => {
                    console.error('Error deleting review:', error);
                });
        }
    };



    let result = reviewData.review.rb_like - reviewData.review.rb_dislike;

    if (reviewData.review.rb_like <= reviewData.review.rb_dislike) {
        result = - result;
    }

    return (
        <div className="review-detail">

            <div className="advertise-box">
                <div className="advertise-main" />
                <b className="advertise-text">광고</b>
            </div>
            <div className="review-detail-comp">
                <div className="review-detail-comp-box" />
                <div className="review-detail-comp-info">
                    <img
                        className="review-detail-comp-info-img-icon"
                        alt=""
                        src={reviewData.ciPhoto}
                    />
                    <b className="ci_name_b">{reviewData.ciName} </b>

                    <div
                        className="review-detail-comp-info-stars-icon">
                        <StarRating rating={reviewData.ciStar} />
                    </div>
                </div>
                <div className="review-detail-comp-info-text">
                    <ul className="ul">
                        <li className="li">사원수 : {reviewData.ciPpl}명</li>
                        <li className="cisale_li">매출액 :{reviewData.ciSale}</li>
                        <li className="cisal_li">평균연봉 : {Number(reviewData.ciSal).toLocaleString('ko-KR')}원
                        </li>
                    </ul>
                </div>
            </div>
            <div className="review-detail-header">
                <div className="review-detail-info">
                    <img
                        className="review-detail-info-profile-img-icon"
                        alt=""
                        src={require('./assets/review_detail_info_profile_img.png').default}
                    />
                    <div className="review-detail-info-nickname">{reviewData.mNicname}</div>
                    <div className="review-detail-info-status">
                        <div className="review-detail-info-status-text"> 
                    
                         {timeForToday(reviewData.review.rb_writeday)
                        }{` ·        `}</div>
                        <img
                            className="review-detail-info-status-view-icon"
                            alt=""
                            src={require('./assets/review_detail_info_status_views.svg').default}
                        />
                        <div className="review-detail-info-status-text1">
                            <span className="rview-readcount">{reviewData.review.rb_readcount}</span>
                            {/*<span className="span">{`수정됨 `}</span>*/}
                        </div>
                    </div>
                </div>
                <img
                    className="review-detail-header-function-icon"
                    alt=""
                    src={require('./assets/review_detail_header_function_url.svg').default}
                />
                <Link to={`/review/update/${reviewData.review.rb_idx}`}>
                <img className="review-edit-icon" alt=""
                     src={require('./assets/review-edit.svg').default}/>
                </Link>
                <img className="review-trash-icon" alt=""
                     src={require('./assets/review-trash.svg').default}
                     onClick={() => deleteReview(rb_idx)} />

            </div>
            <div className="review-detail-body">
                <div className="review-detail-body-text">
                    {reviewData.review.rb_content}
                </div>
                <b className="review-detail-body-subject">{reviewData.review.rb_subject}</b>
            </div>
            <div className="review-detail-counter">
                <div className="review-detail-counter-like">
                    <div className="review-detail-counter-like-box" style={isGood ? { backgroundColor: '#F5EFF9' } : {}} />

                    <img
                        className="review-detail-counter-like-ico-icon"
                        alt=""
                        src={require('./assets/review_detail_counter_like_icon.svg').default}
                        onClick={()=>handlelike(m_idx,rb_idx)}
                    />
                </div>
                <div className="review-detail-counter-num">
                    <div className="review-detail-counter-num-box" />
                    <div className="review-detail-counter-num-text">{result}</div>
                </div>
                <div className="review-detail-counter-dislike"
                     onClick={()=> handleDislike(m_idx,rb_idx)}>
                    <div className="review-detail-counter-dislike-"
                         style={isBad ? { backgroundColor: '#F5EFF9' } : {}}
                    />
                    <img
                        className="review-detail-counter-like-ico-icon"
                        alt=""
                        src={require('./assets/review_detail_counter_dislike_icon.svg').default}
                    />
                </div>
            </div>
            <div className="advertise-box1">
                <div className="advertise-main" />
                <b className="advertise-text1">광고 2</b>
            </div>
            <img
                className="review-detail-hr-icon"
                alt=""
                src="/review-detail-hr.svg"
            />
            <div className="review-detail-comments-counts">nn개의 댓글</div>
            <div className="review-detail-commnets-form">
                <div className="review-detail-commnets-form-bo" />
                <img
                    className="review-detail-commnets-form-im-icon"
                    alt=""
                    src="/review-detail-commnets-form-img@2x.png"
                />
                <div className="review-detail-commnets-form-te" />
                <div className="review-detail-commnets-form-su">
                    <div className="review-detail-commnets-form-su1" />
                    <b className="review-detail-commnets-form-su2">댓글 쓰기</b>
                </div>
            </div>
            <div className="review-detail-commnets">
                <div className="review-detail-comments-all">
                    <div className="review-detail-commnets-detail-">
                        <div className="review-detail-recom-info-text">
                            <div className="review-detail-recom-info-count">댓글 1</div>
                            <div className="review-detail-recom-info-date">
                                <span>{`약  6시간 전 · `}</span>
                                <span className="span">{`수정됨 `}</span>
                            </div>
                        </div>
                        <img
                            className="review-detail-commnets-detail-icon"
                            alt=""
                            src="/review-detail-commnets-detail-info-img@2x.png"
                        />
                    </div>
                    <div className="review-detail-commnets-all-lik">
                        <div className="review-detail-commnets-all-up">
                            <div className="review-detail-commnets-all-up-" />
                            <img
                                className="review-detail-commnets-all-up-icon"
                                alt=""
                                src="/review-detail-commnets-all-up-icon.svg"
                            />
                        </div>
                        <div className="review-detail-recom-likes-coun">
                            <div className="review-detail-commnets-all-box" />
                            <div className="review-detail-commnets-all-lik2">27</div>
                        </div>
                        <div className="review-detail-commnets-all-dow">
                            <div className="review-detail-recom-down-box" />
                            <img
                                className="review-detail-commnets-all-dow-icon"
                                alt=""
                                src="/review-detail-commnets-all-down-icon.svg"
                            />
                        </div>
                    </div>
                    <div className="review-detail-commnets-all-con">
                        <p className="p">
                            모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을
                            박탈당하지 아니한다. 공공필요에 의한 재산권의 수용·사용 또는
                        </p>
                        <p className="p">&nbsp;</p>
                        <p className="p">
                            {" "}
                            제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야
                            한다.
                        </p>
                        <p className="p">
                            선거에 관한 경비는 법률이 정하는 경우를 제외하고
                        </p>
                        <p className="p">&nbsp;</p>
                        <p className="p">&nbsp;</p>
                        <p className="p">
                            는 정당 또는 후보자에게 부담시킬 수 없다. 행정각부의
                        </p>
                        <p className="p">&nbsp;</p>
                        <p className="p">
                            {" "}
                            설치·조직과 직무범위는 법률로 정한다. 대통령은 국가의 원수이며,
                            외국에 대하여 국가를 대표한다.
                        </p>
                    </div>
                </div>
                <div className="review-detail-commnets-hide">
                    <img
                        className="review-detail-commnets-hide-ic-icon"
                        alt=""
                        src="/review-detail-commnets-hide-icon.svg"
                    />
                    <div className="review-detail-commnets-hide-te">댓글 모두 숨기기</div>
                    <div className="review-detail-commnets-hide-co">댓글 쓰기</div>
                </div>
            </div>
            <div className="review-detail-recom">
                <div className="review-detail-recom-box" />
                <div className="review-detail-recom-info">
                    <div className="review-detail-recom-info-text">
                        <div className="review-detail-recom-info-count">대댓글 1</div>
                        <div className="review-detail-recom-info-date">
                            <span>{`약  1시간 전 · `}</span>
                            <span className="span">{`수정됨 `}</span>
                        </div>
                    </div>
                    <img
                        className="review-detail-commnets-detail-icon"
                        alt=""
                        src="/review-detail-recom-info-img@2x.png"
                    />
                </div>
                <div className="review-detail-recom-likes">
                    <div className="review-detail-commnets-all-up">
                        <div className="review-detail-commnets-all-up-" />
                        <img
                            className="review-detail-commnets-all-up-icon"
                            alt=""
                            src="/review-detail-recom-up-icon.svg"
                        />
                    </div>
                    <div className="review-detail-recom-likes-coun">
                        <div className="review-detail-commnets-all-box" />
                        <div className="review-detail-commnets-all-lik2">27</div>
                    </div>
                    <div className="review-detail-commnets-all-dow">
                        <div className="review-detail-recom-down-box" />
                        <img
                            className="review-detail-commnets-all-dow-icon"
                            alt=""
                            src="/review-detail-recom-down-icon.svg"
                        />
                    </div>
                </div>
                <div className="review-detail-recom-textarea">
                    <p className="p">
                        모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을
                        박탈당하지 아니한다. 공공필요에 의한 재산권의 수용·사용 또는
                    </p>
                    <p className="p">&nbsp;</p>
                    <p className="p">
                        {" "}
                        제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야
                        한다.
                    </p>
                    <p className="p">선거에 관한 경비는 법률이 정하는 경우를</p>
                </div>
                <div className="review-detail-recom-recom-form">{`댓글 쓰기 `}</div>
            </div>
            <div className="review-line-box" />
            <div className="review-detail-headline">
                <div className="review-detail-headline-box" />
                <div className="review-detail-headline-text">리뷰게시판</div>
            </div>

        </div>

    );
}

export default Reviewdetail;