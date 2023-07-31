import React, {useState} from 'react';
import './FindID.css';
import '../../signup/style/SignUpNorm.css';
import FindEmail from "./FindEmail";
import InputEmailReg from "../../signup/norm/inputs/InputEmailReg";
import axiosIns from "../../../api/JwtConfig";

function FindID(props) {
    const [normMember, setNormMember] = useState(true);
    const [compMember, setCompMember] = useState(false);
    const [isCapsOn, setIsCapsOn] = useState(false);

    const selectNormMember = () => {
        setNormMember(true);
        setCompMember(false);
    }

    const selectCompMember = () => {
        setNormMember(false);
        setCompMember(true);
    }

    const capsLockChk = (e) =>{
        setIsCapsOn(e.getModifierState('CapsLock'));
    }

    const getMemberInfo = () =>{
        axiosIns.post({
            url : "/api/member/D0/id",
            data : {
                // email :
            }
        })
    }

    return (
        <div className='find-id'>
            <div className='login-logo-img'>
                <img
                    className='login-logo-img-icon'
                    alt=''
                    src={require('../assets/login-logo-icon.svg').default}
                />
                <div className='login-logo-text'>Devster</div>
                <div className='login-logo-slogan'>Hello World!</div>
            </div>
            <div className='login-logo-slogan1'>
                <p className='devster'>Devster는 개발자를 꿈꾸는 학생들과</p>
                <p className='devster'>주니어 개발자들이 모인 커뮤니티 플랫폼입니다.</p>
            </div>
            <div className='login-type-select'>
                <div
                    className={`${normMember ? 'login-type-select-norm' : 'login-type-select-norm-false'}`}
                    onClick={selectNormMember}
                >
                    일반회원
                </div>
                <img
                    className='login-type-select-bar-icon'
                    alt=''
                    src={require('../assets/login-type-select-bar.svg').default}
                />
                <div
                    className={`${compMember ? 'login-type-select-comp' : 'login-type-select-comp-false'}`}
                    onClick={selectCompMember}
                >
                    기업회원
                </div>
            </div>
            <div className="find-email-input">
            {
                normMember && <FindEmail />
            }
            {
                normMember && <InputEmailReg />
            }
            </div>
            <div
                className={`${normMember ? 'login-signuplink' : 'login-signuplink-comp'}`}
            >
                <div className='login-signuplink-text'>아직 회원이 아니신가요?</div>
                <div className='login-signuplink-signup'>회원가입</div>
            </div>

            <div className="findid-success">
                <img
                    className="findid-success-rec-icon"
                    alt=""
                    src={require('./findid_success_rec.svg').default}
                />
                <div className="findid-success-text">
                    <b className="memberid"></b><br/>
                    <b className="devster1">Devster의 회원이 된 걸 축하드립니다 !</b>
                </div>
            </div>
        </div>
    );
}

export default FindID;