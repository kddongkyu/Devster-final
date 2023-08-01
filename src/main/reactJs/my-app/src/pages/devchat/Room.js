import React, { useRef, useState } from 'react';
import Message from './Message';
import './style/Room.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeMarker, setHidden, setSendingMsg, wsPublish } from '../../redux/devChat';
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
    const userProfile = useSelector(state => state.devChat.userProfile);
    const peopleCount = useSelector(state => state.devChat.peopleCount);
    const msg = useSelector(state => state.devChat.msg);
    const [imgArr, setImgArr] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const uploadRef = useRef();

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
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            msgSend();
        }
    }

    const handleMinimize = () => {
        dispatch(setHidden(true));
        document.body.style.overflow = 'auto';
    }

    const handleOnMsgInput = (e) => {
        dispatch(setSendingMsg(e.target.value));
    }

    return (
        <div className='moblie-chat'>
            <div className='chat-header'>
                <div className='chat-header-box' />
                <b className='chat-header-acaname'>{roomName.length > 14 ? roomName.slice(0, 14).concat('...') : roomName}</b>
                <img
                    className='chat-header-ppls-icon'
                    alt=''
                    src={require('./assets/chat_header_ppls_icon.svg').default}
                />
                <b className='chat-header-ppls'>{peopleCount}</b>
                <img
                    className='chat-header-menu-icon'
                    alt=''
                    src={require('./assets/chat_header_menu.svg').default}
                />
                <div
                    onClick={handleMinimize}
                >
                    <img
                        className='chat-header-close-icon'
                        alt=''
                        src={require('./assets/chat_header_close.svg').default}
                    />
                </div>
            </div>
            <div className='chat-body'>
                <div className='chat-body-box' />
                {
                    msg.map((item, idx) => {
                        return (
                            <Message key={idx} item={item} />
                        )
                    })
                }
            </div>
            <div>
                <div
                    onClick={() => uploadRef.current.click()}
                >
                    {/* <img
                        className='chat-footer-upload-icon'
                        alt=''
                        src={require('./assets/chat_footer_upload_icon.svg').default}
                    /> */}
                </div>
                <textarea
                    type='text'
                    className='chat-footer-send-box'
                    value={sendingMsg}
                    onKeyDown={enterKey}
                    onChange={handleOnMsgInput}
                />
                <div
                    className='chat-footer-send'
                    onClick={msgSend}
                >
                    <div className='chat-footer-send-btn' />
                    <img
                        className='sf-symbol-arrowtriangletur'
                        alt=''
                        src={require('./assets/chat_footer_send.svg').default}
                    />
                </div>
            </div>
            {/* <ChatList /> */}
            <ChatUpload
                imgArr={imgArr}
                setImgArr={setImgArr}
                uploadRef={uploadRef}
            />
        </div>
    );
}

export default Room;