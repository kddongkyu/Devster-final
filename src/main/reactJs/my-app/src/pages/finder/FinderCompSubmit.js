import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setIsSubmitted} from "../../redux/compMemberSlice";
import axios from "axios";
import {jwtHandleError} from "../../api/JwtHandleError";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";

function FinderCompSubmit(props) {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const cm_reg = useSelector(state => state.comp.cm_reg);
    const cm_pass = useSelector(state => state.comp.cm_pass);
    const submitIsValid = useSelector(state => [
        state.comp.regChk,
        state.comp.passChk,
        state.comp.regIsValid,
        state.comp.passIsValid,
    ]);

    const handleOnSubmit = async () => {
        await dispatch(setIsSubmitted(true));
        if (submitIsValid.every(Boolean)) {
            try {
                const res = await axios({
                    method: 'post',
                    url: '/api/compmember/D0/password',
                    data: JSON.stringify({'number': cm_reg, 'password': cm_pass}),
                    headers: {'Content-Type': 'application/json'},
                })
                if (res?.status === 200) {
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
        <div
            className='finder-comp-submit'
            onClick={handleOnSubmit}
        >
            <div className='finder-comp-submit-box'/>
            <div className='finder-comp-submit-text'>비밀번호 수정</div>
        </div>
    );
}

export default FinderCompSubmit;