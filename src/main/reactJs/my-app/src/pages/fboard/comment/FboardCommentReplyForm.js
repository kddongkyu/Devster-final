import React, {useState} from 'react';
import '../style/FboardDetail.css';
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";
import {useNavigate} from "react-router-dom";
import {checkToken} from "../../../api/checkToken";
import axiosIns from "../../../api/JwtConfig";
import {jwtHandleError} from "../../../api/JwtHandleError";

function FboardCommentReplyForm({fbc_idx, fb_idx}) {

    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const [fboardComment,setFboardComment]=useState('');
    const navi=useNavigate();
    let de = checkToken();

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            fbc_content:fboardComment,
            m_idx:de.idx,
            fb_idx:fb_idx,
            fbc_ref:fbc_idx
        };

        axiosIns.post("/api/fboard/D1/comment", dto)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                jwtHandleError(error, toastAlert);
            });
    }
    return (
        <div className="f-detail-commnets-form">
            <form onSubmit={onSubmitEvent}>
                <div className="f-detail-commnets-form-bo" />
                <img
                    className="f-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="f-detail-commnets-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={fboardComment}
                          onChange={(e)=> setFboardComment(e.target.value)}
                />
                <div className="f-detail-commnets-form-su">
                    <button type='submit'
                            className="f-detail-commnets-form-su-text">답글등록</button>
                </div>
            </form>
        </div>
    );
}

export default FboardCommentReplyForm;