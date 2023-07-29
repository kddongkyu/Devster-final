import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCm_name, setNameIsValid} from "../../../../redux/compMemberSlice";

function InputCmName(props) {
    const dispatch = useDispatch();
    const cm_name = useSelector(state => state.comp.cm_name);
    const nameIsValid = useSelector(state => state.comp.nameIsValid);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
    const [isNameTouched, setIsNameTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);

    useEffect(() => {
        if (!nameIsValid && isSubmitted) {
            setIsNameTouched(true);
        }
    }, [isSubmitted]);

    useEffect(() => {
        if (isNameTouched) {
            const timer = setTimeout(() => {
                const namePattern = /^[A-Za-z가-힣]+$/.test(cm_name);
                const isNameValid = cm_name.trim() !== '' && namePattern;
                dispatch(setNameIsValid(isNameValid));
                if (!cm_name.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!isNameValid) {
                    setErrorMessage('이름을 확인해주세요.');
                    setIsInputValid(false);
                } else {
                    setErrorMessage('');
                    setIsInputValid(true);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [cm_name, dispatch, isNameTouched]);

    const handleNameChange = (e) => {
        if (!isNameTouched) {
            setIsNameTouched(true);
        }
        dispatch(setCm_name(e.target.value));
        dispatch(setNameIsValid(false));
    }

    return (
        <div className='signup-comp-cmname-position'>
            <div className='signup-comp-cmname-text'>
                <span>담당자명</span>
                <span className='signup-comp-input-name'> *</span>
            </div>
            {
                isNameTouched && !nameIsValid &&
                <div className='signup-comp-cmname-valid'>
                    {errorMessage}
                </div>
            }
            <input
                type='text'
                className={`${isInputValid ? 'signup-comp-cmname-inputbox' : 'signup-comp-cmname-inputbox-error'}`}
                value={cm_name}
                required
                onChange={handleNameChange}
            />
        </div>
    );
}

export default InputCmName;