import React, {useEffect, useState} from 'react';
import '../message/style/Message.css'
import axiosIns from "../../api/JwtConfig";
import {useNavigate, useParams} from "react-router-dom";
import { jwtHandleError } from "../../api/JwtHandleError";
import toastAlert from '../../api/ToastAlert';


function MessageDetail(props) {

    const photoUrl = process.env.REACT_APP_MEMBERURL;
    const navi = useNavigate();

    const [messageDetail, setMessageDetail] = useState(null);
    const { mes_idx } = useParams();  // URL 파라미터를 가져옵니다.

    const getMessageDetail = ()=>{
        const url = `/api/message/D1/${mes_idx}`
        axiosIns.get(url)
            .then(response =>{
                setMessageDetail(response.data);
            })
    }

    const deleteMessage = () => {
        if (window.confirm('해당 쪽지를 삭제하시겠습니까?')) {
            axiosIns.delete(`/api/message/D1/${mes_idx}`)
                .then(response => {
                    window.location.href="/message";
                })
                .catch(error => {
                    jwtHandleError(error, toastAlert);

                });
        }
    };

    const setMemberPhotoUrl = (value) => {
        if (!value) {
            return require("./assets/logo_profile.svg").default;
        }
        const photoUrl = process.env.REACT_APP_PHOTO + "member/";
        const srcUrl = photoUrl + value;

        return srcUrl;
    };

    useEffect(()=> {
        getMessageDetail();
    },[])

    return (
        <div className="detail-outside">
            <div className="textmsg-preview" style={{ borderBottom: "1px solid black" }}>
                {messageDetail && (
                    <div className="textmsg-preview-box" >
                        <img className="textmsg-preview-img" alt={`${messageDetail.send_nick}의 프로필 사진`}
                             src={messageDetail.send_nick_photo ?  `${photoUrl}${messageDetail.send_nick_photo}`
                                 : require("./assets/logo_profile.svg").default}
                        />
                        <b className="textmsg-preview-subject">{messageDetail.subject}</b>
                        <div className="textmsg-preview-id">{messageDetail.send_nick}</div>
                        <div className="textmsg-preview-date">{messageDetail.send_time}</div>
                    </div>
                )}
            </div>
            <div className="textmsg-detail-box">
                {messageDetail && (
                    <pre>{messageDetail.content}</pre>
                )}
            </div>
            <div className="button-container">
                <button className="delete-button" onClick={()=>deleteMessage()}>삭제</button>
                <button className="list-button" onClick={()=>{
                    window.location.href = "/message";
                }}>목록</button>
                <button className="responese-button" onClick={()=>{
                    navi(`/message/form/${messageDetail.send_nick}`);
                }}>답장</button>
            </div>
        </div>
    );

}

export default MessageDetail;