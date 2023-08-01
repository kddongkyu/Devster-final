import React, {useState} from 'react';
//
import {useNavigate} from "react-router-dom";
import axiosIns from "../../../api/JwtConfig";
import ToastAlert from "../../../api/ToastAlert";
import {useSnackbar} from "notistack";
import {checkToken} from "../../../api/checkToken";
import {jwtHandleError} from "../../../api/JwtHandleError";

function QboardCommentForm({qb_idx}) {
    // console.log("111:"+rb_idx);
    const [qboardComment,setQboardComment]=useState('');
    const navi=useNavigate();
    const profileUrl = process.env.REACT_APP_MEMBERURL;

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
            qbc_content : qboardComment,
            m_idx:de.idx,
            qb_idx : qb_idx
        };

        axiosIns.post("/api/qboard/D1/comment", dto)
            .then(res => {

            })
            .catch(error => {
                // 등록 실패 시 에러 처리
                jwtHandleError(error, toastAlert);
            });
    }

    return (
        <div className="qboard-detail-commnets-form">
            <form onSubmit={onSubmitEvent}>
                <div className="qboard-detail-commnets-form-bo" />
                <textarea className="qboard-detail-commnets-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={qboardComment}
                          onChange={(e)=>setQboardComment(e.target.value)}
                >
                </textarea>
                <b>000</b>
                <button  type='submit' className="qboard-detail-commnets-form-su">
                    <div className="qboard-detail-commnets-form-su1" />
                    <b className="qboard-detail-commnets-form-su2">댓글 쓰기</b>
                </button>
            </form>
        </div>
    );
}

export default QboardCommentForm;