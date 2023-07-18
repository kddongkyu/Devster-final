import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setM_name, setM_nameIsValid} from "../../../../redux/normMemberSlice";

function InputName(props) {
    const dispatch = useDispatch();
    const m_name = useSelector(state => state.norm.m_name);
    const m_nameIsValid = useSelector(state => state.norm.m_nameIsValid);

    const [isNameTouched, setIsNameTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            const isNameValid = m_name.trim() !== '' && /^[A-Za-z가-힣]+$/.test(m_name);
            dispatch(setM_nameIsValid(isNameValid));
            if (!m_name.trim()) {
                setErrorMessage('필수 입력 항목입니다.');
            } else if (!isNameValid) {
                setErrorMessage('이름을 확인해주세요.');
            } else {
                setErrorMessage('');
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [m_name, dispatch]);

    const handleChange = (e) => {
        if (!isNameTouched) {
            setIsNameTouched(true);
        }
        dispatch(setM_name(e.target.value));
    }

    return (
        <div>
            <div className='signup-guest-name-text'>
                <span>이름</span>
                <span className='signup-guest-input-name'> *</span>
            </div>
            <input
                type='text'
                className='signup-guest-name-inputbox'
                value={m_name}
                onChange={handleChange}
            />
            {
                isNameTouched && !m_nameIsValid &&
                <div>
                    {errorMessage}
                </div>
            }
        </div>
    );
}

export default InputName;