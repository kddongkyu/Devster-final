import React, {useCallback, useEffect, useState} from 'react';
import axiosIns from "../../../api/JwtConfig";
import '../style/QboardReplyForm.css';
import {checkToken} from "../../../api/checkToken";
import ToastAlert from "../../../api/ToastAlert";
import {jwtHandleError} from "../../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import QboardReplyUpdateForm from "./QboardReplyUpdateForm";
import QboardCommentReplyForm from "./QboardCommentReplyForm";

function QboardCommentItem({ comment, index, qbc_idx ,toggleReplyComments }) {

    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [m_idx,setM_idx] = useState(0);
    const de = checkToken();
    const profileUrl = process.env.REACT_APP_MEMBERURL;


    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);


    const handleReplyButtonClick = () => {
        try {
            setM_idx(de.idx);
            setShowReplyForm(!showReplyForm);
        } catch (error) {
            toastAlert(<>댓글 작성은 로그인 회원만 이용 가능합니다.<br/>댓글을 작성하시려면 로그인해주세요.</>,'warning');
        }
    };

    //수정 버튼 클릭
    const handleUpdateClick = () => {
        setShowUpdateForm(!showUpdateForm);
    };

    const deleteComment = (qbc_idx) => {
        axiosIns.delete(`/api/qboard/D1/comment/${qbc_idx}`)
            .then(res => {
                console.log(res.data);  // 성공 메시지 출력
            })
            .catch(err => jwtHandleError(err,toastAlert));
    }


    const handleDeleteClick = () => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteComment(qbc_idx);
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

    const setMemberPhotoUrl = (value) => {
        if (!value) {
            return require("../assets/logo_profile.svg").default;
        }
        const photoUrl = process.env.REACT_APP_PHOTO+"member/";
        const srcUrl = photoUrl + value;

        return srcUrl;
    }

    return (
        <div className="qboard-detail-comments-all"  key={index}>
            <div className="qboard-detail-commnets-detail-">
                <div className="qboard-detail-commnets-detail-1">
                    <div className="qboard-detail-commnets-detail-2">{comment.nickname}</div>
                    <div className="qboard-detail-commnets-detail-3">
                        <span>{timeForToday(comment.qboardCommentDto.qbc_writeday)}</span>
                    </div>
                </div>
                <img
                    className="qboard-detail-commnets-detail-icon"
                    alt=""
                    src={setMemberPhotoUrl(comment.photo)}
                />
            </div>

            <div className="qboard-detail-commnets-all-con">
                { comment.qboardCommentDto.qbc_content}
                <br/>
                {de && de.idx === comment.qboardCommentDto.m_idx &&(
                    <>
                        <div className="qboard-detail-commnets-btns">
                            {/* 이 부분 시간나면 닉네임 옆으로 옮기기 */}
                            <div className="qboard-detail-commnets-btns-delete" onClick={handleDeleteClick}>삭제</div> &nbsp;&nbsp;
                            <div className="qboard-detail-commnets-btns-update" onClick={handleUpdateClick}>수정</div>
                        </div>
                        {showUpdateForm && <QboardReplyUpdateForm qbc_idx={comment.qboardCommentDto.qbc_idx}
                                                                  qb_idx={comment.qboardCommentDto.qb_idx}
                                                                  currentContent={comment.qboardCommentDto.qbc_content} />}
                    </>
                )}
            </div>
            <div className="qboard-detail-commnets-hide">
                {comment.replyConut != 0 ? (
                    <div className="qboard-detail-commnets-hide-te"
                         onClick={() => toggleReplyComments(comment.qboardCommentDto.qbc_idx)}
                    >
                        <img alt=""
                             src={require('../assets/qboard_detail_commnets_all_up_icon.svg').default}
                             className="qboard-detail-commnets-hide-img"/>
                        &nbsp;&nbsp;답글 숨기기</div>
                ) : ""}

                <div className="qboard-detail-commnets-hide-co" onClick={handleReplyButtonClick}>답글 쓰기</div>
                {showReplyForm &&
                    <QboardCommentReplyForm qbc_idx={comment.qboardCommentDto.qbc_idx} qb_idx={comment.qboardCommentDto.qb_idx} />}
            </div>
        </div>
    );
}

export default QboardCommentItem;