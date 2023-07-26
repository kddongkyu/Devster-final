import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCm_email, setEmailChk, setEmailIsValid} from "../../../../redux/compMemberSlice";
import axios from "axios";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";
import {jwtHandleError} from "../../../../api/JwtHandleError";
import {CompEmailReset} from "./index";



function InputCompEmail(props) {
    const dispatch = useDispatch();
    const cm_email = useSelector(state => state.comp.cm_email);
    const emailIsValid = useSelector(state => state.comp.emailIsValid);
    const isEmailSent = useSelector(state => state.comp.isEmailSent);
    const emailRegChk = useSelector(state => state.comp.emailRegChk);
    const sendingInProg = useSelector(state => state.comp.sendingInProg);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
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
                url: '/api/compmember/D0/email',
                data: JSON.stringify({cm_email: cm_email}),
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
    }, [dispatch, cm_email, emailRegChk]);

    useEffect(() => {
        if (isEmailTouched) {
            const timer = setTimeout(() => {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cm_email);
                const isEmailValid = cm_email.trim() !== '' && emailPattern;
                dispatch(setEmailChk(isEmailValid));
                if (!cm_email.trim()) {
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
    }, [cm_email, dispatch, isEmailTouched, checkEmail]);

    const handleEmailChange = (e) => {
        if (!isEmailTouched) {
            setIsEmailTouched(true);
        }
        dispatch(setCm_email(e.target.value));
        dispatch(setEmailIsValid(false));
    }

    useEffect(() => {
        console.log('emailIsValid changed:', emailIsValid);
    }, [emailIsValid])

    return (
        <div>
            <div className='signup-comp-email-text'>
                <span>E-mail</span>
                <span className='signup-comp-input-name'> *</span>
            </div>
            {
                isEmailTouched &&
                <div
                    className={`signup-comp-email-exist-text
                    ${isInputValid ? 'signup-comp-text-color-confirm' : 'signup-comp-text-color-error'}`}
                >
                    {errorMessage}
                </div>
            }
            <div>
                <input
                    type='text'
                    className={`${isInputValid ? 'signup-comp-email-inputbox' : 'signup-comp-email-inputbox-error'}`}
                    disabled={isEmailSent || sendingInProg}
                    value={cm_email}
                    onChange={handleEmailChange}
                />
                <CompEmailReset/>
            </div>
        </div>
    );
}

export default InputCompEmail;