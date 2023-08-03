import React, {useEffect, useState} from 'react';
import {FinderCmCp, FinderCmCpReg, FinderRegNumber} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {resetCompMember} from "../../redux/compMemberSlice";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtHandleError} from "../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";

function FinderCompId(props) {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const [userId, setUserId] = useState('');
    const [findByCompReg, setFindByCompReg] = useState(true);
    const [findByRep, setFindByRep] = useState(false);
    const cm_reg = useSelector(state => state.comp.cm_reg);
    const cm_cp = useSelector(state => state.comp.cm_cp);
    const regChk = useSelector(state => state.comp.regChk);
    const regIsValid = useSelector(state => state.comp.regIsValid);
    const cpChk = useSelector(state => state.comp.cpChk);
    const cpRegChk = useSelector(state => state.comp.cpRegChk);
    const cpIsValid = useSelector(state => state.comp.cpIsValid);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        dispatch(resetCompMember());
    }, [dispatch]);

    useEffect(() => {
        const findCompId = async () => {
            if (regChk && regIsValid) {
                try {
                    const res = await axios({
                        method: 'post',
                        url: '/api/compmember/D0/find/email',
                        data: JSON.stringify({'number': cm_reg}),
                        headers: {'Content-Type': 'application/json'},
                    });

                    if (res?.status === 200) {
                        setUserId(res.data);
                    }
                } catch (error) {
                    jwtHandleError(error, toastAlert);
                }
            } else if (cpChk && cpRegChk && cpIsValid) {
                try {
                    const res = await axios({
                        method: 'post',
                        url: '/api/compmember/D0/find/email',
                        data: JSON.stringify({'number': cm_cp}),
                        headers: {'Content-Type': 'application/json'},
                    });

                    if (res?.status === 200) {
                        setUserId(res.data);
                    }
                } catch (error) {
                    jwtHandleError(error, toastAlert);
                }
            }
        }
        findCompId();
    }, [regChk, regIsValid, cm_reg, cpChk, cpRegChk, cpIsValid, cm_cp]);

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
            <b className='login-devster-text'>Devster 아이디 찾기</b>
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
                    <FinderRegNumber/>
                    {
                        regChk && regIsValid &&
                        <div className='finder-comp-found'>
                            <div className='finder-norm-found'>
                                <div className='membership-type'>
                                    기업회원 이메일
                                    <div className='user-id'>
                                        {userId}
                                    </div>
                                </div>

                                <div
                                    className='login-link'
                                    onClick={() => {
                                        navi('/signin')
                                    }}
                                >
                                    로그인
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
            {
                findByRep &&
                <>
                    <div className='finder-comp-cp-id'>
                        <FinderCmCp/>
                        <FinderCmCpReg/>
                    </div>
                    {
                        cpChk && cpRegChk && cpIsValid &&
                        <div className='finder-comp-found'>
                            <div className='finder-norm-found'>
                                <div className='membership-type'>
                                    기업회원 아이디
                                    <div className='user-id'>
                                        {userId}
                                    </div>
                                </div>

                                <div
                                    className='login-link'
                                    onClick={() => {
                                        navi('/signin')
                                    }}
                                >
                                    로그인
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default FinderCompId;