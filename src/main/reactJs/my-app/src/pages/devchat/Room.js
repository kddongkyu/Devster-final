import React, { useEffect, useRef, useState } from 'react';
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
import ImgDetail from './ImgDetail';

function Room(props) {
    const dispatch = useDispatch();
    const hidden = useSelector(state => state.devChat.hidden);
    const imgDetail = useSelector(state => state.devChat.imgDetail);
    const modalOpen = useSelector(state => state.devChat.modalOpen);
    const sendingMsg = useSelector(state => state.devChat.sendingMsg);
    const roomName = useSelector(state => state.devChat.roomName);
    const userName = useSelector(state => state.devChat.userName);
    const userProfile = useSelector(state => state.devChat.userProfile);
    const peopleCount = useSelector(state => state.devChat.peopleCount);
    const msg = useSelector(state => state.devChat.msg);
    const [imgArr, setImgArr] = useState([]);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [UploadProgress, setUploadProgress] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const messageEndRef = useRef(null);
    const uploadRef = useRef();
    const textArea = useRef();

    useEffect(() => {
        if (!hidden && modalOpen) {
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [msg]);

    const msgSend = async () => {
        if (!sendingMsg.trim() && imgArr.length === 0) {
            return;
        } else {
            let imgUrl = [];
            if (imgArr.length > 0) {
                document.getElementById('chat-input').blur();
                setUploadProgress(true);
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
                        setUploadProgress(false);
                    }
                } catch (error) {
                    jwtHandleError(error, toastAlert);
                }
            }

            dispatch(removeMarker());
            dispatch(wsPublish({
                type: 'CHAT',
                userName: userName,
                msg: sendingMsg ? sendingMsg.replace(/\n{2,}/g, '\n') : '',
                msgImg: imgUrl,
                userProfile: userProfile,
            }));
            dispatch(setSendingMsg(''));
            setImgArr([]);
            textArea.current.style.height = '5.5rem';
        }
    }

    const enterKey = (e) => {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile && !UploadProgress && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            msgSend();
        } else if (isMobile && !UploadProgress && e.key === 'Enter') {
        }
    }

    const handleMinimize = () => {
        dispatch(setHidden(true));
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
                <ChatList />
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
                {
                    msg.map((item, idx) => {
                        return (
                            <Message key={idx} item={item} />
                        )
                    })
                }
                <div ref={messageEndRef} />
            </div>
            <div className={`chat-footer ${UploadProgress ? 'disabled-footer' : ''}`}>
                {
                    UploadProgress &&
                    <div className='disabled-overlay'>
                        <div className='chat-footer-inprogress'></div>
                    </div>
                }
                <div
                    className='chat-footer-upload-btn'
                    onClick={() => {
                        uploadRef.current.click()
                        setIsUploadOpen(true);
                    }}
                >
                    <img
                        className='chat-footer-upload-icon'
                        alt=''
                        src={require('./assets/chat_footer_upload_icon.svg').default}
                    />
                </div>
                <textarea
                    type='text'
                    className='chat-footer-send-box'
                    id='chat-input'
                    ref={textArea}
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
                <ChatUpload
                    imgArr={imgArr}
                    setImgArr={setImgArr}
                    uploadRef={uploadRef}
                    isUploadOpen={isUploadOpen}
                    setIsUploadOpen={setIsUploadOpen}
                />
                {
                    imgDetail &&
                    msg.map((item,idx)=> {
                        return (
                            <ImgDetail key={idx} item={item}/>
                        )
                    })
                    
                }
            </div>
        </div>
    );
}

export default Room;