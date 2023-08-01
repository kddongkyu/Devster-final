import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";
import {resetCompMember, setCm_addr, setCm_reg, setIsSubmitted} from "../../../redux/compMemberSlice";
import axios from "axios";
import {jwtHandleError} from "../../../api/JwtHandleError";
import {useNavigate} from "react-router-dom";

function SignUpCompSubmit(props) {
    const dispatch = useDispatch();
    const navi=useNavigate();
    const cm_reg = useSelector(state => state.comp.cm_reg);
    const cm_compname = useSelector(state => state.comp.cm_compname);
    const cm_email = useSelector(state => state.comp.cm_email);
    const cm_pass = useSelector(state => state.comp.cm_pass);
    const cm_tele = useSelector(state => state.comp.cm_tele);
    const cm_name = useSelector(state => state.comp.cm_name);
    const cm_cp = useSelector(state => state.comp.cm_cp);
    const cm_post = useSelector(state => state.comp.cm_post);
    const cm_addr = useSelector(state => state.comp.cm_addr);
    const cm_addrFirst = useSelector(state => state.comp.cm_addrFirst);
    const cm_addrSecond = useSelector(state => state.comp.cm_addrSecond);
    const submitIsValid = useSelector(state => [
        state.comp.compChk,
        state.comp.emailChk,
        state.comp.emailRegChk,
        state.comp.passChk,
        state.comp.cpChk,
        state.comp.cpRegChk,
        state.comp.compIsValid,
        state.comp.emailIsValid,
        state.comp.passIsValid,
        state.comp.teleIsValid,
        state.comp.nameIsValid,
        state.comp.cpIsValid,
        state.comp.postIsValid,
        state.comp.firstAddrValid,
        state.comp.secondAddrValid,
        state.comp.contractValid,
    ]);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const scrollUp = useSelector(state => [
        state.comp.regIsValid,
        state.comp.compIsValid,
        state.comp.emailIsValid,
        state.comp.passIsValid,
        state.comp.postIsValid,
        state.comp.firstAddrValid,
        state.comp.secondAddrValid,
        state.comp.emailRegChk,
        state.comp.passChk,
    ]);

    const handleOnSubmit = async () => {
        await dispatch(setIsSubmitted(true));
        const combinedAddr = `${cm_addrFirst} ${cm_addrSecond.trim()}`;

        if (submitIsValid.every(Boolean)) {
            try {
                const formData = new FormData();
                formData.append('cm_reg', cm_reg);
                formData.append('cm_compname', cm_compname);
                formData.append('cm_email', cm_email);
                formData.append('cm_pass', cm_pass);
                formData.append('cm_tele', cm_tele);
                formData.append('cm_name', cm_name);
                formData.append('cm_cp', cm_cp);
                formData.append('cm_post', cm_post);
                formData.append('cm_addr', combinedAddr);

                const res = await axios({
                    method: 'post',
                    url: '/api/compmember/D0',
                    data: formData,
                    headers: {'Content-Type': 'application/json'}
                });
                if (res?.status === 200) {
                    dispatch(resetCompMember());
                    navi('/grats',{replace:true});
                } else {
                    dispatch(setIsSubmitted(false));
                    toastAlert(<>회원가입에 실패했습니다.<br/>잠시후 다시 시도해주세요.</>, 'warning');
                }
            } catch (error) {
                dispatch(setIsSubmitted(false));
                jwtHandleError(error, toastAlert);
            }
        } else {
            if (scrollUp.every(Boolean)) {
                dispatch(setIsSubmitted(false));
            } else {
                dispatch(setIsSubmitted(false));
                const element = document.getElementById('compRecheck');
                element.scrollIntoView();
            }
        }
    }
    return (
        <div>
            <div
                className='signup-comp-submit'
                onClick={handleOnSubmit}
            >s
                <div className='signup-comp-submit-box'/>
                <div className='signup-comp-submit-text'>회원가입</div>
            </div>
        </div>
    );
}

export default SignUpCompSubmit;