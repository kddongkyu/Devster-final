import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setM_id, setIdChk, setIdIsValid} from "../../../../redux/normMemberSlice";
import axios from "axios";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";
import {jwtHandleError} from "../../../../api/JwtHandleError";

function InputId(props) {
    const dispatch = useDispatch();
    const m_id = useSelector(state => state.norm.m_id);
    const idIsValid = useSelector(state => state.norm.idIsValid);
    const isSubmitted = useSelector(state => state.norm.isSubmitted);
    const [isIdTouched, setIsIdTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(()=> {
        if(!idIsValid && isSubmitted) {
            setIsIdTouched(true);
        }
    },[isSubmitted]);

    const checkId = useCallback(async () => {
        try {
            const res = await axios.get(`/api/member/D0/id/${m_id}`);
            if (res?.status === 200) {
                if (res.data === false) {
                    dispatch(setIdIsValid(true));
                    setIsInputValid(true);
                    setErrorMessage('사용 가능한 아이디입니다.');
                } else {
                    dispatch(setIdIsValid(false));
                    setIsInputValid(false);
                    setErrorMessage('이미 사용중인 아이디입니다.');
                }
            }
        } catch (error) {
            dispatch(setIdIsValid(false));
            setIsInputValid(false);
            setErrorMessage('서버에 문제가 발생했습니다.');
            jwtHandleError(error,toastAlert);
        }
    }, [dispatch, m_id]);

    useEffect(() => {
        if (isIdTouched) {
            const timer = setTimeout(() => {
                const idPattern = /^[A-Za-z0-9]{6,14}$/.test(m_id);
                const isIdValid = m_id.trim() !== '' && idPattern;
                dispatch(setIdChk(isIdValid));
                if (!m_id.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!isIdValid) {
                    setErrorMessage('아이디를 확인해주세요.');
                    setIsInputValid(false);
                } else {
                    checkId();
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [m_id, dispatch, isIdTouched, checkId]);

    const handleIdChange = (e) => {
        if (!isIdTouched) {
            setIsIdTouched(true);
        }
        dispatch(setM_id(e.target.value));
        dispatch(setIdIsValid(false));
    }

    return (
        <div>
            <div className='signup-guest-id-text'>
                <span>사용자 ID</span>
                <span className='signup-guest-input-name'> *</span>
            </div>
            {
                isIdTouched &&
                <div
                    className={`signup-guest-id-exist-text
                    ${isInputValid ? 'signup-guest-text-color-confirm' : 'signup-guest-text-color-error'}`}
                >
                    {errorMessage}
                </div>
            }
            <input
                type='text'
                className={`${isInputValid ? 'signup-guest-id-inputbox' : 'signup-guest-id-inputbox-error'}`}
                value={m_id}
                required={isSubmitted}
                onChange={handleIdChange}
            />
        </div>
    );
}

export default InputId;