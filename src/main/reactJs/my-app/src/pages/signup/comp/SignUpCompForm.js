import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import '../style/SignUpComp.css';
import {
    InputCmCp, InputCmCpReg,
    InputCmName,
    InputCompEmail,
    InputCompEmailReg,
    InputCompname,
    InputCompPass,
    InputCompPassChk,
    InputCompTele, InputFirstAddr, InputPost, InputSecondAddr
} from "./inputs";
import {SignUpCompContract, SignUpCompSubmit} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {resetCompMember, setCm_reg, setRegIsValid} from "../../../redux/compMemberSlice";

function SignUpCompForm(props) {
    const navi = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetCompMember());
        try {
            const regNum = location.state.regNum;
            if (regNum) {
                dispatch(setCm_reg(regNum));
                dispatch(setRegIsValid(true));
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
        <div className='signup-comp-member'>
            <div
                className='signup-comp-intro'
                onClick={() => navi('/home')}
            >
                <img
                    className='signup-comp-intro-icon'
                    alt=''
                    src={require('../assets/signup_guest_intro_icon.svg').default}
                />
                <div className='signup-comp-intro-icon-text-d'>Devster</div>
                <div className='signup-comp-intro-icon-text-h'>Hello World!</div>
            </div>
            <div className='signup-comp-intro-text'>
                <p className='signup-comp-devster'>Devster는 개발자를 꿈꾸는 학생들과</p>
                <p className='signup-comp-devster'>주니어 개발자들이 모인 커뮤니티 플랫폼입니다.</p>
            </div>
            <div className='signup-comp-choose'>
                <div
                    className='signup-comp-choose-norm-false'
                    onClick={() => navi('/signup', {replace: true})}
                >일반회원
                </div>
                <img
                    className='signup-comp-choose-bar-icon'
                    alt=''
                    src={require('../assets/signup_guest_choose_bar.svg').default}
                />
                <div className='signup-comp-choose-comp'>
                    기업회원
                </div>
            </div>
            <div>
                <b className='signup-comp-signup-text'>Devster 회원가입</b>
                <InputCompname/>
                <div className='signup-comp-input-position-box'>
                    <InputCompEmail/>
                    <InputCompEmailReg/>
                    <InputCompPass/>
                    <InputCompPassChk/>
                </div>
                <div className='signup-comp-addr-position-box'>
                    <InputPost/>
                    <InputFirstAddr/>
                    <InputSecondAddr/>
                </div>
                <InputCompTele/>
                <InputCmName/>
                <div className='signup-comp-rep-position-box'>
                    <InputCmCp/>
                    <InputCmCpReg/>
                </div>
                <div className='signup-comp-cont-position-box'>
                    <div className='signup-comp-hr1'/>
                    <SignUpCompContract/>
                    <SignUpCompSubmit/>
                    <div className='signup-comp-signin'>
                        <div className='signup-comp-signin-text'>이미 회원이신가요?</div>
                        <div
                            className='signup-comp-signin-link'
                            onClick={() => navi('/signin', {replace: true})}
                        >로그인
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpCompForm;