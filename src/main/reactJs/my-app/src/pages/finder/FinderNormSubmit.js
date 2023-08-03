import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {setIsSubmitted} from "../../redux/normMemberSlice";
import axios from "axios";
import {jwtHandleError} from "../../api/JwtHandleError";

function FinderNormSubmit(props) {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const m_email = useSelector(state => state.norm.m_email);
    const m_pass = useSelector(state => state.norm.m_pass);
    const submitIsValid = useSelector(state => [
        state.norm.emailChk,
        state.norm.emailRegChk,
        state.norm.passChk,
        state.norm.emailIsValid,
        state.norm.passIsValid,
    ]);
    const handleOnSubmit = async () => {
        await dispatch(setIsSubmitted(true));
        if (submitIsValid.every(Boolean)) {
            try {
                const res = await axios({
                    method:'post',
                    url:'/api/member/D0/password',
                    data:JSON.stringify({'email':m_email,'password':m_pass}),
                    headers:{'Content-Type':'application/json'},
                })
                if(res?.status === 200) {
                    alert('정상 처리 되었습니다.\n로그인 페이지로 이동합니다.');
                    navi('/signin');
                }
            } catch (error) {
                dispatch(setIsSubmitted(false));
                jwtHandleError(error,toastAlert);
            }
        } else {
            dispatch(setIsSubmitted(false));
        }
    }

    return (
        <div style={{position: 'relative', top: '-53rem'}}>
            <div
                className='finder-norm-submit'
                onClick={handleOnSubmit}
            >
                <div className='finder-norm-submit-box'>
                    <div className='finder-norm-submit-text'>비밀번호 수정</div>
                </div>
            </div>
        </div>
    );
}

export default FinderNormSubmit;