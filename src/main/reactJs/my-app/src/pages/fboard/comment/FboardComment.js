import React, {useEffect, useState} from 'react';
import axiosIns from "../../../api/JwtConfig";
import {jwtHandleError} from "../../../api/JwtHandleError";
import ToastAlert from "../../../api/ToastAlert";
import {useSnackbar} from "notistack";
import FboardCommentItem from "./FboardCommentItem";
import FboardReplyCommentItem from "./FboardReplyCommentItem";
import '../style/FboardDetail.css';

function FboardComment(props) {

    const [fboardCommentList, setFboardCommentList] = useState([]);
    const [hideFboardComments, setHideFboardComments] = useState({});
    const [totalCount, setTotalCount] = useState('');
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        fetchFboardComment();
    },[])

    const fetchFboardComment=()=>{
        axiosIns.get(`/api/fboard/D0/comment/${props.fb_idx}`)
            .then(res =>{
                setTotalCount(res.data.totalCount);
                setFboardCommentList(res.data.fboardCommentDetailDtoList);
            })
            .catch(err=>jwtHandleError(err, toastAlert));
    }
    const toggleReplyComments = (fbc_idx) => {
        setHideFboardComments(prevState => ({
            ...prevState,
            [fbc_idx]: !prevState[fbc_idx]
        }))
    }

    return (
        <div className="fboard-detail-comments">
            <div className="fboard-detail-comments-counts">{totalCount}개의 댓글</div>
            {fboardCommentList.map((comment, index) => {

                return (
                    <React.Fragment key={index}>
                        <FboardCommentItem comment={comment} index={index}
                                           fbc_idx={comment.fboardcommentdto.fbc_idx} toggleReplyComments={toggleReplyComments}  />
                        {!hideFboardComments[comment.fboardcommentdto.fbc_idx] && comment.replyList && comment.replyList.map((reply, replyIndex) => (
                            <FboardReplyCommentItem reply={reply} replyIndex={replyIndex}  />
                        ))}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default FboardComment;







