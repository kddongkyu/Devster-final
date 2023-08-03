import React, {useCallback, useEffect, useState} from 'react';
import {resetNormMember} from "../../redux/normMemberSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    CompPassUpdate,
    CompPassUpdateChk,
    FinderCmCp,
    FinderCmCpReg,
    FinderCompEmail, FinderCompSubmit,
    FinderCompSubmitCp,
    FinderRegNumber
} from "./index";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import axios from "axios";
import {jwtHandleError} from "../../api/JwtHandleError";
import {resetCompMember, setIdType} from "../../redux/compMemberSlice";

function FinderCompPass(props) {
    const dispatch = useDispatch();
    const [findByCompReg, setFindByCompReg] = useState(true);
    const [findByRep, setFindByRep] = useState(false);
    const cm_email = useSelector(state => state.comp.cm_email);
    const cm_reg = useSelector(state => state.comp.cm_reg);
    const cm_cp = useSelector(state => state.comp.cm_cp);
    const regChk = useSelector(state => state.comp.regChk);
    const regIsValid = useSelector(state => state.comp.regIsValid);
    const cpChk = useSelector(state => state.comp.cpChk);
    const cpRegChk = useSelector(state => state.comp.cpRegChk);
    const cpIsValid = useSelector(state => state.comp.cpIsValid);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const idType = useSelector(state => state.comp.idType);
    const [userId, setUserId] = useState('');

    const passChangeable = useCallback(async (num) => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/compmember/D0/find/email',
                data: JSON.stringify({'number': num}),
                headers: {'Content-Type': 'application/json'},
            });

            if (res?.status === 200) {
                const userIdChk = res?.data;
                setUserId(userIdChk);
                console.log(userIdChk);
                console.log(userIdChk, cm_email);
                if (userIdChk === cm_email) {
                    dispatch(setIdType(true));
                } else {
                    alert('입력하신 정보와 일치하는 회원이 없습니다.\n확인후 다시 시도해주세요.');
                    dispatch(setIdType(false));
                    dispatch(resetCompMember());
                }
            }
        } catch (error) {
            jwtHandleError(error, toastAlert);
        }
    }, [cm_email]);

    useEffect(() => {
        dispatch(resetNormMember());
    }, [dispatch]);

    useEffect(() => {
        if (regChk && regIsValid) {
            passChangeable(cm_reg);
        } else if (cpChk && cpRegChk && cpIsValid) {
            passChangeable(cm_cp);
        }
    }, [regChk, regIsValid, cpChk, cpRegChk, cpIsValid, cm_reg, cm_cp])

    const selectOnCompReg = () => {
        setFindByCompReg(true);
        setFindByRep(false);
    }

    const selectOnRep = () => {
        setFindByRep(true);
        setFindByCompReg(false);
    }

    return (
        <div>
            <b className='login-devster-text'>Devster 비밀번호 찾기</b>
            <div className='finder-comp-select'>
                <div
                    className={`${findByCompReg ? 'finder-comp-select-norm' : 'finder-comp-select-norm-false'}`}
                    onClick={selectOnCompReg}
                >
                    사업자등록증
                </div>
                <img
                    className='finder-comp-select-bar-icon'
                    alt=''
                    src={require('./assets/login-type-select-bar.svg').default}
                />
                <div
                    className={`${findByRep ? 'finder-comp-select-comp' : 'finder-comp-select-comp-false'}`}
                    onClick={selectOnRep}
                >
                    핸드폰인증
                </div>
            </div>
            {
                findByCompReg &&
                <>
                    <FinderCompEmail/>
                    <div className='finder-comp-reg-input'>
                        <FinderRegNumber/>
                    </div>
                    {
                        regChk && regIsValid && idType &&
                        <div className='finder-comp-reg-passupdate'>
                            <b className='finder-comp-reg-passupdate-text'>새로운 비밀번호 입력</b>
                            <CompPassUpdate/>
                            <CompPassUpdateChk/>
                            <FinderCompSubmit/>
                        </div>
                    }
                </>
            }
            {
                findByRep &&
                <>
                    <FinderCompEmail/>
                    <div className='finder-comp-cp'>
                        <FinderCmCp/>
                        <FinderCmCpReg/>
                    </div>
                    {
                        cpChk && cpRegChk && cpIsValid && idType &&
                        <div className='finder-comp-reg-passupdate'>
                            <b className='finder-comp-cp-text'>새로운 비밀번호 입력</b>
                            <CompPassUpdate/>
                            <CompPassUpdateChk/>
                            <FinderCompSubmitCp/>
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default FinderCompPass;