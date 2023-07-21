import React, {useRef, useState} from 'react';
import axios from 'axios';
import {jwtHandleError} from '../../../../api/JwtHandleError';
import ResizeCrop from './ResizeCrop';

function InputUpload(props) {
    const profileRef = useRef();
    const [savedImg, setSavedImg] = useState(null);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [cropImg, setCropImg] = useState(null);

    const photoUrl = process.env.REACT_APP_MEMBERURL;

    const uploadProfileImg = async (e) => {
        const file = e.target.files[0];
        const fileExtention = file?.name.split('.').pop().toLowerCase();
        if (!fileExtention || !['png', 'jpg', 'jpeg'].includes(fileExtention)) {
            alert('.png, .jpg, .jpeg 파일만 업로드 가능합니다.');
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
            alert('사진 업로드에 실패했습니다.\n잠시후 다시 시도해주세요.');
            console.error('사진 업로드 실패' + error.response?.status);
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
                alert('사진 초기화에 실패했습니다.\n잠시후 다시 시도해주세요.');
                console.error('사진 초기화 실패' + error.response?.status);
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
                    accept='.png,.jpg,.jpeg'
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