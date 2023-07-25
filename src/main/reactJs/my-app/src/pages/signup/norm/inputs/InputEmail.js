import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setEmailChk, setEmailIsValid, setM_email} from "../../../../redux/normMemberSlice";
import axios from "axios";
import {EmailReset} from "./index";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";
import {jwtHandleError} from "../../../../api/JwtHandleError";


function InputEmail(props) {
    const dispatch = useDispatch();
    const m_email = useSelector(state => state.norm.m_email);
    const emailIsValid = useSelector(state => state.norm.emailIsValid);
    const isEmailSent = useSelector(state => state.norm.isEmailSent);
    const emailRegChk = useSelector(state => state.norm.emailRegChk);
    const sendingInProg = useSelector(state => state.norm.sendingInProg);
    const isSubmitted = useSelector(state => state.norm.isSubmitted);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        if (!emailIsValid && isSubmitted) {
            setIsEmailTouched(true);
        }
    }, [isSubmitted]);

    const checkEmail = useCallback(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/member/D0/email',
                data: JSON.stringify({m_email: m_email}),
                headers: {'Content-Type': 'application/json'}
            });
            if (res?.status === 200) {
                if (res.data === false) {
                    dispatch(setEmailIsValid(true));
                    setIsInputValid(true);
                    setErrorMessage(emailRegChk ? '인증 되었습니다.' : '사용 가능한 이메일입니다.');
                } else {
                    dispatch(setEmailIsValid(false));
                    setIsInputValid(false);
                    setErrorMessage('이미 사용중인 이메일입니다.');
                }
            }
        } catch (error) {
            dispatch(setEmailIsValid(false));
            setIsInputValid(false);
            setErrorMessage('서버에 문제가 발생했습니다.');
            jwtHandleError(error,toastAlert);
        }
    }, [dispatch, m_email, emailRegChk]);

    useEffect(() => {
        if (isEmailTouched) {
            const timer = setTimeout(() => {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(m_email);
                const isEmailValid = m_email.trim() !== '' && emailPattern;
                dispatch(setEmailChk(isEmailValid));
                if (!m_email.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!isEmailValid) {
                    setErrorMessage('이메일을 확인해주세요.');
                    setIsInputValid(false);
                } else {
                    checkEmail()
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [m_email, dispatch, isEmailTouched, checkEmail]);

    const handleEmailChange = (e) => {
        if (!isEmailTouched) {
            setIsEmailTouched(true);
        }
        dispatch(setM_email(e.target.value));
        dispatch(setEmailIsValid(false));
    }

    useEffect(() => {
        console.log('emailIsValid changed:', emailIsValid);
    }, [emailIsValid])

    return (
        <div>
            <div className='signup-guest-email-text'>
                <span>E-mail</span>
                <span className='signup-guest-input-name'> *</span>
            </div>
            {
                isEmailTouched &&
                <div
                    className={`signup-guest-email-exist-text
                    ${isInputValid ? 'signup-guest-text-color-confirm' : 'signup-guest-text-color-error'}`}
                >
                    {errorMessage}
                </div>
            }
            <div>
                <input
                    type='text'
                    className={`${isInputValid ? 'signup-guest-email-inputbox' : 'signup-guest-email-inputbox-error'}`}
                    disabled={isEmailSent || sendingInProg}
                    value={m_email}
                    onChange={handleEmailChange}
                />
                <EmailReset/>
            </div>
        </div>
    );
}

export default InputEmail;