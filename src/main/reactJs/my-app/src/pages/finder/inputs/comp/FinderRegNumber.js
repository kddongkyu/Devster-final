import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {resetCompMember, setCm_reg, setRegChk, setRegIsValid} from "../../../../redux/compMemberSlice";
import axios from "axios";
import {jwtHandleError} from "../../../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";

function FinderRegNumber(props) {
    const dispatch = useDispatch();
    const cm_reg = useSelector(state => state.comp.cm_reg);
    const regIsValid = useSelector(state => state.comp.regIsValid);

    const [isRegTouched, setIsRegTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [RegValidMsg, setRegValidMsg] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const RegServiceKey = process.env.REACT_APP_REGSERVICEKEY;

    useEffect(() => {
        dispatch(resetCompMember());
    }, [dispatch]);

    const checkReg = useCallback(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/compmember/D0/regnum',
                data: JSON.stringify({'regnum': cm_reg}),
                headers: {'Content-Type': 'application/json'}
            });

            if (res?.status === 200) {
                if (res.data === true) {
                    setIsInputValid(true);
                    setErrorMessage('');
                    ApiRegCheck(cm_reg);
                } else {
                    dispatch(setRegIsValid(false));
                    setIsInputValid(false);
                    setErrorMessage('가입되지 않은 사업자 입니다.');
                }
            }
        } catch (error) {
            jwtHandleError(error, toastAlert);
        }
    }, [dispatch, cm_reg]);

    const ApiRegCheck = useCallback(async (cm_reg) => {
        const data = {'b_no': [cm_reg]}
        try {
            const res = await axios({
                method: 'post',
                url: `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${RegServiceKey}`,
                data: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });

            if (res?.status === 200) {
                const code = res.data.data[0].b_stt_cd;
                if (code === '01') {
                    dispatch(setRegIsValid(true));
                    setRegValidMsg('인증 되었습니다.');
                    setIsInputValid(true);
                } else if (code === '02') {
                    dispatch(setRegIsValid(false));
                    setRegValidMsg('휴/폐업한 사업자등록번호 입니다.');
                    setIsInputValid(false);
                } else {
                    dispatch(setRegIsValid(false));
                    setRegValidMsg('사업자등록번호를 확인해주세요.');
                    setIsInputValid(false);
                }
            }
        } catch (error) {
            jwtHandleError(error, toastAlert, regIsValid);
        }
    }, [cm_reg, dispatch]);

    useEffect(() => {
        if (isRegTouched) {
            const timer = setTimeout(() => {
                // dispatch(setCm_reg(pureCm_reg));
                const regPattern = /^[0-9]{10}$/.test(cm_reg);
                const isRegValid = cm_reg.trim() !== '' && regPattern;
                dispatch(setRegChk(isRegValid));
                if (!cm_reg.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setRegValidMsg('');
                    setIsInputValid(false);
                } else if (!isRegValid) {
                    setErrorMessage('사업자등록번호를 확인해주세요.');
                    setRegValidMsg('');
                    setIsInputValid(false);
                } else {
                    checkReg();
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [cm_reg, dispatch, isRegTouched, checkReg]);

    const handleRegChange = (e) => {
        if (!isRegTouched) {
            setIsRegTouched(true);
        }
        const pureCm_reg = ((e.target.value).replace(/-/g, '')).trim();
        dispatch(setCm_reg(pureCm_reg));
        dispatch(setRegIsValid(false));
    }

    const handleRegKeyDown = (e) => {
        if (e.key === '-' || e.key === ' ') {
            e.preventDefault();
        }
    }

    useEffect(() => {
        dispatch(resetCompMember());
    }, [dispatch]);

    return (
        <div className='finder-comp-reg'>
            <div className='signup-company-compreg-text'>
                사업자 등록번호
                <span className='signup-comp-input-name'> *</span>
            </div>
            <div className='signup-company-compreg-msg'>
                {errorMessage}
            </div>
            <input
                type='text'
                className={`${isInputValid ? 'signup-company-compreg-inputbo' : 'signup-company-compreg-inputbo-error'}`}
                value={cm_reg}
                onChange={handleRegChange}
                onKeyDown={handleRegKeyDown}
            />
            <div
                className={`signup-company-compreg-confirm
                ${isInputValid ? 'signup-comp-text-color-confirm' : 'signup-comp-text-color-error'}`}
            >
                <div className='signup-comp-reg-msg'>{RegValidMsg}</div>
            </div>
        </div>
    );
}

export default FinderRegNumber;