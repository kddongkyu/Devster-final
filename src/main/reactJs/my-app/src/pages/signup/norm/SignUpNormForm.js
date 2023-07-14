import React from 'react';
import {SignUpNormContract, SignUpNormUpload} from "../index";

function SignUpNormForm(props) {
    return (
        <div>
            <div>
                <b className='signup-guest-sns-text'>SNS 회원가입</b>
                <div className='signup-guest-sns-kakao'/>
                <div className='signup-guest-sns-naver'/>
            </div>
            <div className='signup-guest-hr'/>
            <div>
                <b className='signup-guest-signup-text'>Devster 회원가입</b>
                <SignUpNormUpload/>
                <div className='signup-guest-name-text'>
                    <span>이름</span>
                    <span className='span'>*</span>
                </div>
                <div className='signup-guest-name-inputbox'/>
                <div className='signup-guest-id-text'>
                    <span>사용자 ID</span>
                    <span className='span'> *</span>
                </div>
                <div className='signup-guest-id-exist-text'>중복확인</div>
                <div className='signup-guest-id-inputbox'/>
                <div className='signup-guest-email-text'>
                    <span>E-mail</span>
                    <span className='span'> *</span>
                </div>
                <div className='signup-guest-email-exist-text'>중복확인</div>
                <div className='signup-guest-email-inputbox'/>
                <div className='signup-guest-email-reg-send'>
                    <div className='signup-guest-email-inputbox1'/>
                    <div className='signup-guest-email-reg-send-te'>인증번호 전송</div>
                </div>
                <div className='signup-guest-email-inputbox2'/>
                <div className='signup-guest-email-reg-timelef'>
                    남은 인증 시간 3 : 00
                </div>
                <div className='signup-guest-pass-text'>
                    <span>비밀번호</span>
                    <span className='span'>*</span>
                </div>
                <div className='signup-guest-pass-secure'>
                    <div className='signup-guest-pass-secure-text'>보안강도 : 상</div>
                    <div className='signup-guest-pass-secure-icons'>
                        <div className='signup-guest-pass-secure-red'/>
                        <div className='signup-guest-pass-secure-yello'/>
                        <div className='signup-guest-pass-secure-green'/>
                    </div>
                </div>
                <div className='signup-guest-pass-inputbox'/>
                <div className='signup-guest-pass-check-text'>
                    <span>비밀번호 확인</span>
                    <span className='span'>*</span>
                </div>
                <div className='signup-guest-pass-check-wanrin'>
                    비밀번호가 일치하지 않습니다.
                </div>
                <div className='signup-guest-pass-check-inputb'/>
                <div className='signup-guest-nickname-text'>
                    <span>닉네임</span>
                    <span className='span'>*</span>
                </div>
                <div className='signup-guest-nickname-check-te'>
                    사용 불가능한 닉네임입니다.
                </div>
                <div className='signup-guest-nickname-inputbox'/>
                <div className='signup-guest-academy-text'>
                    <span>기관 선택</span>
                    <span className='span'>*</span>
                </div>
                <div className='signup-guest-academy-inputbox'/>
                <img
                    className='signup-guest-academy-search-ic-icon'
                    alt=''
                    src={require('../assets/signup_guest_academy_search_icon.svg').default}
                />
            </div>
                <div className='signup-guest-hr1'/>
                <SignUpNormContract/>
            </div>
            );
            }

            export default SignUpNormForm;
