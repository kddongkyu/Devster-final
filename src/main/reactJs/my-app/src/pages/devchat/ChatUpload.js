import { useSnackbar } from 'notistack';
import React, { useCallback, useRef } from 'react';
import ToastAlert from '../../api/ToastAlert';

function ChatUpload({ imgArr, setImgArr }) {
    const uploadRef = useRef();
    const {enqueueSnackbar} = useSnackbar();
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
                toastAlert('이미지만','warning');
                return false;
            }
        }

        if (files.length + imgArr.length > 10) {
            toastAlert('안돼','warning');
            return false;
        }

        if (totalSize(files) + totalSize(imgArr) >= 1024 * 1024 * 50) {
            toastAlert('용량','warning');
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
            />
            <div>
                {
                    imgArr.map((img, idx) => (
                        <div key={idx} style={{ float: 'left' }}>
                            <img
                                alt=''
                                src={URL.createObjectURL(img)}
                                style={{ width: '100px' }}
                            />
                            <button onClick={() => handleOnImgDelete(idx)}>delete</button>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default ChatUpload;