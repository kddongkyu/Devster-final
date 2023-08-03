import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    resetNormMember,
    setEmailChk,
    setEmailIsValid,
    setEmailRegChk, setEmailRegInput, setIdType,
    setIsEmailSent,
    setM_email,
    setSeconds
} from "../../../../redux/normMemberSlice";

function FinderEmailReset(props) {
    const dispatch = useDispatch();
    const isEmailSent = useSelector(state => state.norm.isEmailSent);
    const handleResetEmail = () => {
        const resetConfirm = window.confirm('이메일을 변경하시겠습니까?\n변경후 재인증을 받으셔야합니다.')
        if (resetConfirm) {
            dispatch(resetNormMember());
        }
    }

    return (
        <img
            className='signup-guest-email-reset-icon'
            alt=''
            hidden={!isEmailSent}
            src={require('../../assets/signup_guest_email_reset_icon.svg').default}
            onClick={handleResetEmail}
        />
    );
}

export default FinderEmailReset;