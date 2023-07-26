import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCm_cp, setCpChk, setCpIsValid} from "../../../../redux/compMemberSlice";
import axios from "axios";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";
import {jwtHandleError} from "../../../../api/JwtHandleError";
import {CpReset} from "./index";



function InputCmCp(props) {
    const dispatch = useDispatch();
    const cm_cp = useSelector(state => state.comp.cm_cp);
    const cpIsValid = useSelector(state => state.comp.cpIsValid);
    const isCpSent = useSelector(state => state.comp.isCpSent);
    const cpRegChk = useSelector(state => state.comp.cpRegChk);
    const cpSendingInProg = useSelector(state => state.comp.cpSendingInProg);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
    const [isCpTouched, setIsCpTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        if (!cpIsValid && isSubmitted) {
            setIsCpTouched(true);
        }
    }, [isSubmitted]);

    const checkCp = useCallback(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/compmember/D0/hp',
                data: JSON.stringify({hp: cm_cp}),
                headers: {'Content-Type': 'application/json'}
            });
            if (res?.status === 200) {
                if (res.data === false) {
                    dispatch(setCpIsValid(true));
                    setIsInputValid(true);
                    setErrorMessage(cpRegChk ? '인증 되었습니다.' : '사용 가능한 번호입니다.');
                } else {
                    dispatch(setCpIsValid(false));
                    setIsInputValid(false);
                    setErrorMessage('이미 사용중인 번호입니다.');
                }
            }
        } catch (error) {
            dispatch(setCpIsValid(false));
            setIsInputValid(false);
            setErrorMessage('서버에 문제가 발생했습니다.');
            jwtHandleError(error,toastAlert);
        }
    }, [dispatch, cm_cp, cpRegChk]);

    useEffect(() => {
        if (isCpTouched) {
            const timer = setTimeout(() => {
                const cpPattern = /^01[016789]\d{7,8}$/.test(cm_cp);
                const isCpValid = cm_cp.trim() !== '' && cpPattern;
                dispatch(setCpChk(isCpValid));
                if (!cm_cp.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!isCpValid) {
                    setErrorMessage('번호를 확인해주세요.');
                    setIsInputValid(false);
                } else {
                    checkCp()
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [cm_cp, dispatch, isCpTouched, checkCp]);

    const handleCpChange = (e) => {
        if (!isCpTouched) {
            setIsCpTouched(true);
        }
        const pureCm_cp=((e.target.value).replace(/-/g, '')).trim();
        dispatch(setCm_cp(pureCm_cp));
        dispatch(setCpIsValid(false));
    }

    const handleCpKeyDown=(e)=> {
        if(e.key === '-' || e.key === ' ') {
            e.preventDefault();
        }
    }

    useEffect(() => {
        console.log('cpIsValid changed:', cpIsValid);
    }, [cpIsValid])

    return (
        <div>
            <div className='signup-comp-cp-text'>
                <span>담당자 연락처</span>
                <span className='signup-comp-input-name'> *</span>
            </div>
            {
                isCpTouched &&
                <div
                    className={`signup-comp-cp-exist-text
                    ${isInputValid ? 'signup-comp-text-color-confirm' : 'signup-comp-text-color-error'}`}
                >
                    {errorMessage}
                </div>
            }
            <div>
                <input
                    type='text'
                    className={`${isInputValid ? 'signup-comp-cp-inputbox' : 'signup-comp-cp-inputbox-error'}`}
                    disabled={isCpSent || cpSendingInProg}
                    value={cm_cp}
                    onChange={handleCpChange}
                    onKeyDown={handleCpKeyDown}
                />
                <CpReset/>
            </div>
        </div>
    );
}

export default InputCmCp;