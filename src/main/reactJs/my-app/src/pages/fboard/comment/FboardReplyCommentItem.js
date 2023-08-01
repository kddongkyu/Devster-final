import React, {useCallback, useEffect, useState} from 'react';
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";
import {jwtHandleError} from "../../../api/JwtHandleError";
import {checkToken} from "../../../api/checkToken";
import '../style/FboardReplyForm.css';
import axiosIns from "../../../api/JwtConfig";
import FboardReplyUpdateForm from "./FboardReplyUpdateForm";



function FboardReplyCommentItem({reply, replyIndex}) {

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const [isGood, setIsGood] = useState(false);
    const [isBad, setIsBad] = useState(false);
    const dislike=reply.fboardcommentdto.fbc_dislike;
    const [likeCount, setLikeCount] = useState(reply.likeDislikeDifference);
    const [m_idx, setM_idx] = useState();
    const profileUrl = process.env.REACT_APP_MEMBERURL;

    const handleUpdateClick = () => {
        setShowUpdateForm(!showUpdateForm);
    };
    let de = checkToken();
    const fbc_idx = reply.fboardcommentdto.fbc_idx;

    const deleteComment = (fbc_idx) => {
        axiosIns.delete(`/api/fboard/D1/comment/${fbc_idx}`)
            .then(res => {
                window.location.reload()
            })
            .catch(err => jwtHandleError(err, toastAlert));
    }

    const fetchFboard = useCallback((fbc_idx) => {
        setM_idx(de.idx);
        if(m_idx && fbc_idx) {
            axiosIns.get(`/api/fboard/D0/comment/${m_idx}/checkGood/${fbc_idx}`)
                .then(res => {
                    setIsGood(res.data);
                }).catch(err => {
                toastAlert('에러 발생','warning');
            });

            axiosIns.get(`/api/fboard/D0/comment/${m_idx}/checkBad/${fbc_idx}`)
                .then(res => {
                    setIsBad(res.data);
                }).catch(err => {
                toastAlert('에러 발생','warning');
            });
        }
    }, [reply.fboardcommentdto.fbc_idx, m_idx]);


    useEffect(() => {
        fetchFboard(fbc_idx);
    }, [fbc_idx, fetchFboard, likeCount]);

    const handleDeleteClick = () => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteComment(reply.fboardcommentdto.fbc_idx);
        }
    };
    const handleLikeClick = (m_idx, fbc_idx) => {
        // 좋아요 상태 확인
        axiosIns.get(`/api/fboard/D0/comment/${m_idx}/checkBad/${fbc_idx}`)
            .then(response => {
                if (response.data === 2) {
                    // 이미 좋아요가 눌려있으면 좋아요 취소
                    setIsBad(false);
                    setLikeCount(response.data.likeCount);
                    toastAlert('에러 발생','warning');
                }else{
                    axiosIns.get(`/api/fboard/D0/comment/${m_idx}/checkGood/${fbc_idx}`)
                        .then(response => {
                            if (response.data === 1) {
                                axiosIns.post(`/api/fboard/D1/comment/${m_idx}/like/${fbc_idx}`)
                                    .then(response => {
                                        setIsGood(false);
                                        setLikeCount(response.data.likeCount);
                                    })
                                    .catch(error => {
                                        toastAlert('에러 발생','warning');
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/fboard/D1/comment/${m_idx}/like/${fbc_idx}`)
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


    const handleDislikeClick = (m_idx, fbc_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/api/fboard/D0/comment/${m_idx}/checkGood/${fbc_idx}`)
            .then(response => {
                if (response.data === 1) {
                    setIsGood(false);
                    setLikeCount(response.data.likeCount);
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/api/fboard/D0/comment/${m_idx}/checkBad/${fbc_idx}`)
                        .then(response => {
                            if (response.data === 2) {
                                axiosIns.post(`/api/fboard/D1/comment/${m_idx}/dislike/${fbc_idx}`)
                                    .then(response => {
                                        setIsBad(false);
                                        setLikeCount(response.data.likeCount);
                                    })
                                    .catch(error => {
                                        toastAlert('에러 발생','warning');
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/fboard/D1/comment/${m_idx}/dislike/${fbc_idx}`)
                                    .then(response => {
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
        <div className="fboard-detail-reply-all"  key={replyIndex} style={{marginLeft: '30px'}}>
            <div className="fboard-detail-commnets-detail-">
                <div className="fboard-detail-commnets-detail-1">
                    <div className="fboard-detail-commnets-detail-2">{reply.nickname}</div>

                    <div className="fboard-detail-commnets-detail-3">

                        <span> {timeForToday(reply.fboardcommentdto.fbc_writeday)}{` · `}</span>
                    </div>
                </div>
                <img
                    className="fboard-detail-commnets-detail-icon"
                    alt=""
                    src={reply.photo ? `${profileUrl}${reply.photo}`
                        : require("../assets/logo_profile.svg").default}
                />
            </div>

            {/* like dislike */}
            <div className="fboard-detail-commnets-all-lik-reply" >
                <div className="f-reply-like">
                    <div className="fboard-detail-commnets-all-up-"
                         style={isGood ? { backgroundColor: '#F5EFF9' } : {}}
                         onClick={()=>handleLikeClick(m_idx,fbc_idx)}/>
                    <img
                        className="fboard-detail-commnets-all-up-icon"
                        alt=""
                        src={require('../../review/assets/star-like-icon.svg').default}
                        onClick={()=>handleLikeClick(m_idx,fbc_idx)}

                    />
                    <div className="fboard-detail-commnets-all-lik1">
                        <div className="fboard-detail-commnets-all-box" />
                        <div className="fboard-detail-commnets-all-lik2"> {likeCount < 0 ? "-" + dislike : likeCount}</div>
                    </div>
                    <div className="fboard-detail-commnets-all-dow"
                         style={isBad ? { backgroundColor: '#F5EFF9' } : {}}
                         onClick={()=>handleDislikeClick(m_idx,fbc_idx)}/>
                    <img
                        className="fboard-detail-commnets-all-dow-icon"
                        alt=""
                        src={require('../../review/assets/star-dislike-icon.svg').default}
                        onClick={()=>handleDislikeClick(m_idx,fbc_idx)}
                    />
                </div>
            </div>

            <div className="fboard-detail-commnets-all-con">
                {reply.fboardcommentdto.fbc_content}
                <  br/>
                {de && de.idx === reply.fboardcommentdto.m_idx &&(
                    <>
                        <div className="fboard-detail-commnets-btns">
                            <div className="fboard-detail-commnets-btns-delete" onClick={handleDeleteClick}>삭제</div> &nbsp;&nbsp;
                            <div className="fboard-detail-commnets-btns-update" onClick={handleUpdateClick}>수정</div>
                        </div>
                        {showUpdateForm && <FboardReplyUpdateForm fbc_idx={reply.fboardcommentdto.fbc_idx}
                                                                  fb_idx={reply.fboardcommentdto.fb_idx}
                                                                  currentContent={reply.fboardcommentdto.fbc_content}
                                                                  fbc_ref={reply.fboardcommentdto.fbc_idx} />}
                    </>
                )}
            </div>
            <div className="fboard-detail-commnets-hide">
                <img
                    className="fboard-detail-commnets-hide-ic-icon"
                    alt=""
                    src="/fboard-detail-commnets-hide-icon.svg"
                />

            </div>
        </div>
    );
}

export default FboardReplyCommentItem;