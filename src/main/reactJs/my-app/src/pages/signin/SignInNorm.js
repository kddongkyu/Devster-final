import React from 'react';

function SignInNorm(props) {
    return (
        <div>
            <b className='login-sns-text'>SNS 로그인</b>
            <div className='login-sns-kakao'/>
            <div className='login-sns-naver'/>
            <div className='login-devster-hr'/>
            <b className='login-devster-text'>Devster 아이디로 로그인</b>
            <div className='login-devster-id-text'>사용자 ID</div>
            <div className='login-devster-id-remember'>
                <div className='login-devster-id-remember-text'>ID 기억하기</div>
                <div className='login-devster-id-remember-ck'/>
            </div>
            <div className='login-devster-id-box-input'/>
            <div className='login-devster-pw-text'>비밀번호</div>
            <div className='login-devster-pw-input'/>
            <div className='login-devster-finder'>사용자 ID / 비밀번호 찾기</div>
            <div className='login-loginbtn'>
                <div className='login-loginbtn-box'/>
                <div className='login-loginbtn-text'>로그인</div>
            </div>
        </div>
    );
}

export default SignInNorm;