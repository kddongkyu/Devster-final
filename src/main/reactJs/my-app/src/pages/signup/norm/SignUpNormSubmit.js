import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setIsSubmitted} from "../../../redux/normMemberSlice";
import axios from "axios";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";
import {jwtHandleError} from "../../../api/JwtHandleError";

function SignUpNormSubmit(props) {
    const dispatch = useDispatch();
    const m_name = useSelector(state => state.norm.m_name);
    const m_id = useSelector(state => state.norm.m_id);
    const m_email = useSelector(state => state.norm.m_email);
    const m_pass = useSelector(state => state.norm.m_pass);
    const m_nickname = useSelector(state => state.norm.m_nickname);
    const ai_idx = useSelector(state => state.norm.ai_idx);
    const ai_name = useSelector(state => state.norm.ai_name);
    const submitIsValid = useSelector(state => [
        state.norm.idChk,
        state.norm.emailChk,
        state.norm.emailRegChk,
        state.norm.passChk,
        state.norm.nicknameChk,
        state.norm.nameIsValid,
        state.norm.idIsValid,
        state.norm.emailIsValid,
        state.norm.passIsValid,
        state.norm.nicknameIsValid,
        state.norm.academyIsValid,
        state.norm.contractValid
    ]);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const handleOnSubmit = async () => {
        await dispatch(setIsSubmitted(true));
        if (submitIsValid.every(Boolean)) {
            try {
                const formData = new FormData();
                formData.append('m_name', m_name);
                formData.append('m_id', m_id);
                formData.append('m_email', m_email);
                formData.append('m_pass', m_pass);
                formData.append('m_nickname', m_nickname);
                formData.append('ai_idx', ai_idx);
                formData.append('ai_name', ai_name);

                const res = await axios({
                    method: 'post',
                    url: '/api/member/D0',
                    data: formData,
                    headers:{'Content-Type':'application/json'}
                });
                if(res?.status === 200) {
                    window.location.replace('/grats');
                } else {
                    dispatch(setIsSubmitted(false));
                    toastAlert(<>회원가입에 실패했습니다.<br/>잠시후 다시 시도해주세요.</>,'warning');
                }
            } catch (error) {
                dispatch(setIsSubmitted(false));
                jwtHandleError(error,toastAlert);
            }
        } else {
            dispatch(setIsSubmitted(false));
            const element = document.getElementById('recheck');
            element.scrollIntoView();
        }
    }

    return (
        <div>
            <div
                className='signup-guest-submit'
                onClick={handleOnSubmit}
            >
                <div className='signup-guest-submit-box'/>
                <div className='signup-guest-submit-text'>회원가입</div>
            </div>
        </div>
    );
}

export default SignUpNormSubmit;