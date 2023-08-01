import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCm_addr, setCm_addrSecond, setSecondAddrValid} from "../../../../redux/compMemberSlice";

function InputSecondAddr(props) {
    const dispatch = useDispatch();
    const cm_addrSecond = useSelector(state => state.comp.cm_addrSecond);
    const secondAddrValid = useSelector(state => state.comp.secondAddrValid);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
    const [isAddrTouched, setIsAddrTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);

    useEffect(() => {
        if (!secondAddrValid && isSubmitted) {
            setIsAddrTouched(true);
        }
    }, [isSubmitted]);

    useEffect(() => {
        if (isAddrTouched) {
            const timer = setTimeout(() => {
                const addrPattern = /^[0-9a-zA-Z가-힣()\-,.\s]{1,40}$/.test(cm_addrSecond);
                const isAddrValid = cm_addrSecond.trim() !== '' && addrPattern;
                dispatch(setSecondAddrValid(isAddrValid));
                if (!cm_addrSecond.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!isAddrValid) {
                    setErrorMessage('주소를 확인해주세요.');
                    setIsInputValid(false);
                } else {
                    setErrorMessage('');
                    setIsInputValid(true);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [cm_addrSecond, dispatch, isAddrTouched]);

    const handleAddrChange = (e) => {
        if (!isAddrTouched) {
            setIsAddrTouched(true);
        }
        dispatch(setCm_addrSecond(e.target.value));
        dispatch(setSecondAddrValid(false));
    }

    return (
        <div className='signup-comp-second-addr-position'>
            {
                isAddrTouched && !secondAddrValid &&
                <div className='signup-comp-second-addr-valid'>
                    {errorMessage}
                </div>
            }
            <input
                type='text'
                className={`${isInputValid ? 'signup-comp-second-addr-inputbox' : 'signup-comp-second-addr-inputbox-error'}`}
                value={cm_addrSecond}
                required
                onChange={handleAddrChange}
            />
        </div>
    );
}

export default InputSecondAddr;