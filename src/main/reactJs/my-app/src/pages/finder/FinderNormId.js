import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FinderEmail, FinderEmailReg} from "./index";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {resetNormMember} from "../../redux/normMemberSlice";
import {jwtHandleError} from "../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";


function FinderNormId({findId}) {
    const dispatch = useDispatch();
    const m_email = useSelector(state => state.norm.m_email);
    const emailChk = useSelector(state => state.norm.emailChk);
    const emailRegChk = useSelector(state => state.norm.emailRegChk);
    const emailIsValid = useSelector(state => state.norm.emailIsValid);
    const [userId, setUserId] = useState('');
    const navi = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        dispatch(resetNormMember());
    }, [dispatch]);

    useEffect(() => {
        if (emailChk && emailRegChk && emailIsValid && findId) {
            try {
                axios({
                    method: 'post',
                    url: '/api/member/D0/id',
                    data: JSON.stringify({'email': m_email}),
                    headers: {'Content-Type': 'application/json'},
                })
                    .then(res => {
                        setUserId(res?.data);
                    });
            } catch (error) {
                jwtHandleError(error, toastAlert);
            }
        }
    }, [emailChk, emailRegChk, emailIsValid, m_email, findId]);

    return (
        <div>
            <b className='login-devster-text'>Devster 아이디 찾기</b>
            <div className='finder-norm-select'>
                <div className='login-type-select-norm'>
                    이메일로 찾기
                </div>
            </div>
            <div className='finder-norm-email-verify'>
                <FinderEmail/>
                <FinderEmailReg/>
            </div>
            {
                emailChk && emailRegChk && emailIsValid &&
                <div className='finder-norm-found'>
                    <div className='membership-type'>
                        {
                            userId.includes('KAKAO-') || userId.includes('NAVER-') ?
                                '소셜회원 아이디' : '일반회원 아이디'
                        }
                        <div className='user-id'>
                            {
                                userId.includes('KAKAO-') || userId.includes('NAVER-') ?
                                    '소셜아이디로 로그인을 시도해주세요.' : `${userId}`
                            }
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
            }
        </div>
    );
}

export default FinderNormId;