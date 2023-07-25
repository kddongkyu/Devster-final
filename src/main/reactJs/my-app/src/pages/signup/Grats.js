import React from 'react';
import './style/Grats.css';
import {useNavigate} from "react-router-dom";
import Confetti from 'react-confetti'

function Grats(props) {
    const navi = useNavigate();

    const handleHomeBtn = () => {
        navi('/home');
    }

    const handleSignInBtn = () => {
        navi('/signin');
    }

    return (
        <div className='signup-success'>
            <div className='signup-success-box'>
                <img
                    className='signup-success-icon'
                    alt=''
                    src={require('./assets/signup_success_icon.svg').default}
                />
                <div className='signup-success-text'>
                    <b className='signup-success-text-success'>회원 가입 완료</b>
                    <div className='signup-success-text-ty'>
                        Devster의 회원이 되어주셔서 감사합니다.
                    </div>
                </div>
            </div>
            <div
                className='signup-success-back'
                onClick={handleHomeBtn}
            >
                <div className='signup-success-back-box'/>
                <div className='signup-success-back-text'>홈페이지</div>
            </div>
            <div
                className='signup-success-login'
                onClick={handleSignInBtn}
            >
                <div className='signup-success-login-box'/>
                <div className='signup-success-login-text'>로그인</div>
            </div>
            <Confetti
                numberOfPieces={250}
                recycle={false}
                drawShape={ctx => {
                    ctx.scale(3, 3)
                    ctx.beginPath()
                    ctx.moveTo(0, 0)
                    ctx.lineTo(1, 0)
                    ctx.lineTo(1, 1)
                    ctx.lineTo(0, 1)
                    ctx.closePath()
                    ctx.stroke()
                }}
            />
        </div>
    );
}

export default Grats;