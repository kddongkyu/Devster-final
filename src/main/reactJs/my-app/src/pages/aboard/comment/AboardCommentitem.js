
import React, {useCallback, useEffect, useState} from 'react';
import axiosIns from "../../../api/JwtConfig";
import '../style/AboardReplyForm.css';
import {checkToken} from "../../../api/checkToken";
import ToastAlert from "../../../api/ToastAlert";
import {jwtHandleError} from "../../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import AboardCommentReplyForm from "./AboardCommentReplyForm";
import AboardReplyUpdateForm from "./AboardReplyUpdateForm";
import {useNavigation} from "react-router-dom";



function AboardCommentitem( {comment, index ,toggleReplyComments }) {

    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [isGood, setIsGood] = useState(false);
    const [isBad, setIsBad] = useState(false);
    const dislike=comment.academyCommentDto.abc_dislike;
    const [likeCount, setLikeCount] = useState(comment.likeDislikeDifference);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const de = checkToken();
    const m_idx = de.idx;
    const abc_idx=comment.academyCommentDto.abc_idx;
    const profileUrl = process.env.REACT_APP_MEMBERURL;



    const fetchAboard = useCallback((abc_idx) => {
        if(m_idx && abc_idx) {
            axiosIns.get(`/api/academyboard/D0/comment/${m_idx}/checkGood/${abc_idx}`)
                .then(res => {
                    setIsGood(res.data);
                }).catch(err => {
                jwtHandleError(err, toastAlert);
            });

            axiosIns.get(`/api/academyboard/D0/comment/${m_idx}/checkBad/${abc_idx}`)
                .then(res => {
                    setIsBad(res.data);
                }).catch(err => {
                jwtHandleError(err, toastAlert);
            });
        }
    }, [comment.academyCommentDto.abc_idx, m_idx]);


    useEffect(() => {
        fetchAboard(abc_idx);
    }, [abc_idx, fetchAboard,likeCount]);

    const handleReplyButtonClick = () => {
        try {
            setShowReplyForm(!showReplyForm);
        } catch (error) {
            toastAlert(<>댓글 작성은 로그인 회원만 이용 가능합니다.<br/>댓글을 작성하시려면 로그인해주세요.</>,'warning');
        }
    };

    //수정 버튼 클릭
    const handleUpdateClick = () => {
        try {
            setShowUpdateForm(!showUpdateForm);
        } catch (error) {
            toastAlert(<>댓글 작성은 로그인 회원만 이용 가능합니다.<br/>댓글을 작성하시려면 로그인해주세요.</>,'warning');
        }
    };

    const deleteComment = (abc_idx) => {
        axiosIns.delete(`/api/academyboard/D1/comment/${abc_idx}`)
            .then(res => {
            fetchAboard(abc_idx);
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    toastAlert(<>댓글 작성은 로그인 회원만 이용 가능합니다.<br/>댓글을 작성하시려면 로그인해주세요.</>, 'warning');
                }
                jwtHandleError(err, toastAlert);
            });
    }



    const handleDeleteClick = () => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteComment(abc_idx);
        }
    };

    //좋아요 싫어요 체크

    const handleLikeClick = (m_idx, abc_idx) => {
        // 좋아요 상태 확인
        axiosIns.get(`/api/academyboard/D0/comment/${m_idx}/checkBad/${abc_idx}`)
            .then(response => {
                if (response.data === 2) {
                    // 이미 좋아요가 눌려있으면 좋아요 취소
                    setIsBad(false);
                    setLikeCount(response.data.likeCount);
                }else{
                    axiosIns.get(`/api/academyboard/D0/comment/${m_idx}/checkGood/${abc_idx}`)
                        .then(response => {
                            if (response.data === 1) {
                                axiosIns.post(`/api/academyboard/D1/comment/${m_idx}/like/${abc_idx}`)
                                    .then(response => {
                                        setIsGood(false);
                                        setLikeCount(response.data.likeCount);
                                    })
                                    .catch(error => {
                                        jwtHandleError(error, toastAlert);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/academyboard/D1/comment/${m_idx}/like/${abc_idx}`)
                                    .then(response => {
                                        setIsGood(true);
                                        setLikeCount(response.data.likeCount);
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


    const handleDislikeClick = (m_idx, abc_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/api/academyboard/D0/comment/${m_idx}/checkGood/${abc_idx}`)
            .then(response => {
                if (response.data === 1) {
                    setIsGood(false);
                    setLikeCount(response.data.likeCount);
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/api/academyboard/D0/comment/${m_idx}/checkBad/${abc_idx}`)
                        .then(response => {
                            if (response.data === 2) {
                                axiosIns.post(`/api/academyboard/D1/comment/${m_idx}/dislike/${abc_idx}`)
                                    .then(response => {
                                        setIsBad(false);
                                        setLikeCount(response.data.likeCount);
                                    })
                                    .catch(error => {
                                        jwtHandleError(error, toastAlert);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/academyboard/D1/comment/${m_idx}/dislike/${abc_idx}`)
                                    .then(response => {
                                        console.log('싫어요 요청 성공:', response.data);
                                        setIsBad(true);
                                        setLikeCount(response.data.likeCount);
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
        <div className="aboard-detail-comments-all"  key={index}>
            <div className="aboard-detail-commnets-detail-">
                <div className="aboard-detail-commnets-detail-1">
                    <div className="aboard-detail-commnets-detail-2">{comment.nickname}</div>
                    <div className="aboard-detail-commnets-detail-3">
                        <span>{timeForToday(comment.academyCommentDto.abc_writeday)}</span>
                    </div>
                </div>
                <img
                    className="aboard-detail-commnets-detail-icon"
                    alt=""
                    src={`${profileUrl}${comment.mPhoto}`}
                />
            </div>

            <div className="aboard-detail-commnets-all-lik">
                <div className="aboard-detail-commnets-all-up-"
                     style={isGood ? { backgroundColor: '#F5EFF9' } : {}}
                     onClick={()=>handleLikeClick(m_idx,abc_idx)}/>
                <img
                    className="aboard-detail-commnets-all-up-icon"
                    alt=""
                    src={require('../assets/star-like-icon.svg').default}
                    onClick={()=>handleLikeClick(m_idx,abc_idx)}
                />
                <div className="aboard-detail-commnets-all-lik1">
                    <div className="aboard-detail-commnets-all-box" />
                    <div className="aboard-detail-commnets-all-lik2">
                        {likeCount < 0 ? "-" + dislike : likeCount}
                    </div>
                </div>
                <div className="aboard-detail-commnets-all-dow"
                     style={isBad ? { backgroundColor: '#F5EFF9' } : {}}
                     onClick={()=>handleDislikeClick(m_idx,abc_idx)}
                />
                <img
                    className="aboard-detail-commnets-all-dow-icon"
                    alt=""
                    src={require('../assets/star-dislike-icon.svg').default}
                    onClick={()=>handleDislikeClick(m_idx,abc_idx)}
                />
            </div>

            <div className="aboard-detail-commnets-all-con">
                { comment.academyCommentDto.abc_content}
                <br/>
                {de && de.idx === comment.academyCommentDto.m_idx &&(
                    <>
                        <div className="aboard-detail-commnets-btns">
                            {/* 이 부분 시간나면 닉네임 옆으로 옮기기 */}
                            <div className="aboard-detail-commnets-btns-delete" onClick={handleDeleteClick}>삭제</div> &nbsp;&nbsp;
                            <div className="aboard-detail-commnets-btns-update" onClick={handleUpdateClick}>수정</div>
                        </div>
                        {showUpdateForm && <AboardReplyUpdateForm  abc_idx={comment.academyCommentDto.abc_idx}
                                                                   ab_idx={comment.academyCommentDto.ab_idx}
                                                                   currentContent={comment.academyCommentDto.abc_content} />}
                    </>
                )}
            </div>
            <div className="aboard-detail-commnets-hide">
                {comment.replyConut != 0 ? (
                    <div className="aboard-detail-commnets-hide-te"
                         onClick={() => toggleReplyComments(comment.academyCommentDto.abc_idx)}
                    >
                        <img alt=""
                             src={require('../assets/star-dislike-icon.svg').default}
                             className="aboard-detail-commnets-hide-img"/>
                        &nbsp;&nbsp;답글 숨기기</div>
                ) : ""}

                <div className="aboard-detail-commnets-hide-co" onClick={handleReplyButtonClick}>답글 쓰기</div>
                {showReplyForm &&
                    <AboardCommentReplyForm abc_idx={comment.academyCommentDto.abc_idx} ab_idx={comment.academyCommentDto.ab_idx}/>}
            </div>
        </div>
    );
}

export default AboardCommentitem;