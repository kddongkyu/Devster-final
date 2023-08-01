import React, {useEffect, useState} from 'react';
import axiosIns from "../../../api/JwtConfig";
import '../style/AboardDetail.css';
import {jwtHandleError} from "../../../api/JwtHandleError";
import ToastAlert from "../../../api/ToastAlert";
import {useSnackbar} from "notistack";
import AboardReplyCommentitem from "./AboardReplyCommentitem";
import AboardCommentitem from "./AboardCommentitem";

function AboardComment(props) {
    const [AboardCommentList,setAboardCommentList] =useState([]);
    const [hideAboardComments, setHideAboardComments] = useState({}); // add this line
    const [totalCount,setTotalCount]=useState('');

    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        fetchAboardComment();
    }, []);



    const fetchAboardComment = () => {
        axiosIns.get(`/api/academyboard/D0/comment/${props.ab_idx}`)
            .then(res => {
                setTotalCount(res.data.totalCount);
                setAboardCommentList(res.data.academyCommentDetailDtoList);  // "reviewCommentDetailDtoList"라는 이름의 배열을 사용한다고 가정
            })
            .catch(err => jwtHandleError(err, toastAlert));
    }


    const toggleReplyComments = (abc_idx) => { // props.rbc_idx가 아니라 함수 인자 rbc_idx를 사용
        setHideAboardComments(prevState => ({
            ...prevState,
            [abc_idx]: !prevState[abc_idx]
        }));
    };



    return (
        <div className="aboard-detail-commnets">
            <div className="aboard-detail-comments-counts">{totalCount}개의 댓글</div>
            {AboardCommentList.map((comment, index) => {
                return (
                    <React.Fragment key={index}>
                        <AboardCommentitem comment={comment} index={index} qbc_idx={comment.academyCommentDto.abc_idx} toggleReplyComments={toggleReplyComments}  />
                        {!hideAboardComments[comment.academyCommentDto.abc_idx] && comment.replyList && comment.replyList.map((reply, replyIndex) => (
                            <AboardReplyCommentitem reply={reply} replyIndex={replyIndex}  />
                        ))}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default AboardComment;