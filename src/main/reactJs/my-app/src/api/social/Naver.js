import React from 'react';
import './style/naver.css';

function Naver(props) {
    const NAVER_CLIENT_ID=process.env.REACT_APP_CLIENT_ID;
    const NAVER_REDIRECT_URI=process.env.REACT_APP_REDIRECT_URI_NAVER;
    const NAVER_AUTH_URI=`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=test`;

    const handleNaverApi=() => {
        window.location.href=NAVER_AUTH_URI;
    }

    return (
        <div
            className='signin-naver'
            onClick={handleNaverApi}
        >
            <div className='signin-naver-box'/>
            <b className='signin-kakao-text'>네이버 로그인</b>
            <div className='signin-naver-icon'>
                <img
                    className='signin-naver-icon-txt'
                    alt=''
                    src={require('../../assets/social_naver_icon.svg').default}
                />
                <div className='signin-naver-icon-box'/>
            </div>
        </div>
    );
}

export default Naver;