import React, {useRef, useState} from 'react';
import axios from 'axios';
import {jwtHandleError} from '../../../../api/JwtHandleError';
import ResizeCrop from '../ResizeCrop';

function InputUpload(props) {
    const profileRef = useRef();
    const [savedImg, setSavedImg] = useState(null);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [cropImg, setCropImg] = useState(null);

    const photoUrl = process.env.REACT_APP_MEMBERURL;

    const uploadProfileImg = (e) => {
        const file = e.target.files[0];
        const fileExtention = file?.name.split('.').pop().toLowerCase();
        if (fileExtention === undefined || fileExtention === null || fileExtention === '') {
            return;
        } else if (fileExtention !== 'png' && fileExtention !== 'jpg' && fileExtention !== 'jpeg') {
            alert('.png, .jpg, .jpeg 파일만 업로드 가능합니다.');
            return;
        }

        let formData = new FormData();
        formData.append('upload', file);

        axios({
            method: 'post',
            url: '/api/member/D0/photo',
            data: formData,
            headers: {'Content-type': 'multipart/form-data'}
        })
            .then(res => {
                setSavedImg(res.data);
                setCropImg(URL.createObjectURL(file));
            })
            .catch((error) => {
                jwtHandleError(error);
            });
    }

    const setDefaultImg = () => {
        if (savedImg == null) {
            return false;
        } else {
            axios({
                method: 'put',
                url: '/api/member/D0/photo/reset',
                data: {'photo': savedImg},
                headers: {'Content-type': 'application/json'}
            })
                .then(res => {
                    setSavedImg(null);
                })
                .catch((error) => {
                    jwtHandleError(error);
                });
        }
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
                    accept='.png,.jpg,.jpeg'
                    ref={profileRef}
                    onChange={uploadProfileImg}
                />

            </div>
            <div className='signup-guest-upload-profile'>
                <div className='signup-guest-upload-profile-im'>
                    <div className='signup-guest-upload-profile-im1'/>
                    <div
                        className='signup-guest-upload-profile-im2'
                        onClick={() => {
                            profileRef.current.click()
                        }}
                    >파일 선택
                    </div>
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