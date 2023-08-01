import React, {useCallback, useEffect, useState} from 'react';
import './style/Reviewdetail.css';
import axiosIns from "../../api/JwtConfig";
import {Link, useNavigate, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";
import StarRating from "./StarRating";
import {Reviewcomment, Reviewcommentform, Reviewcommentreply} from "./index";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {jwtHandleError} from "../../api/JwtHandleError";

function Reviewdetail() {

    let de = jwt_decode(localStorage.getItem('accessToken'));
    const m_idx = de.idx;
    const [reviewData, setReviewData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {rb_idx, currentPage} = useParams();
    const [isGood, setIsGood] = useState(false);
    const [isBad, setIsBad] = useState(false);
    const [status, setStatus] = useState("");
    const navi = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const profileUrl = process.env.REACT_APP_MEMBERURL;

    const fetchReview = useCallback((rb_idx, currentPage = null) => {
        const url = `/api/review/D0/${rb_idx}`;
        axiosIns.get(url)
            .then(response => {
                setReviewData(response.data);
                setIsLoading(false);

                if (m_idx && rb_idx) {
                    axiosIns.get(`/api/review/D0/${m_idx}/checkGood/${rb_idx}`)
                        .then(response => {
                            setIsGood(response.data); // 좋아요 상태를 받아서 상태 변수에 저장
                        })
                        .catch(error => {
                            jwtHandleError(error, toastAlert);
                        });

                    axiosIns.get(`/api/review/D0/${m_idx}/checkBad/${rb_idx}`)
                        .then(response => {
                            setIsBad(response.data); // 싫어요 상태를 받아서 상태 변수에 저장
                        })
                        .catch(error => {
                            jwtHandleError(error, toastAlert);
                        });
                }
            })
            .catch(error => {
                jwtHandleError(error, toastAlert);
            });
    }, [m_idx, rb_idx]);


    useEffect(() => {
        fetchReview(rb_idx, currentPage);
    }, [rb_idx, currentPage, fetchReview]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 목록 돌아가기
    const reviewNavigation = () => {
        const url = "/review";
        window.location.href = url;
    };

    const handleNicknameClick = () => {
        // recv_nick은 이 컴포넌트에서 사용할 수 있는 형태로 가져옵니다.
        const recv_nick = reviewData.mNicname;
        navi(`/message/form/${recv_nick}`);
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
        axiosIns.get(`/api/review/D0/${m_idx}/checkBad/${rb_idx}`)
            .then(response => {
                if (response.data === 2) {
                    fetchReview(rb_idx, currentPage);
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/api/review/D0/${m_idx}/checkGood/${rb_idx}`)
                        .then(response => {
                            if (response.data === 1) {
                                axiosIns.post(`/api/review/D1/${m_idx}/like/${rb_idx}`)
                                    .then(response => {
                                        fetchReview(rb_idx, currentPage);
                                    })
                                    .catch(error => {
                                        jwtHandleError(error, toastAlert);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/review/D1/${m_idx}/like/${rb_idx}`)
                                    .then(response => {
                                        fetchReview(rb_idx, currentPage);
                                    })
                                    .catch(error => {
                                        jwtHandleError(error, toastAlert);
                                    });
                            }
                        })
                        .catch(error => {
                            jwtHandleError(error, toastAlert);
                        });
                }
            })
            .catch(error => {
                jwtHandleError(error, toastAlert);
            });
    };


    const handleDislike = (m_idx, rb_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/api/review/D0/${m_idx}/checkGood/${rb_idx}`)
            .then(response => {
                if (response.data === 1) {
                    fetchReview(rb_idx, currentPage);
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/api/review/D0/${m_idx}/checkBad/${rb_idx}`)
                        .then(response => {
                            if (response.data === 2) {

                                axiosIns.post(`/api/review/D1/${m_idx}/dislike/${rb_idx}`)
                                    .then(response => {
                                        fetchReview(rb_idx, currentPage);
                                    })
                                    .catch(error => {
                                        jwtHandleError(error, toastAlert);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/review/D1/${m_idx}/dislike/${rb_idx}`)
                                    .then(response => {
                                        fetchReview(rb_idx, currentPage);
                                    })
                                    .catch(error => {
                                        jwtHandleError(error, toastAlert);
                                    });
                            }
                        })
                        .catch(error => {
                            jwtHandleError(error, toastAlert);
                        });
                }
            })
            .catch(error => {
                jwtHandleError(error, toastAlert);
            });
    };


    const deleteReview = (rb_idx) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            axiosIns.delete(`/api/review/D1/${rb_idx}`)
                .then(response => {
                    window.location.href = "/review";
                })
                .catch(error => {
                    jwtHandleError(error, toastAlert);
                });
        }
    };


    return (
        <div className="review-detail">

            <div className="advertise-box">
                <div className="advertise-main"/>
                <b className="advertise-text">광고</b>
            </div>
            <div className="review-detail-headline">
                <div className="review-detail-headline-box"/>
                <div className="review-detail-headline-text">리뷰게시판</div>
            </div>
            <div className="review-detail-comp">
                <div className="review-detail-comp-box"/>
                <div className="review-detail-comp-info">
                    <img
                        className="review-detail-comp-info-img-icon"
                        alt=""
                        src={reviewData.ciPhoto}
                    />
                    <b className="ci_name_b">{reviewData.ciName} </b>

                    <div
                        className="review-detail-comp-info-stars-icon">
                        <StarRating rating={reviewData.ciStar}/>
                    </div>
                </div>
                <div className="review-detail-comp-info-text">
                    <ul className="review-detail-ul">
                        <li className="li">사원수 : {reviewData.ciPpl}명</li>
                        <li className="cisale_li">매출액 : {reviewData.ciSale}</li>
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
                        src={reviewData.mPhoto ? `${profileUrl}${reviewData.mPhoto}`
                            : require("./assets/logo_profile.svg").default}
                        onClick={handleNicknameClick}
                    />
                    <div className="review-detail-info-nickname"
                         onClick={handleNicknameClick}>{reviewData.mNicname}</div>
                    <div className="review-detail-info-status">
                        <div className="review-detail-info-status-text">

                            {timeForToday(reviewData.review.rb_writeday)
                            }{`   ·        `}</div>
                        <img
                            className="review-detail-info-status-view-icon"
                            alt=""
                            src={require('./assets/review_detail_info_status_views.svg').default}
                        />
                        <div className="review-detail-info-status-text1">
                            <span className="rview-readcount">{reviewData.review.rb_readcount}</span>
                        </div>
                    </div>
                </div>
                <img
                    className="review-detail-header-function-icon"
                    alt=""
                    src={require('./assets/review_detail_header_function_url.svg').default}
                />
                {m_idx === reviewData.review.m_idx && (
                    <>
                        <Link to={`/review/update/${reviewData.review.rb_idx}`}>
                            <img className="review-edit-icon" alt=""
                                 src={require('./assets/review-edit.svg').default}/>
                        </Link>
                        <img className="review-trash-icon" alt=""
                             src={require('./assets/review-trash.svg').default}
                             onClick={() => deleteReview(rb_idx)}/>
                    </>
                )}
            </div>
            <div className="review-detail-body">

                <div className="review-detail-body-subject">{reviewData.review.rb_subject}</div>
                <div className="review-detail-body-text">
                   <pre className="review-detail-textarea-pre"
                        style={{marginBottom: "5rem", wordWrap: "break-word"}}>
                    {reviewData.review.rb_content}
                    </pre>
                </div>


                <div className="review-detail-listbackcounter">
                    <div className="review-detail-listback" onClick={reviewNavigation}>
                        <div className="review-detail-listback-rec"/>
                        <div className="review-detail-listback-text">목록</div>
                        <img
                            className="review-detail-listback-icon"
                            alt=""
                            src={require("../fboard/assets/boarddetail/board_detail_listback_icon.svg").default}
                        />
                    </div>
                    <div className="review-detail-counter">
                        <div className="review-detail-counter-like">
                            <div className="review-detail-counter-like-box"
                                 style={isGood ? {backgroundColor: '#F5EFF9'} : {}}/>

                            <img
                                className="review-detail-counter-like-ico-icon"
                                alt=""
                                src={require('./assets/review_detail_counter_like_icon.svg').default}
                                onClick={() => handlelike(m_idx, rb_idx)}
                            />
                        </div>
                        <div className="review-detail-counter-num">
                            <div className="review-detail-counter-num-box"/>
                            <div className="review-detail-counter-num-text">
                                {reviewData.review.rb_like > reviewData.review.rb_dislike
                                    ? reviewData.review.rb_like - reviewData.review.rb_dislike
                                    : -reviewData.review.rb_dislike}
                            </div>
                        </div>
                        <div className="review-detail-counter-dislike"
                             onClick={() => handleDislike(m_idx, rb_idx)}>
                            <div className="review-detail-counter-dislike-"
                                 style={isBad ? {backgroundColor: '#F5EFF9'} : {}}
                            />
                            <img
                                className="review-detail-counter-like-ico-icon"
                                alt=""
                                src={require('./assets/review_detail_counter_dislike_icon.svg').default}
                            />
                        </div>
                    </div>
                </div>

                <div className="review-detail-advertise-box2">
                    <div className="advertise-main"/>
                    <b className="advertise-text1">광고 2</b>
                </div>
            </div>

            <div className="review-comments-box">
                <Reviewcommentform rb_idx={rb_idx}/>
                <Reviewcomment rb_idx={rb_idx}/>
            </div>
        </div>

    );
}

export default Reviewdetail;