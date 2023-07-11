import React from 'react';

function SignInComp(props) {
    return (
        <div>
            <b className='login-company-devster'>Devster 아이디로 로그인</b>
            <div className='login-company-email'>E-mail</div>
            <div className='login-company-email-remember'>
                <div className='login-company-email-remember-t'>Email 기억하기</div>
                <div className='login-company-email-remember-c' />
            </div>
            <div className='login-company-email-input' />
            <div className='login-company-pw-text'>비밀번호</div>
            <div className='login-company-pw-input' />
            <div className='login-company-finder'>Email / 비밀번호 찾기</div>
            <div className='login-company-loginbtn'>
                <div className='login-loginbtn-box' />
                <div className='login-loginbtn-text'>로그인</div>
            </div>
        </div>
    );
}

export default SignInComp;