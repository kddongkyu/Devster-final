import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { setImgDetail, setSelectedMessage } from '../../redux/devChat';

function Message({ item }) {
    const dispatch = useDispatch();
    const date = new Date(item.date);
    const msgTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    const uploadTime = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const timeString = date.toLocaleTimeString('ko-KR', msgTime);
    const msgImgUrl = process.env.REACT_APP_CHATIMG;
    const msgImgDir = date.toLocaleDateString('ko-KR', uploadTime).replace(/\. /g, '').replace('.', '');
    const userImg = process.env.REACT_APP_PHOTO + 'member/';

    const userName = useSelector(state => state.devChat.userName);

    const handleOnImgDetail = (detailImg) => {
        dispatch(setImgDetail(true));
        dispatch(setSelectedMessage(detailImg));
    }


    if (item?.type === 'READ_MARKER') {
        return (
            <div className='chat-body-readmarker'>
                    <img alt='' src={require('./assets/chat_bookmark.svg').default}/>
            </div>
        );
    } else {
        if (item?.type === 'CHAT') {
            return (
                item.userName === userName ?
                    <div>
                        {
                            item.msgImg.length > 0 &&
                            <div className='chat-img-container'>
                                <div className='chat-img-slice'>
                                    {
                                        item.msgImg.slice(0, 1).map((url, idx) => (
                                            <img
                                                key={idx}
                                                alt=''
                                                src={`${msgImgUrl}${msgImgDir}/${url}`}
                                                className='chat-msg-sended-preview'
                                                onClick={() => handleOnImgDetail(item)}
                                            />
                                        ))
                                    }
                                    <div className='chat-img-time'>{timeString}</div>
                                </div>
                                <div className='chat-img-more-pic'>
                                    {
                                        item.msgImg.length > 1 &&
                                        <span>
                                            <CameraAltOutlinedIcon fontSize='large' />+{item.msgImg.length}
                                        </span>
                                    }
                                </div>
                            </div>
                        }
                        {
                            item.msg &&
                            <div className='chat-body-msg-s'>
                                <div className='chat-body-msg-s-date'>{timeString}</div>
                                <div className='chat-body-msg-s1'>
                                    <div className='chat-body-msg-s-box'>
                                        {
                                            item.msg.length > 200 ? <><div>{item.msg.substring(0, 200)}...</div>
                                                <button>전체보기</button></> :
                                                <div>{item.msg}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        {
                            item.msgImg.length > 0 &&
                            <div className='chat-img-container-left'>
                                <div className='chat-img-slice-left'>
                                    {
                                        item.msgImg.slice(0, 1).map((url, idx) => (
                                            <img
                                                key={idx}
                                                alt=''
                                                src={`${msgImgUrl}${msgImgDir}/${url}`}
                                                className='chat-msg-sended-preview'
                                                onClick={() => handleOnImgDetail(item)}
                                            />
                                        ))
                                    }
                                    <div className='chat-img-time-left'>{timeString}</div>
                                </div>
                                <div className='chat-img-more-pic-left'>
                                    {
                                        item.msgImg.length > 1 &&
                                        <span>
                                            <CameraAltOutlinedIcon fontSize='large' />+{item.msgImg.length}
                                        </span>
                                    }
                                </div>
                            </div>
                        }
                        {
                            item.msg &&
                            <div className='chat-body-msg-r'>
                                {
                                    item.userProfile ?
                                        <img
                                            alt=''
                                            className='chat-body-msg-r-img'
                                            src={`${userImg}${item.userProfile}`}
                                        />
                                        :
                                        <img
                                            alt=''
                                            className='chat-body-msg-r-img'
                                            src={require('./assets/logo_profile.svg').default}
                                        />
                                }
                                <div className='chat-body-msg-r-id'>{item.userName}</div>
                                <div className='chat-body-msg-r-parent'>
                                    <div className='chat-body-msg-r1'>
                                        <div className='chat-body-msg-r-box'>
                                            {
                                                item.msg.length > 200 ? <><div>{item.msg.substring(0, 200)}...</div>
                                                    <button>전체보기</button></> :
                                                    <div>{item.msg}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className='chat-body-msg-r-date'>{timeString}</div>
                                </div>
                            </div>
                        }
                    </div>
            );
        } else if (item?.type === 'ENTER') {
            return (
                <div className='chat-body-msg-stats'>
                    <div className='chat-body-user-stat' />
                    <div className='chat-body-user-stat-text'>
                        {item.msg}
                    </div>
                </div>
            );
        } else if (item?.type === 'EXIT') {
            return (
                <div className='chat-body-msg-stats'>
                    <div className='chat-body-user-stat' />
                    <div className='chat-body-user-stat-text'>
                        {item.msg}
                    </div>
                </div>
            )
        }
    }
}

export default React.memo(Message);