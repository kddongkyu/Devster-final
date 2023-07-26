import React, {useEffect, useState} from 'react';
import './style/SignUpNorm.css';
import {SignUpNormForm} from "./index";
import {useNavigate} from "react-router-dom";
import {InputRegNumber} from "./comp/inputs";

function SignUp(props) {
    const navi=useNavigate();
    const [normMember,setNormMember] = useState(true);
    const [compMember,setCompMember]=useState(false);

    const selectNormMember = () => {
        setNormMember(true);
        setCompMember(false);
    }

    const selectCompMember = () => {
        setNormMember(false);
        setCompMember(true);
    }

    return (
        <div className={normMember && !compMember?'signup-guest':'signup-guest-comp'}>
            <div
                className='signup-guest-intro'
                onClick={()=>navi('/home')}
            >
                <img
                    className='signup-guest-intro-icon'
                    alt=''
                    src={require('./assets/signup_guest_intro_icon.svg').default}
                />
                <div className='signup-guest-intro-icon-text-d'>Devster</div>
                <div className='signup-guest-intro-icon-text-h'>Hello World!</div>
            </div>
            <div className='signup-guest-intro-text'>
                <p className='devster'>Devster는 개발자를 꿈꾸는 학생들과</p>
                <p className='devster'>주니어 개발자들이 모인 커뮤니티 플랫폼입니다.</p>
            </div>
            <div className='signup-guest-choose'>
                <div
                    className={`${normMember?'signup-guest-choose-norm':'signup-guest-choose-norm-false'}`}
                    onClick={selectNormMember}
                >일반회원</div>
                <img
                    className='signup-guest-choose-bar-icon'
                    alt=''
                    src={require('./assets/signup_guest_choose_bar.svg').default}
                />
                <div
                    className={`${compMember?'signup-guest-choose-comp':'signup-guest-choose-comp-false'}`}
                    onClick={selectCompMember}
                >
                    기업회원</div>
            </div>
            {
                normMember &&
                <SignUpNormForm/>
            }
            {
                compMember &&
                <InputRegNumber/>
            }
        </div>
    );
}

export default SignUp;