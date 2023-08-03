import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPassChk} from "../../../../redux/compMemberSlice";

function CompPassUpdateChk(props) {
    const dispatch = useDispatch();
    const cm_pass = useSelector(state => state.comp.cm_pass);
    const passIsValid = useSelector(state => state.comp.passIsValid);
    const passChk=useSelector(state=>state.comp.passChk);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
    const [cm_passChk, setCm_passChk] = useState('');
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
                const passChkPattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,14}$/.test(cm_passChk);
                const passMatch = cm_pass === cm_passChk;
                const isPassMatch = passMatch && passChkPattern && passIsValid;
                dispatch(setPassChk(isPassMatch));
                if (!cm_passChk.trim()) {
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
    }, [cm_pass, dispatch, isPassChkTouched, cm_passChk, passIsValid]);

    const handlePassChkChange = (e) => {
        if (!isPassChkTouched) {
            setIsPassChkTouched(true);
        }
        setCm_passChk(e.target.value);
        dispatch(setPassChk(false));
    }

    const capsLockChk = (e) => {
        setIsCapsOn(e.getModifierState('CapsLock'));
    }

    return (
        <div>
            <div className='signup-comp-pass-check-text'>
                <span>비밀번호 확인</span>
                <span className='signup-comp-input-name'> *</span>
            </div>
            <div className='signup-comp-pass-check-wanrin'>
                {errorMessage}
            </div>
            <input
                type='password'
                className={`${isInputValid? 'signup-comp-pass-check-inputb':'signup-comp-pass-check-inputb-error'}`}
                value={cm_passChk}
                onKeyDown={capsLockChk}
                onChange={handlePassChkChange}
            />
            {
                isCapsOn &&
                <span className='signup-comp-passchk-capslock'>*Caps Lock이 켜져 있습니다.</span>
            }
        </div>
    );
}

export default CompPassUpdateChk;
