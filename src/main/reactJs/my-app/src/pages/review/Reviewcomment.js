import React, {useEffect, useState} from 'react';
import './style/Reviewdetail.css';
import axiosIns from "../../api/JwtConfig";
import ReviewCommentItem from "./ReviewCommentItem";
import ReplyCommentItem from "./ReplyCommentItem";



function Reviewcomment(props) {

    const [reviewcommentlist,setReviewcommentlist] =useState([]);
    const [hideReplyComments, setHideReplyComments] = useState({}); // add this line
    const [totalCount,setTotalCount]=useState('');
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchreviewcomment();
    }, []);



    const fetchreviewcomment = () => {
        axiosIns.get(`/api/review/D0/comment/${props.rb_idx}`)
            .then(res => {
                console.log(res.data);  // 서버로부터 받은 전체 응답을 출력합니다.
                console.log(res.data.reviewCommentDetailDtoList[2].replyConut);
              setTotalCount(res.data.totalCount);
                setReviewcommentlist(res.data.reviewCommentDetailDtoList);  // "reviewCommentDetailDtoList"라는 이름의 배열을 사용한다고 가정
            })
            .catch(err => console.log(err));
    }


    const toggleReplyComments = (rbc_idx) => { // props.rbc_idx가 아니라 함수 인자 rbc_idx를 사용
        // console.log(rbc_idx)
        setHideReplyComments(prevState => ({
            ...prevState,
            [rbc_idx]: !prevState[rbc_idx]
        }));
    };



    return(

        <div className="review-detail-commnets">
            <div className="review-detail-comments-counts">{totalCount}개의 댓글</div>
            {reviewcommentlist.map((comment, index) => (
                <React.Fragment key={index}>
                    <ReviewCommentItem comment={comment} index={index} rbc_idx={comment.reviewcommentdto.rbc_idx} toggleReplyComments={toggleReplyComments}  />
                    {!hideReplyComments[comment.reviewcommentdto.rbc_idx] && comment.replyList && comment.replyList.filter(reply => reply.rbc_ref === comment.reviewcommentdto.rbc_idx).map((reply, replyIndex) => (
                        <ReplyCommentItem reply={reply} replyIndex={replyIndex}   />
                    ))}

                </React.Fragment>
            ))}
        </div>
    );
}

export default Reviewcomment;