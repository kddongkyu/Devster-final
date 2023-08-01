import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setM_nickname, setNicknameChk, setNicknameIsValid} from "../../../../redux/normMemberSlice";
import axios from "axios";
import {jwtHandleError} from "../../../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";

function InputNickname(props) {
    const dispatch = useDispatch();
    const m_nickname = useSelector(state => state.norm.m_nickname);
    const nicknameIsValid = useSelector(state => state.norm.nicknameIsValid);
    const isSubmitted = useSelector(state => state.norm.isSubmitted);
    const [isNicknameTouched, setIsNicknameTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        if (!nicknameIsValid && isSubmitted) {
            setIsNicknameTouched(true);
        }
    },[isSubmitted]);

    const checkNickname = useCallback(async () => {
        try {
            const res = await axios.get(`/api/member/D0/nickname/${m_nickname}`);
            if (res?.status === 200) {
                if (res.data === false) {
                    dispatch(setNicknameIsValid(true));
                    setIsInputValid(true);
                    setErrorMessage('사용 가능한 닉네임입니다.');
                } else {
                    dispatch(setNicknameIsValid(false));
                    setIsInputValid(false);
                    setErrorMessage('이미 사용중인 닉네임입니다.');
                }
            }
        } catch (error) {
            dispatch(setNicknameIsValid(false));
            setIsInputValid(false);
            setErrorMessage('서버에 문제가 발생했습니다.');
            jwtHandleError(error,toastAlert);
        }
    }, [dispatch, m_nickname]);

    useEffect(() => {
        if (isNicknameTouched) {
            const timer = setTimeout(() => {
                const nicknamePattern = /^[A-Za-z가-힣0-9]{2,10}$/.test(m_nickname);
                const isNicknameValid = m_nickname.trim() !== '' && nicknamePattern;
                dispatch(setNicknameChk(isNicknameValid));
                if (!m_nickname.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!isNicknameValid) {
                    setErrorMessage('아이디를 확인해주세요.');
                    setIsInputValid(false);
                } else {
                    checkNickname();
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [m_nickname, dispatch, isNicknameTouched, checkNickname]);

    const handleNicknameChange = (e) => {
        if (!isNicknameTouched) {
            setIsNicknameTouched(true);
        }
        dispatch(setM_nickname(e.target.value));
        dispatch(setNicknameIsValid(false));
    }

    return (
        <div>
            <div className='signup-guest-nickname-text'>
                <span>닉네임</span>
                <span className='signup-guest-input-name'> *</span>
            </div>
            {
                isNicknameTouched &&
                <div
                    className={`signup-guest-nickname-check-te
                    ${isInputValid ? 'signup-guest-text-color-confirm' : 'signup-guest-text-color-error'}`}
                >
                    {errorMessage}
                </div>
            }
            <input
                type='text'
                className={`${isInputValid ? 'signup-guest-nickname-inputbox' : 'signup-guest-nickname-inputbox-error'}`}
                value={m_nickname}
                onChange={handleNicknameChange}
            />
        </div>
    );
}

export default InputNickname;