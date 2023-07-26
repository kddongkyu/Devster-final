import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPassChk} from "../../../../redux/normMemberSlice";

function InputPassChk(props) {
    const dispatch = useDispatch();
    const m_pass = useSelector(state => state.norm.m_pass);
    const passIsValid = useSelector(state => state.norm.passIsValid);
    const passChk=useSelector(state=>state.norm.passChk);
    const isSubmitted = useSelector(state => state.norm.isSubmitted);
    const [m_passChk, setM_passChk] = useState('');
    const [isPassChkTouched, setIsPassChkTouched] = useState(false);
    const [isCapsOn, setIsCapsOn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);

    useEffect(()=> {
        if(!passChk && isSubmitted) {
            setIsPassChkTouched(true);
        }
    },[isSubmitted]);

    useEffect(() => {
        if (isPassChkTouched) {
            const timer = setTimeout(() => {
                const passChkPattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,14}$/.test(m_passChk);
                const passMatch = m_pass === m_passChk;
                const isPassMatch = passMatch && passChkPattern && passIsValid;
                dispatch(setPassChk(isPassMatch));
                if (!m_passChk.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!isPassMatch) {
                    setErrorMessage('비밀번호를 확인해주세요')
                    setIsInputValid(false);
                } else {
                    setErrorMessage('');
                    setIsInputValid(true);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [m_pass, dispatch, isPassChkTouched, m_passChk, passIsValid]);

    const handlePassChkChange = (e) => {
        if (!isPassChkTouched) {
            setIsPassChkTouched(true);
        }
        setM_passChk(e.target.value);
        dispatch(setPassChk(false));
    }

    const capsLockChk = (e) => {
        setIsCapsOn(e.getModifierState('CapsLock'));
    }

    useEffect(()=>{
      console.log('passChk changed', passChk)
    },[passChk]);

    return (
        <div>
            <div className='signup-guest-pass-check-text'>
                <span>비밀번호 확인</span>
                <span className='signup-guest-input-name'> *</span>
            </div>
            <div className='signup-guest-pass-check-wanrin'>
                {errorMessage}
            </div>
            <input
                type='text'
                className={`${isInputValid? 'signup-guest-pass-check-inputb':'signup-guest-pass-check-inputb-error'}`}
                value={m_passChk}
                onKeyDown={capsLockChk}
                onChange={handlePassChkChange}
            />
            {
                isCapsOn &&
                <span className='signup-guest-passchk-capslock'>*Caps Lock이 켜져 있습니다.</span>
            }
        </div>
    );
}

export default InputPassChk;
