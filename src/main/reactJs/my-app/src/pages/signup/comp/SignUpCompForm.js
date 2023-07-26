import React from 'react';
import {useNavigate} from "react-router-dom";
import '../style/SignUpComp.css';
import {
    InputCmCp, InputCmCpReg,
    InputCmName,
    InputCompEmail,
    InputCompEmailReg,
    InputCompname,
    InputCompPass,
    InputCompPassChk,
    InputCompTele
} from "./inputs";

function SignUpCompForm(props) {
    const navi = useNavigate();

    return (
        <div className='signup-comp-member'>
            <div
                className='signup-comp-intro'
                onClick={() => navi('/home')}
            >
                <img
                    className='signup-comp-intro-icon'
                    alt=''
                    src={require('../assets/signup_guest_intro_icon.svg').default}
                />
                <div className='signup-comp-intro-icon-text-d'>Devster</div>
                <div className='signup-comp-intro-icon-text-h'>Hello World!</div>
            </div>
            <div className='signup-comp-intro-text'>
                <p className='signup-comp-devster'>{sessionStorage.getItem('cm_reg')}Devster는 개발자를 꿈꾸는 학생들과</p>
                <p className='signup-comp-devster'>주니어 개발자들이 모인 커뮤니티 플랫폼입니다.</p>
            </div>
            <div className='signup-comp-choose'>
                <div
                    className='signup-comp-choose-norm-false'
                    onClick={() => window.location.replace('/signup')}
                >일반회원
                </div>
                <img
                    className='signup-comp-choose-bar-icon'
                    alt=''
                    src={require('../assets/signup_guest_choose_bar.svg').default}
                />
                <div className='signup-comp-choose-comp'>
                    기업회원
                </div>
            </div>
            <div>
                <b className='signup-comp-signup-text'>Devster 회원가입</b>
                <InputCompname/>
                <div className='signup-comp-input-position-box'>
                    <InputCompEmail/>
                    <InputCompEmailReg/>
                    <InputCompPass/>
                    <InputCompPassChk/>
                </div>
                    <InputCompTele/>
                    <InputCmName/>
                    <InputCmCp/>
                    <InputCmCpReg/>
            </div>
        </div>
    );
}

export default SignUpCompForm;