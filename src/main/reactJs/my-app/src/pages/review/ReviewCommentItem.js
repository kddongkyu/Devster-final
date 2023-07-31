import React, {useCallback, useEffect, useState} from 'react';
import ReviewReplyform from "./ReviewReplyform";
import axiosIns from "../../api/JwtConfig";
import ReviewReplyupdateform from "./ReviewReplyupdateform";
import './style/Reviewdetail.css';
import jwt_decode from "jwt-decode";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";

function ReviewCommentItem({ comment, index ,toggleReplyComments}) {

    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [isGood, setIsGood] = useState(false);
    const [isBad, setIsBad] = useState(false);
    const dislike=comment.reviewcommentdto.rbc_dislike;
    const [likeCount, setLikeCount] = useState(comment.likeDislikeDifference);
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);


    let de = jwt_decode(localStorage.getItem("accessToken"));
    const m_idx = de.idx;
    const rbc_idx=comment.reviewcommentdto.rbc_idx;


    const fetchReview = useCallback((rbc_idx) => {
        if(m_idx && rbc_idx) {
            axiosIns.get(`/api/review/D0/comment/${m_idx}/checkGood/${rbc_idx}`)
                .then(res => {
                    setIsGood(res.data);
                }).catch(err => {
                toastAlert('에러 발생','warning');
            });

            axiosIns.get(`/api/review/D0/comment/${m_idx}/checkBad/${rbc_idx}`)
                .then(res => {
                    setIsBad(res.data);
                }).catch(err => {
                toastAlert('에러 발생','warning');
            });
        }
    }, [comment.reviewcommentdto.rbc_idx, m_idx]);


    useEffect(() => {
        fetchReview(rbc_idx);
    }, [rbc_idx, fetchReview,likeCount]);


    //대댓글 숨기는 기능
    const handleReplyButtonClick = () => {
        setShowReplyForm(!showReplyForm);
    };
    //수정 버튼 클릭
    const handleUpdateClick = () => {
        setShowUpdateForm(!showUpdateForm);
    };


    const deleteComment = (rbc_idx) => {
        axiosIns.delete(`/api/review/D1/comment/${rbc_idx}`)
            .then(res => {
                fetchReview(rbc_idx);
            })
        toastAlert('에러 발생','warning');
    }

    const handleDeleteClick = () => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteComment(comment.reviewcommentdto.rbc_idx);
        }
    };

    //좋아요 싫어요 체크

    const handleLikeClick = (m_idx, rbc_idx) => {
        // 좋아요 상태 확인
        axiosIns.get(`/api/review/D0/comment/${m_idx}/checkBad/${rbc_idx}`)
            .then(response => {
                if (response.data === 2) {
                    // 이미 좋아요가 눌려있으면 좋아요 취소
                    setIsBad(false);
                    setLikeCount(response.data.likeCount);
                }else{
                    axiosIns.get(`/api/review/D0/comment/${m_idx}/checkGood/${rbc_idx}`)
                        .then(response => {
                            if (response.data === 1) {
                                axiosIns.post(`/api/review/D1/comment/${m_idx}/like/${rbc_idx}`)
                                    .then(response => {
                                        setIsGood(false);
                                        setLikeCount(response.data.likeCount);
                                    })
                                    .catch(error => {
                                        toastAlert('에러 발생','warning');
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/review/D1/comment/${m_idx}/like/${rbc_idx}`)
                                    .then(response => {
                                        toastAlert('좋아요를 누르셨습니다.','success');
                                        setIsGood(true);
                                        setLikeCount(response.data.likeCount);
                                    })
                                    .catch(error => {
                                        toastAlert('에러 발생','warning');
                                    });
                            }
                        })
                        .catch(error => {
                            toastAlert('에러 발생','warning');
                        });
                }
            })
            .catch(error => {
                toastAlert('에러 발생','warning');
            });
    };


    const handleDislikeClick = (m_idx, rbc_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/api/review/D0/comment/${m_idx}/checkGood/${rbc_idx}`)
            .then(response => {
                if (response.data === 1) {
                    setIsGood(false);
                    setLikeCount(response.data.likeCount);
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/api/review/D0/comment/${m_idx}/checkBad/${rbc_idx}`)
                        .then(response => {
                            if (response.data === 2) {
                                axiosIns.post(`/api/review/D1/comment/${m_idx}/dislike/${rbc_idx}`)
                                    .then(response => {
                                        setIsBad(false);
                                        setLikeCount(response.data.likeCount);
                                    })
                                    .catch(error => {
                                        toastAlert('에러 발생','warning');
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/review/D1/comment/${m_idx}/dislike/${rbc_idx}`)
                                    .then(response => {
                                        toastAlert('싫어요를 누르셨습니다.','success');
                                        setIsBad(true);
                                        setLikeCount(response.data.likeCount);
                                    })
                                    .catch(error => {
                                        toastAlert('에러 발생','warning');
                                    });
                            }
                        })
                        .catch(error => {
                            toastAlert('에러 발생','warning');
                        });
                }
            })
            .catch(error => {
                toastAlert('에러 발생','warning');
            });
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

    return (
        <div className="review-detail-comments-all"  key={index}>
            <div className="review-detail-commnets-detail-">
                <div className="review-detail-commnets-detail-1">
                    <div className="review-detail-commnets-detail-2">{comment.nickname}</div>
                    <div className="review-detail-commnets-detail-3">
                        <span>{timeForToday(comment.reviewcommentdto.rbc_writeday)}</span>
                    </div>
                </div>
                <img
                    className="review-detail-commnets-detail-icon"
                    alt=""
                    src="/review-detail-commnets-detail-info-img@2x.png"
                />
            </div>

            <div className="review-detail-commnets-all-lik">
                <div className="review-detail-commnets-all-up-"
                     style={isGood ? { backgroundColor: '#F5EFF9' } : {}}
                     onClick={()=>handleLikeClick(m_idx,rbc_idx)}/>
                <img
                    className="review-detail-commnets-all-up-icon"
                    alt=""
                    src={require('./assets/star-like-icon.svg').default}
                    onClick={()=>handleLikeClick(m_idx,rbc_idx)}
                />
                <div className="review-detail-commnets-all-lik1">
                    <div className="review-detail-commnets-all-box" />
                    <div className="review-detail-commnets-all-lik2">
                        {likeCount < 0 ? "-" + dislike : likeCount}
                    </div>
                </div>
                <div className="review-detail-commnets-all-dow"
                     style={isBad ? { backgroundColor: '#F5EFF9' } : {}}
                     onClick={()=>handleDislikeClick(m_idx,rbc_idx)}/>
                <img
                    className="review-detail-commnets-all-dow-icon"
                    alt=""
                    src={require('./assets/star-dislike-icon.svg').default}
                    onClick={()=>handleDislikeClick(m_idx,rbc_idx)}
                />
            </div>

            <div className="review-detail-commnets-all-con">
                { comment.reviewcommentdto.rbc_content}
                <br/>
                {m_idx === comment.reviewcommentdto.m_idx &&(
                    <>
                        <div className="review-detail-commnets-btns">
                            {/* 이 부분 시간나면 닉네임 옆으로 옮기기 */}
                            <div className="review-detail-commnets-btns-delete" onClick={handleDeleteClick}>삭제</div> &nbsp;&nbsp;
                            <div className="review-detail-commnets-btns-update" onClick={handleUpdateClick}>수정</div>
                        </div>
                        {showUpdateForm && <ReviewReplyupdateform rbc_idx={comment.reviewcommentdto.rbc_idx}
                                                                  rb_idx={comment.reviewcommentdto.rb_idx}
                                                                  currentContent={comment.reviewcommentdto.rbc_content} />}
                    </>
                )}
            </div>
            <div className="review-detail-commnets-hide">
                {comment.replyConut != 0 ? (
                    <div className="review-detail-commnets-hide-te"
                         onClick={() => toggleReplyComments(comment.reviewcommentdto.rbc_idx)}
                    >
                        <img alt=""
                             src={require('./assets/review_detail_commnets_all_up_icon.svg').default}
                             className="review-detail-commnets-hide-img"/>
                        &nbsp;&nbsp;답글 숨기기</div>
                ) : ""}

                <div className="review-detail-commnets-hide-co" onClick={handleReplyButtonClick}>답글 쓰기</div>
                {showReplyForm &&
                    <ReviewReplyform rbc_idx={comment.reviewcommentdto.rbc_idx} rb_idx={comment.reviewcommentdto.rb_idx} />}
            </div>
        </div>
    );
}


export default ReviewCommentItem;