import React, {useCallback, useEffect, useState} from 'react';
import {resetNormMember, setIdType} from "../../redux/normMemberSlice";
import {useDispatch, useSelector} from "react-redux";
import {FinderEmail, FinderEmailReg, FinderId, FinderNormSubmit, FinderPass, FinderPassChk} from "./index";
import axios from "axios";
import {jwtHandleError} from "../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";

function FinderNormPass({findPass}) {
    const dispatch = useDispatch();
    const m_id = useSelector(state => state.norm.m_id);
    const m_email = useSelector(state => state.norm.m_email);
    const emailChk = useSelector(state => state.norm.emailChk);
    const emailRegChk = useSelector(state => state.norm.emailRegChk);
    const emailIsValid = useSelector(state => state.norm.emailIsValid);
    const idChk = useSelector(state => state.norm.idChk);
    const idIsValid = useSelector(state => state.norm.idIsValid);
    const idType=useSelector(state=>state.norm.idType);
    const [userId, setUserId] = useState('');
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        dispatch(resetNormMember());
    }, [dispatch]);

    useEffect(() => {
        const getUserId = async () => {
            if (emailChk && emailRegChk && emailIsValid && idChk && idIsValid && findPass) {
                try {
                    const res = await axios({
                        method: 'post',
                        url: '/api/member/D0/id',
                        data: JSON.stringify({'email': m_email}),
                        headers: {'Content-Type': 'application/json'},
                    });
                    if (res?.status === 200) {
                        const userIdChk = res?.data.toString();
                        setUserId(userIdChk);
                        if (userIdChk.includes('KAKAO-') || userIdChk.includes('NAVER-')) {
                            dispatch(setIdType(false));
                            alert('소셜계정은 사용할수 없는 서비스입니다.');
                            dispatch(resetNormMember());
                        } else {
                            if (userIdChk === m_id) {
                                dispatch(setIdType(true));
                            } else {
                                alert('입력하신 정보와 일치하는 회원이 없습니다.\n확인후 다시 시도해주세요.');
                                dispatch(setIdType(false));
                                dispatch(resetNormMember());
                            }
                        }
                    }
                } catch (error) {
                    jwtHandleError(error, toastAlert);
                }
            }
        }
        getUserId();
    }, [emailChk, emailRegChk, emailIsValid, idChk, idIsValid, m_email, findPass]);

    return (
        <div>
            <b className='login-devster-text'>Devster 비밀번호 찾기</b>
            <div className='finder-norm-select'>
                <div className='login-type-select-norm'>
                    이메일로 찾기
                </div>
            </div>
            <div className='finder-norm-email-pass'>
                <FinderId/>
                <FinderEmail/>
                <FinderEmailReg/>
            </div>

            {
                emailChk && emailRegChk && emailIsValid && idChk && idIsValid && idType &&
                <div className='finder-norm-pass-update'>
                    <b className='finder-norm-newpass'>새로운 비밀번호 입력</b>
                    <div className='finder-norm-newpass-input'>
                        <FinderPass/>
                        <FinderPassChk/>
                    </div>
                    <FinderNormSubmit/>
                </div>
            }
        </div>
    );
}

export default FinderNormPass;