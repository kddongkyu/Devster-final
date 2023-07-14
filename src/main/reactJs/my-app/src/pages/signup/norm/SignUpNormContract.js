import React from 'react';

function SignUpNormContract(props) {
    return (
        <div>
            <div className='signup-guest-contract-conditio'>
                <b className='signup-guest-contract-conditio1'>약관동의 (필수)</b>
                <img
                    className='signup-guest-contract-conditio-icon'
                    alt=''
                    src={require('../assets/signup_guest_contract_condition_btn.svg').default}
                />
            </div>
            <div className='signup-guest-contract-detail'>
                <div className='signup-guest-contract-detail-o'>서비스이용약관</div>
                <img
                    className='signup-guest-contract-detail-b-icon'
                    alt=''
                    src={require('../assets/signup_guest_choose_bar.svg').default}
                />
                <div className='signup-guest-contract-detail-t'>개인정보처리방침</div>
            </div>
            <div className='signup-guest-captcha'>
                <div className='signup-guest-captcha-api'>
                    <div className='signup-guest-captcha-api-box'/>
                    <div className='signup-guest-captcha-api-text'>
                        로봇이 아닙니다 체크 창...
                    </div>
                </div>
            </div>
            <div className='signup-guest-submit'>
                <div className='signup-guest-submit-box'/>
                <div className='signup-guest-submit-text'>회원가입</div>
            </div>
            <div className='signup-guest-signin'>
                <div className='signup-guest-signin-text'>이미 회원이신가요?</div>
                <div className='signup-guest-signin-link'>로그인</div>
            </div>
        </div>
    );
}

export default SignUpNormContract;