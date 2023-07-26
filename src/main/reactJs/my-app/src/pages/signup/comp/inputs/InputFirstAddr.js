import React, {useEffect, useRef, useState} from 'react';
import {setIsSelectedTouched} from "../../../../redux/compMemberSlice";
import {useDispatch, useSelector} from "react-redux";
import {AddrSearch} from "./index";

function InputFirstAddr(props) {
    const dispatch = useDispatch();
    const cm_addrFirst = useSelector(state => state.comp.cm_addrFirst);
    const firstAddrValid = useSelector(state => state.comp.firstAddrValid);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
    const isSelectedTouched = useSelector(state => state.comp.isSelectedTouched);
    const [isAddrOpen, setIsAddrOpen] = useState(false);
    const [openPostCode, setOpenPostCode] = useState(false);
    const searchIconRef = useRef();
    const [isInputValid, setIsInputValid] = useState(true);

    useEffect(() => {
        if (!firstAddrValid && isSubmitted) {
            dispatch(setIsSelectedTouched(true));
        }
    }, [isSubmitted]);

    useEffect(() => {
        if (isSelectedTouched) {
            const timer = setTimeout(() => {
                if (!cm_addrFirst.trim()) {
                    setIsInputValid(false);
                } else {
                    setIsInputValid(true);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [cm_addrFirst, isSelectedTouched]);

    const openAddrModal = () => {
        setIsAddrOpen(true);
        setOpenPostCode(true);
    }

    useEffect(() => {
        console.log('firstAddrValid changed', firstAddrValid);
    }, [firstAddrValid]);

    return (
        <div>
            <div className='signup-comp-first-addr-text'>
                <span>주소</span>
                <span className='signup-comp-input-name'> *</span>
            </div>
            <div>
                <input
                    type='text'
                    className={`${isInputValid ? 'signup-comp-first-addr-inputbox' : 'signup-comp-first-addr-inputbox-error'}`}
                    readOnly
                    ref={searchIconRef}
                    value={cm_addrFirst}
                    onClick={openAddrModal}
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

export default InputFirstAddr;