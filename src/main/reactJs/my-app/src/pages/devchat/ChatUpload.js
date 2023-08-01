import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import ToastAlert from '../../api/ToastAlert';

function ChatUpload({ imgArr, setImgArr, uploadRef, isUploadOpen, setIsUploadOpen }) {
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const handleOnUpload = useCallback((e) => {
        let files = e.target.files;
        if (!imgValid(files, imgArr)) {
            resetImgInput();
            return;
        } else {
            const data = Array.from(files);
            setImgArr(imgArr => [...imgArr, ...data]);
            resetImgInput();
        }
    }, [imgArr, setImgArr]);

    const handleOnImgDelete = useCallback((idx) => {
        setImgArr(imgArr.filter((item, i) => i !== idx));
    }, [imgArr, setImgArr]);

    const imgValid = (files, imgArr) => {
        if (!files) {
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            if (files[i].type.indexOf('image') < 0) {
                toastAlert('이미지만 업로드 가능합니다.', 'warning');
                return false;
            }
        }

        if (files.length + imgArr.length > 10) {
            toastAlert('10장 이하 이미지만 업로드 가능합니다.', 'warning');
            return false;
        }

        if (totalSize(files) + totalSize(imgArr) >= 1024 * 1024 * 50) {
            toastAlert('1회 업로드용량이 초과되었습니다. (50MB)', 'warning');
            return false;
        }
        return true;
    }

    const totalSize = (files) => {
        let totalSize = 0;
        for (let i = 0; i < files.length; i++) {
            totalSize += files[i].size;
        }
        return totalSize;
    }

    const resetImgInput = () => {
        uploadRef.current.value = '';
    }

    return (
        <>
            <input
                type='file'
                ref={uploadRef}
                onChange={handleOnUpload}
                accept='image/*'
                multiple
                hidden
            />
            {
                isUploadOpen && imgArr.length > 0 &&
                <div className="chat-upload-box">
                    {
                        imgArr.map((img, idx) => (
                            <div
                                key={idx}
                                className='chat-upload-preivew-box'
                            >
                                <img
                                    alt=''
                                    src={URL.createObjectURL(img)}
                                    className='chat-upload-preivew'
                                />
                                <img
                                    alt=''
                                    src={require('./assets/chat_upload_del.svg').default}
                                    className='chat-upload-del'
                                    onClick={() => handleOnImgDelete(idx)}
                                />
                            </div>
                        ))
                    }
                </div>
            }
        </>
    );
}

export default ChatUpload;