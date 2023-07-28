import React, {useState} from 'react';
import '../style/QboardDetail.css';

import {useNavigate} from "react-router-dom";
import axiosIns from "../../../api/JwtConfig";
import {checkToken} from "../../../api/checkToken";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";
import {jwtHandleError} from "../../../api/JwtHandleError";


function QboardCommentReplyForm({qbc_idx,qb_idx}) {

    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const [qboardComment,setQboardComment]=useState('');
    const navi=useNavigate();

    let de = checkToken();

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            qbc_content:qboardComment,
            m_idx:de.idx,
            qb_idx:qb_idx,
            qbc_ref:qbc_idx
        };

        axiosIns.post("/api/qboard/D1/comment", dto)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                jwtHandleError(error, toastAlert);
            });
    }

    return (
        <div className="q-detail-commnets-form">
            <form onSubmit={onSubmitEvent}>
                <div className="q-detail-commnets-form-bo" />
                <img
                    className="q-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="q-detail-commnets-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={qboardComment} // reviewComment state 사용
                          onChange={(e)=>setQboardComment(e.target.value)}
                />
                <div className="q-detail-commnets-form-su">
                    <button type='submit' className="q-detail-commnets-form-su-text">답글등록</button>
                </div>
            </form>
        </div>
    );
}

export default QboardCommentReplyForm;