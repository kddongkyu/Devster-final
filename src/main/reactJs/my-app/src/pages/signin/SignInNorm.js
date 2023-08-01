<<<<<<< HEAD
import React, { useRef } from "react";
import { userSignIn } from "../../api/SignInApi";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function SignInNorm({ capsLockChk, isCapsOn }) {
  const normIdRef = useRef("");
  const normPwRef = useRef("");
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
=======
import React, {useRef} from 'react';
import {userSignIn} from '../../api/SignInApi';
import {jwtHandleError} from '../../api/JwtHandleError';
import {useSnackbar} from 'notistack';
import ToastAlert from '../../api/ToastAlert';
import Kakao from "../../api/social/Kakao";
import {useNavigate} from "react-router-dom";
import Naver from "../../api/social/Naver";

function SignInNorm({capsLockChk, isCapsOn}) {
    const navi=useNavigate();
    const normIdRef = useRef('');
    const normPwRef = useRef('');
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
>>>>>>> JK

  const normSignIn = async (e) => {
    e.preventDefault();

    const normSignInInfo = {
      id: normIdRef.current.value,
      password: normPwRef.current.value,
    };

    const normUrl = "/api/member/login";

<<<<<<< HEAD
    try {
      await userSignIn(normSignInInfo, normUrl);
      window.location.replace("/home");
    } catch (error) {
      jwtHandleError(error, toastAlert);
=======
        try {
            await userSignIn(normSignInInfo, normUrl);
            navi('/home',{replace:true});
        } catch (error) {
            jwtHandleError(error, toastAlert);
        }
>>>>>>> JK
    }
  };

  const handleOnNormId = (e) => {
    normIdRef.current.value = e.target.value;
  };

  const handleOnNormPw = (e) => {
    normPwRef.current.value = e.target.value;
  };

  return (
    <div>
      <div>
        <b className="login-sns-text">SNS 로그인</b>
        <div className="login-sns-kakao" />
        <div className="login-sns-naver" />
        <div className="login-devster-hr" />
        <b className="login-devster-text">Devster 아이디로 로그인</b>
      </div>
      <form onSubmit={normSignIn}>
        <div>
<<<<<<< HEAD
          <div className="login-devster-id-text">사용자 ID</div>
          <input
            className="login-devster-id-box-input"
            type="text"
            required
            ref={normIdRef}
            onChange={handleOnNormId}
          />
          <div className="login-devster-pw-text">비밀번호</div>
          <input
            className="login-devster-pw-input"
            type="password"
            required
            ref={normPwRef}
            onKeyDown={capsLockChk}
            onChange={handleOnNormPw}
          />
          <div className="login-devster-finder">사용자 ID / 비밀번호 찾기</div>
          <button type="submit" className="login-loginbtn">
            <div className="login-loginbtn-box" />
            <div className="login-loginbtn-text">로그인</div>
          </button>
=======
            <div>
                <b className='login-sns-text'>SNS 로그인</b>
                <Kakao/>
                <Naver/>
                <div className='login-devster-hr'/>
                <b className='login-devster-text'>Devster 아이디로 로그인</b>
            </div>
            <form onSubmit={normSignIn}>
                <div>
                    <div className='login-devster-id-text'>사용자 ID</div>
                    <input
                        className='login-devster-id-box-input'
                        type='text'
                        required
                        ref={normIdRef}
                        onChange={handleOnNormId}
                    />
                    <div className='login-devster-pw-text'>비밀번호</div>
                    <input
                        className='login-devster-pw-input'
                        type='password'
                        required
                        ref={normPwRef}
                        onKeyDown={capsLockChk}
                        onChange={handleOnNormPw}
                    />
                    <div className='login-devster-finder'>사용자 ID / 비밀번호 찾기</div>
                    <button
                        type='submit'
                        className='login-loginbtn'>
                        <div className='login-loginbtn-box'/>
                        <div className='login-loginbtn-text'>로그인</div>
                    </button>
                </div>
            </form>
            {
                isCapsOn &&
                <span className='login-pass-capslock-norm'>*Caps Lock이 켜져 있습니다.</span>
            }
>>>>>>> JK
        </div>
      </form>
      {isCapsOn && (
        <span className="login-pass-capslock-norm">
          *Caps Lock이 켜져 있습니다.
        </span>
      )}
    </div>
  );
}

export default SignInNorm;
