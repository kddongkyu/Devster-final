import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";
import {resetNormMember, setIsSubmitted} from "../../../redux/normMemberSlice";
import axios from "axios";
import {jwtHandleError} from "../../../api/JwtHandleError";

function SocialSubmit(props) {
    const dispatch=useDispatch();
    const navi=useNavigate();
    const m_email=useSelector(state=>state.norm.m_email);
    const m_id=useSelector(state=>state.norm.m_id);
    const m_socialid=useSelector(state=>state.norm.m_socialid);
    const m_pass=useSelector(state=>state.norm.m_pass);
    const m_socialtype=useSelector(state=>state.norm.m_socialtype);
    const m_name=useSelector(state=>state.norm.m_name);
    const m_nickname=useSelector(state=>state.norm.m_nickname);
    const ai_idx=useSelector(state=>state.norm.ai_idx);
    const ai_name=useSelector(state=>state.norm.ai_name);
    const submitIsValid = useSelector(state => [
        state.norm.nicknameChk,
        state.norm.nameIsValid,
        state.norm.nicknameIsValid,
        state.norm.academyIsValid,
        state.norm.contractValid
    ]);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const handleOnSubmit = async () => {
        await dispatch(setIsSubmitted(true));
        if(submitIsValid.every(Boolean)) {
            try {
                const formData = new FormData();
                formData.append('m_email',m_email);
                formData.append('m_id',m_id);
                formData.append('m_socialid',m_socialid);
                formData.append('m_pass',m_pass);
                formData.append('m_socialtype',m_socialtype);
                formData.append('m_name',m_name);
                formData.append('m_nickname',m_nickname);
                formData.append('ai_idx',ai_idx);
                formData.append('ai_name',ai_name);

                const res = await axios({
                    method:'post',
                    url:'/api/member/D0',
                    data: formData,
                    headers:{'Content-Type':'application/json'}
                });
                if(res?.status === 200) {
                    dispatch(resetNormMember());
                    navi('/grats',{replace:true});
                } else {
                    dispatch(setIsSubmitted(false));
                    toastAlert(<>회원가입에 실패했습니다.<br/>잠시후 다시 시도해주세요.</>,'warning');
                }
            } catch(error) {
                dispatch(setIsSubmitted(false));
                jwtHandleError(error,toastAlert);
            }
        } else {
            dispatch(setIsSubmitted(false));
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

export default SocialSubmit;