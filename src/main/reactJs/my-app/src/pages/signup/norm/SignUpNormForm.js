import React from 'react';
import {SignUpNormContract, SignUpNormUpload} from "../index";
import InputName from "./inputs/InputName";
import InputId from "./inputs/InputId";
import InputEmail from "./inputs/InputEmail";
import InputEmailReg from "./inputs/InputEmailReg";
import InputPass from "./inputs/InputPass";
import InputPassChk from "./inputs/InputPassChk";
import InputNickname from "./inputs/InputNickname";
import InputAcademy from "./inputs/InputAcademy";

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
                <InputPassChk/>
                <InputNickname/>
                <InputAcademy/>
                <div className='signup-guest-hr1'/>
                <SignUpNormContract/>
            </div>
        </div>
    );
}

export default SignUpNormForm;
