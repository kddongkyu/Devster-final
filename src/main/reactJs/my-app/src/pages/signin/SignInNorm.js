import React, {useRef} from 'react';
import {userSignIn} from "../../api/SignInNormApi";
import {jwtHandleError} from "../../api/JwtHandleError";
import {useNavigate} from "react-router-dom";

function SignInNorm(props) {
    const navi = useNavigate();
    const normIdRef = useRef('');
    const normPwRef = useRef('');

    const normSignIn = async (e) => {
        e.preventDefault();

        const userSignInInfo = {
            id: normIdRef.current.value,
            password: normPwRef.current.value,
        };

        try {
            await userSignIn(userSignInInfo);
            navi('/home');
        } catch (error) {
            jwtHandleError(error);
        }
    }

    return (
        <div>
            <div>
                <b className='login-sns-text'>SNS 로그인</b>
                <div className='login-sns-kakao'/>
                <div className='login-sns-naver'/>
                <div className='login-devster-hr'/>
                <b className='login-devster-text'>Devster 아이디로 로그인</b>
            </div>
            <form onSubmit={normSignIn}>
                <div>
                    <div className='login-devster-id-text'>사용자 ID</div>
                    <div className='login-devster-id-remember'>
                        <div className='login-devster-id-remember-text'>ID 기억하기</div>
                        <div className='login-devster-id-remember-ck'/>
                    </div>
                    <input
                        className='login-devster-id-box-input'
                        type='text'
                        required
                        ref={normIdRef}
                        onChange={(e) => {
                            normIdRef.current.value = e.target.value
                        }}
                    />
                    <div className='login-devster-pw-text'>비밀번호</div>
                    <input
                        className='login-devster-pw-input'
                        type='password'
                        required
                        ref={normPwRef}
                        onChange={(e) => {
                            normPwRef.current.value = e.target.value
                        }}
                    />
                    <div className='login-devster-finder'>사용자 ID / 비밀번호 찾기</div>
                    <button type='submit' className='login-loginbtn'>
                        <div className='login-loginbtn-box'/>
                        <div className='login-loginbtn-text'>로그인</div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignInNorm;