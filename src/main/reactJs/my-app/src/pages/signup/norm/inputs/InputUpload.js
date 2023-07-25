import React, {useRef, useState} from 'react';
import axios from 'axios';
import {ResizeCrop} from "./index";
import {jwtHandleError} from "../../../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";

function InputUpload(props) {
    const profileRef = useRef();
    const [savedImg, setSavedImg] = useState(null);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [cropImg, setCropImg] = useState(null);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const photoUrl = process.env.REACT_APP_MEMBERURL;

    const uploadProfileImg = async (e) => {
        const file = e.target.files[0];
        if(!file) {
            return;
        }
        const fileExtention = file?.name.split('.').pop().toLowerCase();
        if (!fileExtention || !['png', 'jpg', 'jpeg'].includes(fileExtention)) {
            toastAlert('.png, .jpg, .jpeg 파일만 업로드 가능합니다.','warning');
            resetFileInput();
            return;
        }

        let formData = new FormData();
        formData.append('upload', file);
        try {
            const res = await axios({
                method: 'post',
                url: '/api/member/D0/photo',
                data: formData,
                headers: {'Content-type': 'multipart/form-data'}
            });

            if (res?.status === 200) {
                setSavedImg(res.data);
                setCropImg(URL.createObjectURL(file));
            }
        } catch (error) {
            jwtHandleError(error,toastAlert);
        }
    }

    const setDefaultImg = async () => {
        if (savedImg == null) {
            return;
        } else {
            try {
                const res = await axios({
                    method: 'put',
                    url: '/api/member/D0/photo/reset',
                    data: {'photo': savedImg},
                    headers: {'Content-type': 'application/json'}
                });

                if (res?.status === 200) {
                    setSavedImg(null);
                    resetFileInput();
                }
            } catch (error) {
                jwtHandleError(error,toastAlert);
            }
        }
    }

    const resetFileInput = () => {
        profileRef.current.value = '';
    }

    const openCropModal = () => {
        setIsCropOpen(true);
    }

    return (
        <div>
            <div className='signup-guest-profile'>
                <div className='signup-guest-profile-text'>프로필 사진</div>
                <img
                    className={`${!savedImg ? 'signup-guest-crop-icon-none' : 'signup-guest-crop-icon'}`}
                    alt=''
                    src={require('../../assets/signup_guest_crop_icon.svg').default}
                    onClick={openCropModal}
                />
                <div className='signup-guest-profile-img'>
                    <img alt='프로필 이미지'
                         src={`${!savedImg ? require('../../assets/signup_default_img.svg').default : `${photoUrl}${savedImg}`}`}
                    />
                </div>
                <input
                    type='file'
                    hidden
                    accept='image/*'
                    ref={profileRef}
                    onChange={uploadProfileImg}
                />

            </div>
            <div className='signup-guest-upload-profile'>
                <div className='signup-guest-upload-profile-im'
                     onClick={() => {
                         profileRef.current.click()
                     }}
                >
                    <div className='signup-guest-upload-profile-im1'/>
                    <div className='signup-guest-upload-profile-im2'>파일 선택</div>
                    <img
                        className='signup-guest-upload-profile-im-icon'
                        alt=''
                        src={require('../../assets/signup_guest_upload_profile_img_icon.svg').default}
                    />
                </div>
                <div
                    className='signup-guest-upload-profile-de'
                    onClick={setDefaultImg}
                >
                    <div className='signup-guest-upload-profile-de1'/>
                    <div className='signup-guest-upload-profile-de2'>
                        기본 이미지로 설정
                    </div>
                    <img
                        className='signup-guest-upload-profile-de-icon'
                        alt=''
                        src={require('../../assets/signup_guest_upload_profile_default_icon.svg').default}
                    />
                </div>
            </div>
            <ResizeCrop
                isCropOpen={isCropOpen}
                setIsCropOpen={setIsCropOpen}
                cropImg={cropImg}
                setSavedImg={setSavedImg}
            />
        </div>
    );
}

export default InputUpload;