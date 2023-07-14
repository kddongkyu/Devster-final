import React, {useRef, useState} from 'react';
import axios from 'axios';

function SignUpNormUpload(props) {
    const profileRef = useRef();
    const [previewImg, setPreviewImg] = useState(null);

    const photoUrl = process.env.REACT_APP_MEMBERURL;

    //upload profile img
    const uploadProfileImg = (e) => {
        const file=e.target.files[0];
        const fileExtention=file.name.split('.').pop().toLowerCase();

        if(fileExtention !== 'png' && fileExtention !=='jpg' && fileExtention !=='jpeg') {
            alert('.png, .jpg, .jpeg 파일만 업로드 가능합니다.');
            return;
        }

        let formData = new FormData();
        formData.append('upload', file);

        axios({
            method: 'post',
            url: '/member/sign-up/photo',
            data: formData,
            headers: {'Content-type': 'multipart/form-data'}
        })
            .then(res => {
                setPreviewImg(res.data);
            })
            .catch((error) => {
                console.error('Error uploading file: ', error);
            });
    }

    //back to default img
    const setDefaultImg = (e) => {
        if (previewImg == null) {
            return;
        } else {
            axios({
                method: 'put',
                url: '/member/sign-up/photo/reset',
                data: {'photo':previewImg},
                headers:{'Content-type':'application/json'}
            })
                .then(res=>{
                  setPreviewImg(null);
                })
                .catch((error)=>{
                    console.error('Error resets preview Img', error);
                });
        }
    }

    return (
        <div>
            <div className='signup-guest-profile'>
                <div className='signup-guest-profile-text'>프로필 사진</div>
                <div className='signup-guest-profile-img'>
                    <img alt='프로필 이미지'
                         src={`${previewImg == null ? require('../assets/signup_default_img.svg').default : `${photoUrl}${previewImg}`}`}
                    />
                </div>
                <input
                    type='file'

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
                        src={require('../assets/signup_guest_upload_profile_img_icon.svg').default}
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
                        src={require('../assets/signup_guest_upload_profile_default_icon.svg').default}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignUpNormUpload;