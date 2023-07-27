import React, {useState} from 'react';
import './style/Reviewdetail.css';

import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";


function ReviewReplyform({rbc_idx,rb_idx}) {

    const [reviewcomment,setReviewcomment]=useState('');
    const navi=useNavigate();

    let de = jwt_decode(localStorage.getItem('accessToken'));
    console.log(de.idx);




    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            rbc_content:reviewcomment,
            m_idx:de.idx,
            rb_idx:rb_idx,
            rbc_ref:rbc_idx
        };
//console.log(dto)
        axiosIns.post("/api/review/D1/comment", dto)
            .then(res => {
                // 성공적으로 등록된 경우, 목록으로 이동
                window.location.reload()

            })
            .catch(error => {
                // 등록 실패 시 에러 처리
                console.error(error);
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
                    <button type='submit' className="r-detail-commnets-form-su-text">댓글등록</button>
                </div>
            </form>
        </div>
    );
}

export default ReviewReplyform;