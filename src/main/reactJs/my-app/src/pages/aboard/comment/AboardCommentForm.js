import React, {useState} from 'react';

import {useNavigate} from "react-router-dom";
import axiosIns from "../../../api/JwtConfig";
import ToastAlert from "../../../api/ToastAlert";
import {useSnackbar} from "notistack";
import {checkToken} from "../../../api/checkToken";
import {jwtHandleError} from "../../../api/JwtHandleError";
function AboardCommentForm({ab_idx}) {

    const [aboardComment,setAboardComment]=useState('');
    const navi=useNavigate();

    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const de = checkToken();

    const onSubmitEvent = (e) => {
        if(!de) {
            toastAlert(<>댓글 작성은 로그인 회원만 이용 가능합니다.<br/>댓글을 작성하시려면 로그인해주세요.</>,'warning');
            return;
        }

        e.preventDefault();

        const dto = {
            abc_content : aboardComment,
            m_idx:de.idx,
            ab_idx : ab_idx
        };

        axiosIns.post("/api/academyboard/D1/comment", dto)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                // 등록 실패 시 에러 처리
                jwtHandleError(error, toastAlert);
            });
    }

    return (
        <div className="aboard-detail-commnets-form">
            <form onSubmit={onSubmitEvent}>
                <div className="aboard-detail-commnets-form-bo" />
                <img
                    className="aboard-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="aboard-detail-commnets-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={aboardComment}
                          onChange={(e)=>setAboardComment(e.target.value)}
                >
                </textarea>
                <b>000</b>
                <button  type='submit' className="aboard-detail-commnets-form-su">
                    <div className="aboard-detail-commnets-form-su1" />
                    <b className="aboard-detail-commnets-form-su2">댓글 쓰기</b>
                </button>
            </form>
        </div>
    );
}

export default AboardCommentForm;