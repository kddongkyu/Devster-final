import React, { useState } from 'react';
import Message from "./Message";
import './style/Room.css'
import { useDispatch, useSelector } from "react-redux";
import { removeMarker, setSendingMsg, wsPublish } from "../../redux/devChat";
import ChatUpload from './ChatUpload';
import axiosIns from '../../api/JwtConfig';
import { jwtHandleError } from '../../api/JwtHandleError';
import { useSnackbar } from 'notistack';
import ToastAlert from '../../api/ToastAlert';
import ChatList from './ChatList';

function Room(props) {
    const dispatch = useDispatch();
    const sendingMsg = useSelector(state => state.devChat.sendingMsg);
    const roomName = useSelector(state => state.devChat.roomName);
    const userName = useSelector(state => state.devChat.userName);
    const userProfile=useSelector(state=>state.devChat.userProfile);
    const peopleCount = useSelector(state => state.devChat.peopleCount);
    const msg = useSelector(state => state.devChat.msg);
    const [imgArr, setImgArr] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const msgSend = async () => {
        if (!sendingMsg.trim() && imgArr.length === 0) {
            return;
        } else {
            let imgUrl = [];
            if (imgArr.length > 0) {
                const formData = new FormData();
                for (let i = 0; i < imgArr.length; i++) {
                    formData.append('upload', imgArr[i]);
                }

                try {
                    const res = await axiosIns({
                        method: 'post',
                        url: '/api/devchat/D1/upload',
                        data: formData,
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });

                    if (res?.status === 200) {
                        imgUrl = res.data;
                    }
                } catch (error) {
                    jwtHandleError(error, toastAlert);
                }
            }

            dispatch(removeMarker());
            dispatch(wsPublish({
                type: 'CHAT',
                userName: userName,
                msg: sendingMsg ? sendingMsg : '',
                msgImg: imgUrl,
                userProfile: userProfile,
            }));
            dispatch(setSendingMsg(''));
            setImgArr([]);
        }
    }

    const enterKey = (e) => {
        if (e.key === 'Enter') {
            msgSend();
        }
    }

    const handleOnMsgInput = (e) => {
        dispatch(setSendingMsg(e.target.value));
    }

    return (
        <div>
            <h1>{roomName}</h1>
            <h1>{peopleCount}</h1>
            <ChatList />
            <div id='chats' style={{
                width: '500px',
                height: '400px',
                border: '1px solid',
                overflowY: 'auto'
            }}>
                {
                    msg.map((item, idx) => {
                        return (
                            <Message key={idx} item={item} />
                        )
                    })
                }
            </div>
            <div id='tooldbox'>
                <ChatUpload imgArr={imgArr} setImgArr={setImgArr} />
                <input placeholder='보낼메세지'
                    value={sendingMsg}
                    onKeyUp={enterKey}
                    onChange={handleOnMsgInput}
                />
                <button onClick={msgSend}>전송</button>
            </div>





            <div className="moblie-chat-room">
                <div className="chat-header">
                    <div className="chat-header-box" />
                    <b className="chat-header-acaname">강남비트캠프701호일이삼사</b>
                    <b className="chat-header-ppls">(12345)</b>
                    <img
                        className="chat-header-close-icon"
                        alt=""
                        src="/chat-header-close.svg"
                    />
                </div>
                <div className="chat-body">
                    <div className="chat-body-msg-r">
                        <div className="chat-body-msg-r-img" />
                        <div className="chat-body-msg-r-id">비트캠프 야붕이</div>
                        <div className="chat-body-msg-r1">
                            <div className="chat-body-msg-r-box" />
                            <div className="chat-body-msg-r-text">
                                ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ
                            </div>
                        </div>
                        <div className="chat-body-msg-r-date">오전 12:32</div>
                    </div>
                    <div className="chat-body-msg-s">
                        <div className="chat-body-msg-s1">
                            <div className="chat-body-msg-s-box" />
                            <div className="chat-body-msg-s-text">
                                ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ
                            </div>
                        </div>
                        <div className="chat-body-msg-s-date">오전 12:36</div>
                    </div>
                </div>
                <div className="chat-footer">
                    <img
                        className="chat-footer-upload-icon"
                        alt=""
                        src="/chat-footer-upload.svg"
                    />
                    <div className="chat-footer-input">
                        <div className="chat-footer-input-box" />
                        <div className="chat-footer-input-text">
                            ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                        </div>
                    </div>
                    <div className="chat-footer-send">
                        <div className="chat-footer-send-btn" />
                        <img
                            className="chat-footer-send-icon"
                            alt=""
                            src="/chat-footer-send-icon.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room;