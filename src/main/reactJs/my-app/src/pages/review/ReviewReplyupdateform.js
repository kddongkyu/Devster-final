import React, {useEffect, useState} from 'react';
import './style/replyform.css'

import {useNavigate, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";

function ReviewReplyupdateform() {
    const [rbc_content, setRbc_content] = useState(""); // 상태를 정의합니다.
    const {rbc_idx}=useParams();


    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            rbc_content: reviewComment.rbc_content,
        };

        // PUT 요청으로 수정
        axiosIns.put(`/api/review/D1/comment/${rbc_idx}`, dto)
            .then(res => {
                // 성공적으로 등록된 경우, 목록으로 이동
                window.location.reload();

            })
            .catch(error => {
                // 등록 실패 시 에러 처리
                console.error(error);
            });
    }

    return (
        <div>
            <form className="review-detail-commnets-form" onSubmit={onSubmitEvent}>
                <div className="review-detail-commnets-form-bo" />
                <img
                    className="review-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="review-detail-commnets-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={reviewComment.rbc_content} // reviewComment state 사용
                          onChange={(e)=>setRbc_content(e.target.value)}
                />
                <button  type='submit' className="review-detail-commnets-form-su">
                    <div className="review-detail-commnets-form-su1" />
                    <b className="review-detail-commnets-form-su2">댓글 수정</b>
                </button>
            </form>
        </div>
    );
}

export default ReviewReplyupdateform;
