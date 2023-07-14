import React from 'react';
import '../style/SignUpNorm.css';
import {SignUpNormForm} from "../index";

function SignUpNorm(props) {
    return (
        <div className='signup-guest'>
            <div className='signup-guest-intro'>
                <img
                    className='signup-guest-intro-icon'
                    alt=''
                    src={require('../assets/signup_guest_intro_icon.svg').default}
                />
                <div className='signup-guest-intro-icon-text-d'>Devster</div>
                <div className='signup-guest-intro-icon-text-h'>Hello World!</div>
            </div>
            <div className='signup-guest-intro-text'>
                <p className='devster'>Devster는 개발자를 꿈꾸는 학생들과</p>
                <p className='devster'>{` 주니어 개발자들이 모인 커뮤니티 플랫폼입니다. `}</p>
            </div>
            <div className='signup-guest-choose'>
                <div className='signup-guest-choose-norm'>{`일반회원 `}</div>
                <img
                    className='signup-guest-choose-bar-icon'
                    alt=''
                    src={require('../assets/signup_guest_choose_bar.svg').default}
                />
                <div className='signup-guest-choose-comp'>기업회원</div>
            </div>
            <SignUpNormForm/>
        </div>
    );
}

export default SignUpNorm;