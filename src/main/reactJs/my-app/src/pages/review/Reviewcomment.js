import React, {useEffect, useState} from 'react';
import './style/Reviewdetail.css';
import axiosIns from "../../api/JwtConfig";
import ReviewCommentItem from "./ReviewCommentItem";
import ReplyCommentItem from "./ReplyCommentItem";
import toastAlert from "../../api/ToastAlert";
import {jwtHandleError} from "../../api/JwtHandleError";


function Reviewcomment(props) {

    const [reviewcommentlist,setReviewcommentlist] =useState([]);
    const [hideReplyComments, setHideReplyComments] = useState({}); // add this line
    const [totalCount,setTotalCount]=useState('');
    useEffect(() => {
        fetchreviewcomment();
    }, []);



    const fetchreviewcomment = () => {
        axiosIns.get(`/api/review/D0/comment/${props.rb_idx}`)
            .then(res => {
                setTotalCount(res.data.totalCount);
                setReviewcommentlist(res.data.reviewCommentDetailDtoList);  // "reviewCommentDetailDtoList"라는 이름의 배열을 사용한다고 가정
            })
            .catch(err => jwtHandleError(err, toastAlert));
    }


    const toggleReplyComments = (rbc_idx) => { // props.rbc_idx가 아니라 함수 인자 rbc_idx를 사용
        setHideReplyComments(prevState => ({
            ...prevState,
            [rbc_idx]: !prevState[rbc_idx]
        }));
    };



    return(

        <div className="review-detail-commnets">
            <div className="review-detail-comments-counts">{totalCount}개의 댓글</div>
            {reviewcommentlist.map((comment, index) => {
                return (
                    <React.Fragment key={index}>
                        <ReviewCommentItem comment={comment} index={index} rbc_idx={comment.reviewcommentdto.rbc_idx} toggleReplyComments={toggleReplyComments}  />
                        {!hideReplyComments[comment.reviewcommentdto.rbc_idx] && comment.replyList && comment.replyList.map((reply, replyIndex) => (
                            <ReplyCommentItem reply={reply} replyIndex={replyIndex}  />
                        ))}
                    </React.Fragment>
                );
            })}
        </div>

    );
}

export default Reviewcomment;