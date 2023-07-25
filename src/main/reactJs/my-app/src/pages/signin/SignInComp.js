import React, {useRef} from 'react';
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {userSignIn} from "../../api/SignInApi";
import {jwtHandleError} from "../../api/JwtHandleError";

function SignInComp(props) {
    const compIdRef = useRef('');
    const compPwRef = useRef('');
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const compSignIn = async (e) => {
        e.preventDefault();

        const compSignInInfo = {
            id: compIdRef.current.value,
            password: compPwRef.current.value,
        };

        const compUrl = '/api/compmember/login';

        try {
            await userSignIn(compSignInInfo, compUrl);
            // window.location.replace('/home');
        } catch (error) {
            jwtHandleError(error, toastAlert);
        }
    }

    const handleOnCompId = (e) => {
        compIdRef.current.value = e.target.value;
    }

    const handleOnCompPw = (e) => {
        compPwRef.current.value = e.target.value;
    }

    return (
        <div>
            <b className='login-company-devster'>Devster 아이디로 로그인</b>
            <form onSubmit={compSignIn}>
                <div>
                    <div className='login-company-email'>E-mail</div>
                    <input
                        type='text'
                        className='login-company-email-input'
                        ref={compIdRef}
                        onChange={handleOnCompId}
                    />
                    <div className='login-company-pw-text'>비밀번호</div>
                    <input
                        type='password'
                        className='login-company-pw-input'
                        ref={compPwRef}
                    />
                    <div className='login-company-finder'>Email / 비밀번호 찾기</div>
                    <button
                        type='submit'
                        className='login-company-loginbtn'>
                        <div className='comp-loginbtn-box'/>
                        <div className='comp-loginbtn-text'>로그인</div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignInComp;