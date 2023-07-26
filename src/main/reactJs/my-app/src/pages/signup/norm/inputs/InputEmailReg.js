import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
    setEmailRegChk,
    setEmailRegInput,
    setIsEmailSent,
    setSeconds,
    setSendingInProg
} from '../../../../redux/normMemberSlice';
import {RegTimer} from "./index";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";
import {jwtHandleError} from "../../../../api/JwtHandleError";

function InputEmailReg(props) {
    const dispatch = useDispatch();
    const m_email = useSelector(state => state.norm.m_email);
    const seconds = useSelector(state => state.norm.seconds);
    const emailRegInput = useSelector(state => state.norm.emailRegInput);
    const emailIsValid = useSelector(state => state.norm.emailIsValid);
    const isEmailSent = useSelector(state => state.norm.isEmailSent);
    const emailRegChk = useSelector(state => state.norm.emailRegChk);
    const sendingInProg=useSelector(state=>state.norm.sendingInProg);
    const isSubmitted = useSelector(state => state.norm.isSubmitted);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const [emailRegNum, setEmailRegNum] = useState('');

    useEffect(()=> {
        if(!emailRegChk && isSubmitted) {
            toastAlert('이메일 인증을 진행해주세요.','warning');
        }
    },[isSubmitted]);

    const handleSendButton = async () => {
        if (emailRegChk) {
            return;
        }
        try {
            dispatch(setSendingInProg(true));
            const res = await axios({
                method: 'post',
                url: '/api/member/D0/email/validation',
                data: JSON.stringify({m_email: m_email}),
                headers: {'Content-Type': 'application/json'}
            });

            if (res?.status === 200) {
                dispatch(setIsEmailSent(true));
                dispatch(setSeconds(10));
                setEmailRegNum(res.data);
                dispatch(setEmailRegInput(''));
                toastAlert(isEmailSent ? '인증번호가 재발송되었습니다.' : '인증번호가 발송되었습니다.','success');
                dispatch(setSendingInProg(false));
            } else {
                dispatch(setIsEmailSent(false));
                toastAlert(<>인증번호 발송에 실패했습니다.<br/>잠시후 다시 시도해주세요.</>,'warning');
                dispatch(setSendingInProg(false));
            }
        } catch (error) {
            dispatch(setIsEmailSent(false));
            dispatch(setSendingInProg(false));
            jwtHandleError(error,toastAlert);
        }
    }

    const handleEmailRegChange = (e) => {
        dispatch(setEmailRegInput(e.target.value));
    }

    const handleRegChk = () => {
        if (isEmailSent && emailRegNum === emailRegInput) {
            dispatch(setEmailRegChk(true));
            dispatch(setSeconds(null));
            toastAlert('인증 되었습니다.','success');
        } else {
            dispatch(setEmailRegChk(false));
            toastAlert(<>인증에 실패했습니다.<br/>인증번호를 확인해주세요.</>,'warning');
        }
    }

    useEffect(() => {
        console.log('emailRegChk changed:', emailRegChk);
    }, [emailRegChk]);

    return (
        <div>
            {
                !sendingInProg &&
                <div
                    className={`signup-guest-email-reg-send
                ${emailIsValid && !emailRegChk ? '' : 'signup-guest-button-disabled'}`}
                    onClick={emailIsValid ? () => handleSendButton() : null}
                >
                    <div className='signup-guest-email-inputbox1'/>
                    <div className='signup-guest-email-reg-send-te'>
                        {
                            !isEmailSent && !emailRegChk ? '인증번호 전송' : '재전송'
                        }
                    </div>
                </div>
            }
            {
                sendingInProg &&
                <div
                    className={`signup-guest-email-reg-send
                ${emailIsValid && !emailRegChk ? '' : 'signup-guest-button-disabled'}`}
                >
                    <div className='signup-guest-email-inputbox1'/>
                    <div className='signup-guest-email-reg-send-te'>
                        <div className='signup-guest-email-reg-send-inprogress'></div>
                    </div>
                </div>
            }
            <div className='signup-guest-email-reg-input'>
                <input
                    type='text'
                    className='signup-guest-email-input-reg-b'
                    disabled={!isEmailSent || emailRegChk || seconds <= 0}
                    value={emailRegInput}
                    onChange={handleEmailRegChange}
                />
                <div
                    className={`signup-guest-email-reg-chk
                    ${!isEmailSent || emailRegChk || seconds <= 0 ? 'signup-guest-button-disabled' : ''}`}
                    onClick={handleRegChk}
                >
                    <div className='signup-guest-email-inputbox2'/>
                    <div className='signup-guest-email-reg-send-te1'>확인</div>
                </div>
            </div>
            {
                isEmailSent && seconds !== null &&
                <RegTimer/>
            }
        </div>
    );
}

export default InputEmailReg;