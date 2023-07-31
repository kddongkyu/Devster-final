import React, {useCallback, useEffect, useState} from 'react';
import QboardReplyUpdateForm from "./QboardReplyUpdateForm";
import axiosIns from "../../../api/JwtConfig";
import '../style/QboardReplyForm.css';
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";
import {jwtHandleError} from "../../../api/JwtHandleError";
import {checkToken} from "../../../api/checkToken";



function QboardReplyCommentItem({ reply, replyIndex }) {

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const profileUrl = process.env.REACT_APP_MEMBERURL;

    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const handleUpdateClick = () => {
        setShowUpdateForm(!showUpdateForm);
    };

    let de = checkToken();
    const rbc_idx=reply.qboardCommentDto.qbc_idx;


    const deleteComment = (qbc_idx) => {
        axiosIns.delete(`/api/qboard/D1/comment/${qbc_idx}`)
            .then(res => {
                console.log(res.data);  // 성공 메시지 출력
                window.location.reload()
            })
            .catch(err => jwtHandleError(err, toastAlert));
    }

    const handleDeleteClick = () => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteComment(reply.qbc_idx);
        }
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
        <div className="qboard-detail-reply-all"  key={replyIndex} style={{marginLeft: '30px'}}>
            <div className="qboard-detail-commnets-detail-">
                <div className="qboard-detail-commnets-detail-1">
                    <div className="qboard-detail-commnets-detail-2">{reply.nickname}</div>

                    <div className="qboard-detail-commnets-detail-3">

                        <span> {timeForToday(reply.qboardCommentDto.qbc_writeday)}{` · `}</span>
                    </div>
                </div>
                <img
                    className="qboard-detail-commnets-detail-icon"
                    alt=""
                    src={`${profileUrl}${reply.photo}`}
                />
            </div>
            <div className="qboard-detail-commnets-all-con">
                {reply.qboardCommentDto.qbc_content}
                <  br/>
                {de && de.idx === reply.qboardCommentDto.m_idx &&(
                    <>
                        <div className="qboard-detail-commnets-btns">
                            <div className="qboard-detail-commnets-btns-delete" onClick={handleDeleteClick}>삭제</div> &nbsp;&nbsp;
                            <div className="qboard-detail-commnets-btns-update" onClick={handleUpdateClick}>수정</div>
                        </div>
                        {showUpdateForm && <QboardReplyUpdateForm qbc_idx={reply.qboardCommentDto.qbc_idx}
                                                                  qb_idx={reply.qboardCommentDto.qb_idx}
                                                                  currentContent={reply.qboardCommentDto.qbc_content}
                                                                  qbc_ref={reply.qboardCommentDto.qbc_idx} />}
                    </>
                )}
            </div>
            <div className="qboard-detail-commnets-hide">
                <img
                    className="qboard-detail-commnets-hide-ic-icon"
                    alt=""
                    src="/qboard-detail-commnets-hide-icon.svg"
                />

            </div>
        </div>
    );
}

export default QboardReplyCommentItem;