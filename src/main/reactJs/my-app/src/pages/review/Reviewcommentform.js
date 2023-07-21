import React, {useState} from 'react';
import './style/Reviewdetail.css';
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";
function Reviewcommentform(props) {
    const [reviewcomment,setReviewcomment]=useState('');
    const navi=useNavigate();

    let de = jwt_decode(localStorage.getItem('accessToken'));
    console.log(de.idx);

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            rbc_content:reviewcomment,
            m_idx:de.idx,
            rb_idx:props.rb_idx
        };

        axiosIns.post("/api/reviewcomment/D1", dto)
            .then(res => {
                // 성공적으로 등록된 경우, 목록으로 이동
               // navi("/review/detail/:rb_idx/:currentPage");
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
                required value={reviewcomment}
                          onChange={(e)=>setReviewcomment(e.target.value)}>
                </textarea>
                <button  type='submit' className="review-detail-commnets-form-su">
                    <div className="review-detail-commnets-form-su1" />
                    <b className="review-detail-commnets-form-su2">댓글 쓰기</b>
                </button>
            </form>
        </div>
    );
}

export default Reviewcommentform;