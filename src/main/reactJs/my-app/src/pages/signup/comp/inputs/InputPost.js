import React, {useEffect, useRef, useState} from 'react';
import {setIsSelectedTouched} from "../../../../redux/compMemberSlice";
import {useDispatch, useSelector} from "react-redux";
import {AddrSearch} from "./index";

function InputPost(props) {
    const dispatch = useDispatch();
    const cm_post = useSelector(state => state.comp.cm_post);
    const postIsValid = useSelector(state => state.comp.postIsValid);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
    const isSelectedTouched = useSelector(state => state.comp.isSelectedTouched);
    const [isAddrOpen, setIsAddrOpen] = useState(false);
    const [openPostCode, setOpenPostCode] = useState(false);
    const searchIconRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);

    useEffect(() => {
        if (!postIsValid && isSubmitted) {
            dispatch(setIsSelectedTouched(true));
        }
    }, [isSubmitted]);

    useEffect(() => {
        if (isSelectedTouched) {
            const timer = setTimeout(() => {
                if (!cm_post.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else {
                    setErrorMessage('');
                    setIsInputValid(true);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [cm_post, isSelectedTouched]);

    const openAddrModal = () => {
        setIsAddrOpen(true);
        setOpenPostCode(true);
    }

    const handleSearchInput = () => {
        searchIconRef.current.focus();
        searchIconRef.current.click();
    }

    return (
        <div>
            <div className='signup-comp-post-text'>
                <span>주소</span>
                <span className='signup-comp-input-name'> *</span>
            </div>

            <div
                className={`signup-comp-post-exist-text
                    ${isInputValid ? 'signup-comp-text-color-confirm' : 'signup-comp-text-color-error'}`}
            >
                {errorMessage}
            </div>
            <div>
                <input
                    type='text'
                    className={`${isInputValid ? 'signup-comp-post-inputbox' : 'signup-comp-post-inputbox-error'}`}
                    readOnly
                    ref={searchIconRef}
                    value={cm_post}
                    onClick={openAddrModal}
                />
                <img
                    className='signup-comp-post-search-ic-icon'
                    alt=''
                    src={require('../../assets/signup_guest_academy_search_icon.svg').default}
                    onClick={handleSearchInput}
                />
            </div>
            <AddrSearch
                isAddrOpen={isAddrOpen}
                setIsAddrOpen={setIsAddrOpen}
                openPostCode={openPostCode}
                setOpenPostCode={setOpenPostCode}
            />
        </div>
    );
}

export default InputPost;