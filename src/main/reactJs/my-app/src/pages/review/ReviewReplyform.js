import React, {useState} from 'react';
import './style/Reviewdetail.css';
import {useNavigate} from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {checkToken} from "../../api/checkToken";


function ReviewReplyform({rbc_idx,rb_idx}) {

    const [reviewcomment,setReviewcomment]=useState('');
    const navi=useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    let de = checkToken();

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            rbc_content:reviewcomment,
            m_idx:de.idx,
            rb_idx:rb_idx,
            rbc_ref:rbc_idx
        };
        axiosIns.post("/api/review/D1/comment", dto)
            .then(res => {
                // 성공적으로 등록된 경우, 목록으로 이동
                window.location.reload()

            })
            .catch(error => {
              toastAlert('답글 작성 중 에러 발생', 'warning');
            });
    }

    return (
        <div className="r-detail-commnets-form">
            <form onSubmit={onSubmitEvent}>
                <div className="r-detail-commnets-form-bo" />
                <img
                    className="r-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="r-detail-commnets-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={reviewcomment} // reviewComment state 사용
                          onChange={(e)=>setReviewcomment(e.target.value)}
                />
                <div className="r-detail-commnets-form-su">
                    <button type='submit' className="r-detail-commnets-form-su-text">답글등록</button>
                </div>
            </form>
        </div>
    );
}

export default ReviewReplyform;