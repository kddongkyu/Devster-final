import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setM_pass, setPassIsValid} from "../../../../redux/normMemberSlice";

function InputPass(props) {
    const dispatch = useDispatch();
    const m_pass = useSelector(state => state.norm.m_pass);
    const passIsValid = useSelector(state => state.norm.passIsValid);

    const [isPassTouched, setIsPassTouched] = useState(false);
    const [isCapsOn, setIsCapsOn] = useState(false);
    const [passStrength,setPassStrength] = useState('');

    useEffect(() => {
        if (isPassTouched) {
            const timer = setTimeout(() => {
                console.log(m_pass);
                const isPassValid=passStrengthChk(m_pass);
                dispatch(setPassIsValid(isPassValid));
                console.log(isPassValid);
            },400);
            return()=>clearTimeout(timer);
        }
    },[m_pass,dispatch,isPassTouched,setTimeout]);

    const handlePassChange = (e) => {
        if (!isPassTouched) {
            setIsPassTouched(true);
        }
        dispatch(setM_pass(e.target.value));
        dispatch(setPassIsValid(false));
    }

    const capsLockChk = (e) => {
        setIsCapsOn(e.getModifierState("CapsLock"));
    }

    function passStrengthChk(password) {
        if (password.length < 8 || password.length > 14) {
            return false;
        }

        const lowerCase = /[a-z]/g;
        const upperCase = /[A-Z]/g;
        const numbers = /[0-9]/g;
        const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

        const patterns=[lowerCase,upperCase,numbers,special].reduce((stacks,regex)=>{
           return stacks+Number(regex.test(password));
        },0);

        switch(patterns) {
            case 0:
                setPassStrength('0')
                return false;
            case 1:
                setPassStrength('하');
                return true;
            case 2:
                setPassStrength('중');
                return true;
            case 3:
                setPassStrength('상');
                return true;
            case 4:
                setPassStrength('상');
                return true;
            default :
                setPassStrength('?')
                return false;
        }
    }

    return (
        <div>
            <div className='signup-guest-pass-text'>
                <span>비밀번호</span>
                <span className='signup-guest-input-name'> *</span>
            </div>
            {
                <div className='signup-guest-pass-secure'>
                    <div className='signup-guest-pass-secure-text'>보안강도 : {passStrength}</div>
                    <div className='signup-guest-pass-secure-icons'>
                        <div className='signup-guest-pass-secure-red'/>
                        <div className='signup-guest-pass-secure-yello'/>
                        <div className='signup-guest-pass-secure-green'/>
                    </div>
                </div>
            }
            <input
                type='text'
                className='signup-guest-pass-inputbox'
                value={m_pass}
                onKeyDown={capsLockChk}
                onChange={handlePassChange}
            />
            {   isCapsOn &&
                <span className='signup-guest-pass-capslock'>*Caps Lock이 켜져 있습니다.</span>
            }
        </div>
    );
}

export default InputPass;