import React, {useState} from 'react';
import {checkToken} from "../../../api/checkToken";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";
import {jwtHandleError} from "../../../api/JwtHandleError";
import {useNavigate} from "react-router-dom";
import axiosIns from "../../../api/JwtConfig";

function AboardCommentReplyForm({abc_idx,ab_idx}) {

    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const [aboardComment,setAboardComment]=useState('');
    const navi=useNavigate();

    let de = checkToken();

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            abc_content:aboardComment,
            m_idx:de.idx,
            ab_idx:ab_idx,
            abc_ref:abc_idx
        };

        axiosIns.post("/api/academyboard/D1/comment", dto)
            .then(res => {
                window.location.reload()
            })
            .catch(error => {
                jwtHandleError(error, toastAlert);
            });
    }

    return (
        <div className="a-detail-commnets-form">
            <form onSubmit={onSubmitEvent}>
                <div className="a-detail-commnets-form-bo" />
                <img
                    className="a-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="a-detail-commnets-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={aboardComment}
                          onChange={(e)=>setAboardComment(e.target.value)}
                />
                <div className="a-detail-commnets-form-su">
                    <button type='submit' className="a-detail-commnets-form-su-text">답글등록</button>
                </div>
            </form>
        </div>
    );
}

export default AboardCommentReplyForm;