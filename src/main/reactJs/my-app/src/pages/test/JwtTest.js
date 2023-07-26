import React, {useEffect} from "react";

function JwtTest(props) {
    const KAKAO_RESTAPI_KEY=process.env.REACT_APP_RESTAPIKEY_KAKAO;
    const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth2/authorization/kakao';
    const KAKAO_AUTH_URI= `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_RESTAPI_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    const kakaoHandler=()=>{
        window.location.href=KAKAO_AUTH_URI;
    }

    return (
        <div>
            <div
                style={{fontSize:'30rem'}}
                onClick={kakaoHandler}
            >카카오 로그인</div>
        </div>
    );
}

export default JwtTest;