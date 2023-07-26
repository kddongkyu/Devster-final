import React from 'react';
import {SignUpNormContract, SignUpNormSubmit} from "../index";
import {useNavigate} from "react-router-dom";
import {
    InputAcademy,
    InputEmail,
    InputEmailReg,
    InputId,
    InputName,
    InputNickname,
    InputPass,
    InputPassChk,
    InputUpload
} from "./inputs";

function SignUpNormForm(props) {
    const navi = useNavigate();

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
                <InputUpload/>
                <InputName/>
                <InputId/>
                <InputEmail/>
                <InputEmailReg/>
                <InputPass/>
                <InputPassChk/>
                <InputNickname/>
                <InputAcademy/>
                <div className='signup-guest-hr1'/>
                <SignUpNormContract/>
                <SignUpNormSubmit/>
                <div className='signup-guest-signin'>
                    <div className='signup-guest-signin-text'>이미 회원이신가요?</div>
                    <div
                        className='signup-guest-signin-link'
                        onClick={() => navi('/signin')}
                    >로그인
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpNormForm;
