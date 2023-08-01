import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import '../style/Social.css';
import {SocialAcademy, SocialName, SocialNickname, SocialUpload} from "./inputs";
import {SocialContract, SocialSubmit} from "../index";
import {useDispatch} from "react-redux";
import {
    resetNormMember,
    setM_email,
    setM_id,
    setM_pass,
    setM_socialid,
    setM_socialtype
} from "../../../redux/normMemberSlice";

function SocialForm(props) {
    const location = useLocation();
    const navi = useNavigate();
    const dispatch = useDispatch();
    const socialPw = process.env.REACT_APP_SOCIAL_PW;
    useEffect(() => {
        dispatch(resetNormMember());
        try {
            const socialData = location.state
            if (socialData) {
                dispatch(setM_email(socialData.resData.email));
                dispatch(setM_id(`${socialData.type}-${socialData.resData.email}`));
                dispatch(setM_socialid(socialData.resData.id));
                dispatch(setM_pass(socialPw));
                dispatch(setM_socialtype(socialData.type));
            } else {
                throw new Error('No social data');
            }
        } catch (error) {
            let errorMessage = '세션이 만료되었습니다.\n메인페이지로 돌아갑니다.';
            if (error.message === 'No social data') {
                errorMessage = '세션이 만료되었습니다.\n메인페이지로 돌아갑니다.';
            }
            alert(errorMessage);
            navi('/home', {replace: true});
        }
    }, [dispatch]);

    return (
        <div className='social-member'>
            <div
                className='social-intro'
                onClick={() => navi('/home', {replace: true})}
            >
                <img
                    className='social-intro-icon'
                    alt=''
                    src={require('../assets/signup_guest_intro_icon.svg').default}
                />
                <div className='social-intro-icon-text-d'>Devster</div>
                <div className='social-intro-icon-text-h'>Hello World!</div>
            </div>
            <div className='social-intro-text'>
                <p className='social-devster'>Devster는 개발자를 꿈꾸는 학생들과</p>
                <p className='social-devster'>주니어 개발자들이 모인 커뮤니티 플랫폼입니다.</p>
            </div>
            <div className='social-choose'>
                <div className='social-choose-comp'>
                    SNS 회원가입
                </div>
            </div>
            <div className='social-input-top'>
                <SocialUpload/>
                <SocialName/>
            </div>
            <div className='social-input-bot'>
                <SocialNickname/>
                <SocialAcademy/>
                <div className='signup-guest-hr1'/>
                <SocialContract/>
                <SocialSubmit/>
                <div className='signup-guest-signin'>
                    <div className='signup-guest-signin-text'>이미 회원이신가요?</div>
                    <div
                        className='signup-guest-signin-link'
                        onClick={() => navi('/signin',{replace:true})}
                    >로그인
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SocialForm;