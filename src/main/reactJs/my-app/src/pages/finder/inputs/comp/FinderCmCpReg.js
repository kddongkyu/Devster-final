import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
    setCpRegChk,
    setCpRegInput,
    setIsCpSent,
    setCpSeconds,
    setCpSendingInProg
} from "../../../../redux/compMemberSlice";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";
import {jwtHandleError} from "../../../../api/JwtHandleError";
import {FinderCpRegTimer} from "../../index";

function FinderCmCpReg(props) {
    const dispatch = useDispatch();
    const cm_cp = useSelector(state => state.comp.cm_cp);
    const cpSeconds = useSelector(state => state.comp.cpSeconds);
    const cpRegInput = useSelector(state => state.comp.cpRegInput);
    const cpIsValid = useSelector(state => state.comp.cpIsValid);
    const isCpSent = useSelector(state => state.comp.isCpSent);
    const cpRegChk = useSelector(state => state.comp.cpRegChk);
    const cpSendingInProg = useSelector(state => state.comp.cpSendingInProg);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const [cpRegNum, setCpRegNum] = useState('');

    useEffect(() => {
        if (!cpRegChk && isSubmitted) {
            toastAlert('휴대폰 인증을 진행해주세요.', 'warning');
        }
    }, [isSubmitted]);

    const handleSendButton = async () => {
        if (cpRegChk) {
            return;
        }
        try {
            dispatch(setCpSendingInProg(true));
            const res = await axios({
                method: 'post',
                url: '/api/compmember/D0/sms',
                data: JSON.stringify({number: cm_cp}),
                headers: {'Content-Type': 'application/json'}
            });

            if (res?.status === 200) {
                dispatch(setIsCpSent(true));
                dispatch(setCpSeconds(180));
                setCpRegNum(res.data);
                dispatch(setCpRegInput(''));
                toastAlert(isCpSent ? '인증번호가 재발송되었습니다.' : '인증번호가 발송되었습니다.', 'success');
                dispatch(setCpSendingInProg(false));
            } else {
                dispatch(setIsCpSent(false));
                toastAlert(<>인증번호 발송에 실패했습니다.<br/>잠시후 다시 시도해주세요.</>, 'warning');
                dispatch(setCpSendingInProg(false));
            }
        } catch (error) {
            dispatch(setIsCpSent(false));
            dispatch(setCpSendingInProg(false));
            jwtHandleError(error, toastAlert);
        }
    }

    const handleEmailRegChange = (e) => {
        dispatch(setCpRegInput(e.target.value));
    }

    const handleRegChk = () => {
        if (isCpSent && cpRegNum === Number(cpRegInput)) {
            dispatch(setCpRegChk(true));
            dispatch(setCpSeconds(null));
            toastAlert('인증 되었습니다.', 'success');
        } else {
            dispatch(setCpRegChk(false));
            toastAlert(<>인증에 실패했습니다.<br/>인증번호를 확인해주세요.</>, 'warning');
        }
    }

    return (
        <div>
            {
                !cpSendingInProg &&
                <div
                    className={`signup-comp-cp-reg-send
                ${cpIsValid && !cpRegChk ? '' : 'signup-comp-button-disabled'}`}
                    onClick={cpIsValid ? () => handleSendButton() : null}
                >
                    <div className='signup-comp-cp-inputbox1'/>
                    <div className='signup-comp-cp-reg-send-te'>
                        {
                            !isCpSent && !cpRegChk ? '인증번호 전송' : '재전송'
                        }
                    </div>
                </div>
            }
            {
                cpSendingInProg &&
                <div
                    className={`signup-comp-cp-reg-send
                ${cpIsValid && !cpRegChk ? '' : 'signup-comp-button-disabled'}`}
                >
                    <div className='signup-comp-cp-inputbox1'/>
                    <div className='signup-comp-cp-reg-send-te'>
                        <div className='signup-comp-cp-reg-send-inprogress'></div>
                    </div>
                </div>
            }
            <div className='signup-comp-cp-reg-input'>
                <input
                    type='text'
                    className='signup-comp-cp-input-reg-b'
                    disabled={!isCpSent || cpRegChk || cpSeconds <= 0}
                    value={cpRegInput}
                    onChange={handleEmailRegChange}
                />
                <div
                    className={`signup-comp-cp-reg-chk
                    ${!isCpSent || cpRegChk || cpSeconds <= 0 ? 'signup-comp-button-disabled' : ''}`}
                    onClick={handleRegChk}
                >
                    <div className='signup-comp-cp-inputbox2'/>
                    <div className='signup-comp-cp-reg-send-te1'>확인</div>
                </div>
            </div>
            {
                isCpSent && cpSeconds !== null &&
                <FinderCpRegTimer/>
            }
        </div>
    );
}

export default FinderCmCpReg;