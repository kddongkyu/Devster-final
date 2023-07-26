import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setCm_email,
    setEmailChk,
    setEmailIsValid,
    setEmailRegChk, setEmailRegInput,
    setIsEmailSent,
    setSeconds
} from "../../../../redux/compMemberSlice";

function CompEmailReset(props) {
    const dispatch = useDispatch();
    const isEmailSent = useSelector(state => state.comp.isEmailSent);
    const handleResetEmail = () => {
        const resetConfirm = window.confirm('이메일을 변경하시겠습니까?\n변경후 재인증을 받으셔야합니다.')
        if (resetConfirm) {
            dispatch(setEmailRegChk(false));
            dispatch(setSeconds(null));
            dispatch(setIsEmailSent(false));
            dispatch(setEmailChk(false));
            dispatch(setEmailIsValid(false));
            dispatch(setEmailRegInput(''));
            dispatch(setCm_email(''));
        }
    }

    return (
        <img
            className='signup-comp-email-reset-icon'
            alt=''
            hidden={!isEmailSent}
            src={require('../../assets/signup_guest_email_reset_icon.svg').default}
            onClick={handleResetEmail}
        />
    );
}

export default CompEmailReset;