import React, {useEffect, useState} from 'react';
import '../style/QboardDetail.css';
import axiosIns from "../../../api/JwtConfig";
import {jwtHandleError} from "../../../api/JwtHandleError";
import ToastAlert from "../../../api/ToastAlert";
import {useSnackbar} from "notistack";
import QboardCommentItem from "./QboardCommentItem";
import QboardReplyCommentItem from "./QboardReplyCommentItem";





function QboardComment(props) {

    const [QboardCommentList,setQboardCommentList] =useState([]);
    const [hideQboardComments, setHideQboardComments] = useState({}); // add this line
    const [totalCount,setTotalCount]=useState('');

    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        fetchQboardComment();
    }, []);



    const fetchQboardComment = () => {
        axiosIns.get(`/api/qboard/D0/comment/${props.qb_idx}`)
            .then(res => {
                console.log(res.data);  // 서버로부터 받은 전체 응답을 출력합니다.
                setTotalCount(res.data.totalCount);
                setQboardCommentList(res.data.qboardCommentDetailDtoList);  // "reviewCommentDetailDtoList"라는 이름의 배열을 사용한다고 가정
            })
            .catch(err => jwtHandleError(err, toastAlert));
    }


    const toggleReplyComments = (qbc_idx) => { // props.rbc_idx가 아니라 함수 인자 rbc_idx를 사용
        // console.log(rbc_idx)
        setHideQboardComments(prevState => ({
            ...prevState,
            [qbc_idx]: !prevState[qbc_idx]
        }));
    };



    return(

        <div className="qboard-detail-commnets">
            <div className="qboard-detail-comments-counts">{totalCount}개의 댓글</div>
            {QboardCommentList.map((comment, index) => {
                return (
                    <React.Fragment key={index}>
                        <QboardCommentItem comment={comment} index={index} qbc_idx={comment.qboardCommentDto.qbc_idx} toggleReplyComments={toggleReplyComments}  />
                        {!hideQboardComments[comment.qboardCommentDto.qbc_idx] && comment.replyList && comment.replyList.map((reply, replyIndex) => (
                            <QboardReplyCommentItem reply={reply} replyIndex={replyIndex}  />
                        ))}
                    </React.Fragment>
                );
            })}
        </div>

    );
}

export default QboardComment;