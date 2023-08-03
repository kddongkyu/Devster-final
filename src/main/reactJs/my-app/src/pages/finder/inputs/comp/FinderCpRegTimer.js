import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCpRegChk, setCpSeconds} from "../../../../redux/compMemberSlice";

function FinderCpRegTimer(props) {
    const dispatch = useDispatch();
    const cpSeconds = useSelector(state => state.comp.cpSeconds);
    const isCpSent = useSelector(state => state.comp.isCpSent);

    const minutes = Math.floor(cpSeconds / 60);
    const displayCpSeconds = cpSeconds % 60;
    let timerMessage = '';

    useEffect(() => {
        if (isCpSent && cpSeconds > 0) {
            const regTimer = setTimeout(() => {
                dispatch(setCpSeconds(cpSeconds - 1));
            }, 1000);
            return () => clearTimeout(regTimer);
        } else if (cpSeconds <= 0) {
            dispatch(setCpRegChk(false));
        }
    }, [isCpSent, cpSeconds]);

    if (isCpSent && cpSeconds > 0) {
        timerMessage = `남은 인증시간 : 
            ${minutes < 10 ? '0' : ''}${minutes}:
            ${displayCpSeconds < 10 ? '0' : ''}${displayCpSeconds}`;
    } else if (cpSeconds <= 0) {
        timerMessage = '인증시간이 만료되었습니다.';
    }

    return (
        <div
            className={`signup-comp-cp-reg-timelef
            ${cpSeconds >= 60 ? '' : 'signup-comp-text-color-error'}`}>
            {timerMessage}
        </div>
    );
}

export default FinderCpRegTimer;