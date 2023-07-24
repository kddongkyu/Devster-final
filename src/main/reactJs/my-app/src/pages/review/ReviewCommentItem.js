import React, {useState} from 'react';
import ReviewReplyform from "./ReviewReplyform";
import axiosIns from "../../api/JwtConfig";
import ReviewReplyupdateform from "./ReviewReplyupdateform";

function ReviewCommentItem({ comment, index ,toggleReplyComments}) {

    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleReplyButtonClick = () => {
        setShowReplyForm(!showReplyForm);
    };
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const handleUpdateClick = () => {
        setShowUpdateForm(!showUpdateForm);
    };

    const deleteComment = (rbc_idx) => {
        axiosIns.delete(`/api/review/D1/comment/${rbc_idx}`)
            .then(res => {
                console.log(res.data);  // 성공 메시지 출력
               // fetchreviewcomment();  // 댓글 삭제 후 댓글 목록을 다시 불러옴
                window.location.reload()
            })
            .catch(err => console.log(err));
    }

    const handleDeleteClick = () => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteComment(comment.reviewcommentdto.rbc_idx);
        }
    };


    const timeForToday = (value) => {
        if (!value) {
            return '';
        }

        const valueConv = value.slice(0, -10);
        const today = new Date();
        const timeValue = new Date(valueConv);

        // timeValue를 한국 시간대로 변환
        const timeValueUTC = new Date(timeValue.toISOString());
        const offset = timeValue.getTimezoneOffset() * 60 * 1000; // 분 단위를 밀리초 단위로 변환
        const timeValueKST = new Date(timeValueUTC.getTime() - offset);


        const betweenTime = Math.floor((today.getTime() - timeValueKST.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금 전';
        if (betweenTime < 60) {
            return `${betweenTime}분 전`;
        }
        //console.log(betweenTime);

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간 전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 8) {
            return `${betweenTimeDay}일 전`;
        }

        const year = String(timeValue.getFullYear()).slice(0, 4);
        const month = String(timeValue.getMonth() + 1).padStart(2, '0');
        const day = String(timeValue.getDate()).padStart(2, '0');

        const formattedDateWithoutTime = `${year}-${month}-${day}`;

        return formattedDateWithoutTime;
    };

    return (
        <div className="review-detail-comments-all"  key={index}>
            <div className="review-detail-commnets-detail-">
                <div className="review-detail-commnets-detail-1">
                    <div className="review-detail-commnets-detail-2">{comment.nickname}</div>
                    <div className="review-detail-commnets-detail-3">
                        <span>{timeForToday(comment.reviewcommentdto.rbc_writeday)}{` · `}</span>
                        {/*<span className="span">{`수정됨 `}</span>*/}
                    </div>
                </div>
                <img
                    className="review-detail-commnets-detail-icon"
                    alt=""
                    src="/review-detail-commnets-detail-info-img@2x.png"
                />
            </div>

            <div className="review-detail-commnets-all-lik">
                <div className="review-detail-commnets-all-up-" />
                <img
                    className="review-detail-commnets-all-up-icon"
                    alt=""
                    src="/review-detail-commnets-all-up-icon.svg"
                />
                <div className="review-detail-commnets-all-lik1">
                    <div className="review-detail-commnets-all-box" />
                    <div className="review-detail-commnets-all-lik2">{comment.reviewcommentdto.rbc_like}</div>
                </div>
                <div className="review-detail-commnets-all-dow" />
                <img
                    className="review-detail-commnets-all-dow-icon"
                    alt=""
                    src="/review-detail-commnets-all-down-icon.svg"
                />
            </div>

            <div className="review-detail-commnets-all-con">
                { comment.reviewcommentdto.rbc_content}
                <button onClick={handleDeleteClick}>삭제</button> &nbsp;&nbsp;
                <button onClick={handleUpdateClick}>수정</button>

            </div>
            <div className="review-detail-commnets-hide">
                {comment.replyConut != 0 ? (
                    <div className="review-detail-commnets-hide-te"
                         onClick={() => toggleReplyComments(comment.reviewcommentdto.rbc_idx)}
                    >댓글 모두 숨기기</div>
                ) : ""}
                <div className="review-detail-commnets-hide-co" onClick={handleReplyButtonClick}>댓글 쓰기</div>
                {showReplyForm && <ReviewReplyform rbc_idx={comment.reviewcommentdto.rbc_idx} rb_idx={comment.reviewcommentdto.rb_idx} />}
            </div>
        </div>
    );
}


export default ReviewCommentItem;