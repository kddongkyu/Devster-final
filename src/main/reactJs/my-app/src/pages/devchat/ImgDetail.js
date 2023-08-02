import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImgDetail } from '../../redux/devChat';

function ImgDetail({idx, item}) {
    const dispatch = useDispatch();
    const imgDetail = useSelector(state => state.devChat.imgDetail);

    const handleOnCloseDetail = () => {
        dispatch(setImgDetail(false));
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
                    {console.log(item)}
                </div>
            </div>

        </div>
    );
}

export default ImgDetail;