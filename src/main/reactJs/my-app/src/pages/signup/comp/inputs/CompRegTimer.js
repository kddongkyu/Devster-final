import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setEmailRegChk, setSeconds} from "../../../../redux/compMemberSlice";

function CompRegTimer(props) {
    const dispatch = useDispatch();
    const seconds = useSelector(state => state.comp.seconds);
    const isEmailSent = useSelector(state => state.comp.isEmailSent);

    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    let timerMessage = '';

    useEffect(() => {
        if (isEmailSent && seconds > 0) {
            const regTimer = setTimeout(() => {
                dispatch(setSeconds(seconds - 1));
            }, 1000);
            return () => clearTimeout(regTimer);
        } else if (seconds <= 0) {
            dispatch(setEmailRegChk(false));
        }
    }, [isEmailSent, seconds]);

    if (isEmailSent && seconds > 0) {
        timerMessage = `남은 인증시간 : 
            ${minutes < 10 ? '0' : ''}${minutes}:
            ${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
    } else if (seconds <= 0) {
        timerMessage = '인증시간이 만료되었습니다.';
    }

    return (
        <div
            className={`signup-comp-email-reg-timelef
            ${seconds >= 60 ? '' : 'signup-comp-text-color-error'}`}>
            {timerMessage}
        </div>
    );
}

export default CompRegTimer;