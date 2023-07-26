import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setM_pass, setPassIsValid} from "../../../../redux/normMemberSlice";

function InputPass(props) {
    const dispatch = useDispatch();
    const m_pass = useSelector(state => state.norm.m_pass);
    const passIsValid = useSelector(state => state.norm.passIsValid);
    const isSubmitted = useSelector(state => state.norm.isSubmitted);
    const [isPassTouched, setIsPassTouched] = useState(false);
    const [isCapsOn, setIsCapsOn] = useState(false);
    const [strengthLevel, setStrengthLevel] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);

    useEffect(()=>{
        if(!passIsValid && isSubmitted) {
            setIsPassTouched(true);
        }
    },[isSubmitted]);

    useEffect(() => {
        if (isPassTouched) {
            const timer = setTimeout(() => {
                const passPattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,14}$/.test(m_pass);
                setStrengthLevel(strengthLevelChk(m_pass));
                const isPassValid = strengthLevel > 1 && passPattern;
                dispatch(setPassIsValid(isPassValid));
                if (!m_pass.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!passPattern) {
                    setErrorMessage('비밀번호를 확인해주세요.');
                    setIsInputValid(false);
                } else if (strengthLevel <= 1 && passPattern) {
                    setErrorMessage('"중"이상 사용 가능합니다.');
                    setIsInputValid(false);
                } else {
                    setErrorMessage('');
                    setIsInputValid(true);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [m_pass, dispatch, isPassTouched, strengthLevel]);

    const handlePassChange = (e) => {
        if (!isPassTouched) {
            setIsPassTouched(true);
        }
        dispatch(setM_pass(e.target.value));
        dispatch(setPassIsValid(false));
    }

    const capsLockChk = (e) => {
        setIsCapsOn(e.getModifierState('CapsLock'));
    }

    function strengthLevelChk(password) {
        if (password.length < 8 || password.length > 14) {
            return false;
        }

        const lowerCase = /[a-z]/g;
        const upperCase = /[A-Z]/g;
        const numbers = /[0-9]/g;
        const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

        const patterns = [lowerCase, upperCase, numbers, special].reduce((stacks, regex) => {
            return stacks + Number(regex.test(password));
        }, 0);

        switch (patterns) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            case 4:
                return 4;
            default :
                return 0;
        }
    }

    useEffect(() => {
        console.log('passIsValid changed', passIsValid);
    }, [passIsValid]);

    return (
        <div>
            <div className='signup-guest-pass-text'>
                <span>비밀번호</span>
                <span className='signup-guest-input-name'> *</span>
            </div>
            <div className='signup-guest-pass-error-text'>
                {errorMessage}
            </div>
            <div className='signup-guest-pass-secure'>
                <div
                    className=
                        {`${
                            strengthLevel === 1 ? 'signup-guest-pass-secure-text-one' :
                                strengthLevel === 2 ? 'signup-guest-pass-secure-text-two' :
                                    strengthLevel >= 3 ? 'signup-guest-pass-secure-text-three' : ''
                        }`}
                >
                    {
                        strengthLevel === 1 ? '보안강도 : 하' :
                            strengthLevel === 2 ? '보안강도 : 중' :
                                strengthLevel >= 3 ? '보안강도 : 상' : ''
                    }
                </div>
                <div className='signup-guest-pass-secure-icons'>
                    {
                        strengthLevel === 1 &&
                        <div className='signup-guest-pass-secure-red'/>
                    }
                    {
                        strengthLevel === 2 &&
                        <div className='signup-guest-pass-secure-yello'/>
                    }
                    {
                        strengthLevel >= 3 &&
                        <div className='signup-guest-pass-secure-green'/>
                    }
                </div>
            </div>
            <input
                type='text'
                className={`${isInputValid ? 'signup-guest-pass-inputbox' : 'signup-guest-pass-inputbox-error'}`}
                value={m_pass}
                onKeyDown={capsLockChk}
                onChange={handlePassChange}
            />
            {
                isCapsOn &&
                <span className='signup-guest-pass-capslock'>*Caps Lock이 켜져 있습니다.</span>
            }
        </div>
    );
}

export default InputPass;
