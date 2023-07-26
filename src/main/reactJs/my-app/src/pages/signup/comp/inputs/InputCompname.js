import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCm_compname, setCompChk, setCompIsValid} from '../../../../redux/compMemberSlice';
import axios from 'axios';
import {useSnackbar} from 'notistack';
import ToastAlert from '../../../../api/ToastAlert';
import {jwtHandleError} from '../../../../api/JwtHandleError';


function InputCompname(props) {
    const dispatch = useDispatch();
    const cm_compname = useSelector(state => state.comp.cm_compname);
    const compIsValid = useSelector(state => state.comp.compIsValid);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
    const [isCompTouched, setIsCompTouched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isInputValid, setIsInputValid] = useState(true);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        if (!compIsValid && isSubmitted) {
            setIsCompTouched(true);
        }
    }, [isSubmitted]);

    const checkComp = useCallback(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/compmember/D0/compname',
                data: JSON.stringify({'companyName': cm_compname}),
                headers: {'Content-Type': 'application/json'}
            });
            if (res?.status === 200) {
                if (res.data === false) {
                    dispatch(setCompIsValid(true));
                    setIsInputValid(true);
                    setErrorMessage('사용 가능한 회사명입니다.');
                } else {
                    dispatch(setCompIsValid(false));
                    setIsInputValid(false);
                    setErrorMessage('이미 사용중인 회사명입니다.');
                }
            }
        } catch (error) {
            dispatch(setCompIsValid(false));
            setIsInputValid(false);
            setErrorMessage('서버에 문제가 발생했습니다.');
            jwtHandleError(error, toastAlert);
        }
    }, [dispatch, cm_compname]);

    useEffect(() => {
        if (isCompTouched) {
            const timer = setTimeout(() => {
                const compPattern = /^[a-zA-Z0-9가-힣]{1,20}$/.test(cm_compname);
                const isCompValid = cm_compname.trim() !== '' && compPattern;
                dispatch(setCompChk(isCompValid));
                if (!cm_compname.trim()) {
                    setErrorMessage('필수 입력 항목입니다.');
                    setIsInputValid(false);
                } else if (!isCompValid) {
                    setErrorMessage('회사명을 확인해주세요.');
                    setIsInputValid(false);
                } else {
                    checkComp();
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [cm_compname, dispatch, isCompTouched, checkComp]);

    const handleIdChange = (e) => {
        if (!isCompTouched) {
            setIsCompTouched(true);
        }
        dispatch(setCm_compname(e.target.value));
        dispatch(setCompIsValid(false));
    }

    useEffect(() => {
        console.log('compIsValid changed: ', compIsValid);
    }, [compIsValid]);

    return (
        <div className='signup-comp-compname-position-box'>
            <div
                className='signup-comp-compname-text'
                id='recheck'
            >
                <span>상호명</span>
                <span className='signup-comp-input-name'> *</span>
            </div>
            {
                isCompTouched &&
                <div
                    className={`signup-comp-compname-exist-text
                    ${isInputValid ? 'signup-comp-text-color-confirm' : 'signup-comp-text-color-error'}`}
                >
                    {errorMessage}
                </div>
            }
            <input
                type='text'
                className={`${isInputValid ? 'signup-comp-compname-inputbox' : 'signup-comp-compname-inputbox-error'}`}
                value={cm_compname}
                required={isSubmitted}
                onChange={handleIdChange}
            />
        </div>
    );
}

export default InputCompname;