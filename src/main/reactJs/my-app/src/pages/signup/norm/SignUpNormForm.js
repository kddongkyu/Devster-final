import React from 'react';
import {SignUpNormContract, SignUpNormUpload} from "../index";
import InputName from "./inputs/InputName";
import InputId from "./inputs/InputId";
import InputEmail from "./inputs/InputEmail";
import InputEmailReg from "./inputs/InputEmailReg";
import InputPass from "./inputs/InputPass";

function SignUpNormForm(props) {
    return (
        <div>
            <div>
                <b className='signup-guest-sns-text'>SNS 회원가입</b>
                <div className='signup-guest-sns-kakao'/>
                <div className='signup-guest-sns-naver'/>
            </div>
            <div className='signup-guest-hr'/>
            <div>
                <b className='signup-guest-signup-text'>Devster 회원가입</b>
                <SignUpNormUpload/>
                <InputName/>
                <InputId/>
                <InputEmail/>
                <InputEmailReg/>
                <InputPass/>
                <div className='signup-guest-pass-check-text'>
                    <span>비밀번호 확인</span>
                    <span className='signup-guest-input-name'> *</span>
                </div>
                <div className='signup-guest-pass-check-wanrin'>
                    비밀번호가 일치하지 않습니다.
                </div>
                <div className='signup-guest-pass-check-inputb'/>
                <div className='signup-guest-nickname-text'>
                    <span>닉네임</span>
                    <span className='signup-guest-input-name'> *</span>
                </div>
                <div className='signup-guest-nickname-check-te'>
                    사용 불가능한 닉네임입니다.
                </div>
                <div className='signup-guest-nickname-inputbox'/>
                <div className='signup-guest-academy-text'>
                    <span>기관 선택</span>
                    <span className='signup-guest-input-name'> *</span>
                </div>
                <div className='signup-guest-academy-inputbox'/>
                <img
                    className='signup-guest-academy-search-ic-icon'
                    alt=''
                    src={require('../assets/signup_guest_academy_search_icon.svg').default}
                />
                <div className='signup-guest-hr1'/>
                <SignUpNormContract/>
            </div>
        </div>
    );
}

export default SignUpNormForm;
