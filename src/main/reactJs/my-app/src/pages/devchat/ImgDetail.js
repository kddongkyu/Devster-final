import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImgDetail } from '../../redux/devChat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ImgDetail(props) {
    const dispatch = useDispatch();
    const imgDetail = useSelector(state => state.devChat.imgDetail);
    const selectedMessage = useSelector(state => state.devChat.selectedMessage);
    const date = new Date(selectedMessage.date);
    const uploadTime = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const msgImgUrl = process.env.REACT_APP_CHATIMG;
    const msgImgDir = date.toLocaleDateString('ko-KR', uploadTime).replace(/\. /g, '').replace('.', '');
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleOnCloseDetail = () => {
        dispatch(setImgDetail(false));
    }

    const handleOnPrev = () => {
        if (currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
        }
        if (currentIdx === 0) {
            setCurrentIdx(selectedMessage.msgImg.length - 1)
        }
    }

    const handleOnNext = () => {
        if (currentIdx <= selectedMessage.msgImg.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
        if (currentIdx === selectedMessage.msgImg.length - 1) {
            setCurrentIdx(0);
        }
    }

    if (!imgDetail) {
        return null;
    }
    return (
        <div
            className='modal-overlay'
            onClick={handleOnCloseDetail}
        >
            <div
                className='chat-upload-detail-box'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='chat-upload-detail'>
                    <div className='chat-upload-detail-title'>
                        <div>
                            {selectedMessage.userName}
                            <span>{formattedDate}</span>
                        </div>
                        {
                            selectedMessage.msgImg.length > 1 &&
                            <div className='chat-upload-detail-btn'>
                                <div
                                    onClick={handleOnPrev}
                                    className='chat-upload-detail-arrow'
                                >
                                    <ArrowBackIcon />
                                </div>
                                <div className='chat-upload-detail-counts'>{currentIdx + 1} / {selectedMessage.msgImg.length}</div>
                                <div
                                    onClick={handleOnNext}
                                    className='chat-upload-detail-arrow'
                                >
                                    <ArrowForwardIcon />
                                </div>
                            </div>
                        }
                    </div>
                    <div className='chat-upload-detail-img-box'>
                        <img
                            className='chat-upload-detail-img'
                            src={`${msgImgUrl}${msgImgDir}/${selectedMessage.msgImg[currentIdx]}`}
                            alt=''
                        />
                    </div>
                    <div
                        className='chat-upload-detail-function'
                        onClick={handleOnCloseDetail}
                    >
                        <div>닫기</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImgDetail;