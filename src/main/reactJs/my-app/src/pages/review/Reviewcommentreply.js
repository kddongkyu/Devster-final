import React from 'react';
import './style/Reviewdetail.css';
function Reviewcommentreply(props) {
    return (
        <div>
            <div className="review-detail-commnets-hide-te">댓글 모두 숨기기</div>
            <div className="review-detail-commnets-hide-co">댓글 쓰기</div>
            <div className="review-detail-recom-box" />
            <div className="review-detail-recom-info">
                <div className="review-detail-recom-info-text">
                    <div className="review-detail-recom-info-count">대댓글 1</div>
                    <div className="review-detail-recom-info-date">
                        <span>{`약  1시간 전 · `}</span>
                        <span className="span">{`수정됨 `}</span>
                    </div>
                </div>
                <img
                    className="review-detail-commnets-detail-icon"
                    alt=""
                    src="/review-detail-recom-info-img@2x.png"
                />
            </div>
            <div className="review-detail-recom-likes">
                <div className="review-detail-commnets-all-up">
                    <div className="review-detail-commnets-all-up-" />
                    <img
                        className="review-detail-commnets-all-up-icon"
                        alt=""
                        src="/review-detail-recom-up-icon.svg"
                    />
                </div>
                <div className="review-detail-recom-likes-coun">
                    <div className="review-detail-commnets-all-box" />
                    <div className="review-detail-commnets-all-lik2">27</div>
                </div>
                <div className="review-detail-commnets-all-dow">
                    <div className="review-detail-recom-down-box" />
                    <img
                        className="review-detail-commnets-all-dow-icon"
                        alt=""
                        src="/review-detail-recom-down-icon.svg"
                    />
                </div>
            </div>
            <div className="review-detail-recom-textarea">
             <p>댓글내용</p>
            <div className="review-detail-recom-recom-form">{`댓글 쓰기 `}</div>
         </div>
        </div>
    );
}

export default Reviewcommentreply;