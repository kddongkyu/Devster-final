import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCm_tele, setTeleIsValid} from "../../../../redux/compMemberSlice";

function InputCompTele(props) {
    const dispatch = useDispatch();
    const cm_tele = useSelector(state => state.comp.cm_tele);
    const teleIsValid = useSelector(state => state.comp.teleIsValid);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
    const [isTeleTouched, setIsTeleTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);

    useEffect(() => {
        if (!teleIsValid && isSubmitted) {
            setIsTeleTouched(true);
        }
    }, [isSubmitted]);

    useEffect(() => {
        if (isTeleTouched) {
            const timer = setTimeout(() => {
                const telePattern = /^((02)\d{3,4}\d{4}|(0([3-6][1-5]|10|11|16|17|18|19|70{1}))\d{3,4}\d{4}|(15[0-9][0-9]|16[0-9][0-9]|18[0-9][0-9])\d{4})$/.test(cm_tele);
                const isTeleValid = cm_tele.trim() !== '' && telePattern;
                dispatch(setTeleIsValid(isTeleValid));
                if (!cm_tele.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!isTeleValid) {
                    setErrorMessage('번호를 확인해주세요.');
                    setIsInputValid(false);
                } else {
                    setErrorMessage('');
                    setIsInputValid(true);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [cm_tele, dispatch, isTeleTouched]);

    const handleTeleChange = (e) => {
        if (!isTeleTouched) {
            setIsTeleTouched(true);
        }
        const pureCm_tele=((e.target.value).replace(/-/g, '')).trim();
        dispatch(setCm_tele(pureCm_tele));
        dispatch(setTeleIsValid(false));
    }

    const handleTeleKeyDown=(e) => {
        if(e.key === '-' || e.key === ' ') {
            e.preventDefault();
        }
    }

    useEffect(() => {
        console.log('teleIsValid changed:', teleIsValid);
    }, [teleIsValid]);

    return (
        <div className='signup-comp-tele-position'>
            <div className='signup-comp-tele-text'>
                <span>회사 연락처</span>
                <span className='signup-comp-input-name'> *</span>
            </div>
            {
                isTeleTouched && !teleIsValid &&
                <div className='signup-comp-tele-valid'>
                    {errorMessage}
                </div>
            }
            <input
                type='text'
                className={`${isInputValid ? 'signup-comp-tele-inputbox' : 'signup-comp-tele-inputbox-error'}`}
                value={cm_tele}
                required
                onChange={handleTeleChange}
                onKeyDown={handleTeleKeyDown}
            />
        </div>
    );
}

export default InputCompTele;