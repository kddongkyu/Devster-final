import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {setIsSelectedTouched} from "../../../../redux/normMemberSlice";
import {AcademySearch} from "./index";

function InputAcademy(props) {
    const dispatch = useDispatch();
    const ai_name = useSelector(state => state.norm.ai_name);
    const academyIsValid = useSelector(state => state.norm.academyIsValid);
    const isSubmitted = useSelector(state => state.norm.isSubmitted);
    const isSelectedTouched = useSelector(state => state.norm.isSelectedTouched);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchIconRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);

    useEffect(() => {
        if (!academyIsValid && isSubmitted) {
            dispatch(setIsSelectedTouched(true));
        }
    }, [isSubmitted]);

    useEffect(() => {
        if (isSelectedTouched) {
            const timer = setTimeout(() => {
                if (!ai_name.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else {
                    setErrorMessage('');
                    setIsInputValid(true);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [ai_name, isSelectedTouched]);

    const openSearchModal = () => {
        setIsSearchOpen(true);
    }

    const handleSearchInput = () => {
        searchIconRef.current.focus();
        searchIconRef.current.click();
    }

    return (
        <div>
            <div className='signup-guest-academy-text'>
                <span>기관 선택</span>
                <span className='signup-guest-input-name'> *</span>
            </div>

            <div
                className={`signup-guest-academy-exist-text
                    ${isInputValid ? 'signup-guest-text-color-confirm' : 'signup-guest-text-color-error'}`}
            >
                {errorMessage}
            </div>

            <input
                type='text'
                className={`${isInputValid ? 'signup-guest-academy-inputbox' : 'signup-guest-academy-inputbox-error'}`}
                readOnly
                ref={searchIconRef}
                value={ai_name}
                onClick={openSearchModal}
            />
            <img
                className='signup-guest-academy-search-ic-icon'
                alt=''
                src={require('../../assets/signup_guest_academy_search_icon.svg').default}
                onClick={handleSearchInput}
            />
            <AcademySearch
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />
        </div>
    );
}

export default InputAcademy;