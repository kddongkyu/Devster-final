import React from 'react';
import './style/Kakao.css';

function Kakao(props) {
    const KAKAO_RESTAPI_KEY = process.env.REACT_APP_RESTAPIKEY_KAKAO;
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_KAKAO;
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_RESTAPI_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    const handleKakaoApi = () => {
        window.location.href = KAKAO_AUTH_URI;
    }

    return (
        <div
            className='signin-kakao'
            onClick={handleKakaoApi}
        >
            <div className='signin-kakao-box'/>
            <b className='signin-kakao-text'>카카오 로그인</b>
            <img
                className='signin-kakao-icon'
                alt=''
                src={require('../../assets/social_kakao_icon.svg').default}
            />
        </div>
    );
}

export default Kakao;