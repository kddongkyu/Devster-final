import React, {useEffect, useState} from 'react';
import {FinderNormId, FinderNormPass} from "./index";
import {useDispatch} from "react-redux";
import {resetNormMember} from "../../redux/normMemberSlice";

function FinderNorm(props) {
    const [findId,setFindId] = useState(true);
    const [findPass,setFindPass] = useState(false);

    const handleOnFindId=()=> {
        setFindId(true);
        setFindPass(false);
    }

    const handleOnFindPass=()=> {
        setFindId(false);
        setFindPass(true);
    }

    return (
        <div>
            <div className='finder-norm-id'>
                <div
                    className={`${findId?'finder-norm-id-box':'finder-norm-id-box-false'}`}
                    onClick={handleOnFindId}
                >
                    <b className={`${findId?'finder-norm-id-text':'finder-norm-id-text-false'}`}>아이디 찾기</b>
                </div>
            </div>
            <div className='finder-norm-pass'>
                <div
                    className={`${!findPass?'finder-norm-pass-box':'finder-norm-pass-box-false'}`}
                    onClick={handleOnFindPass}
                >
                    <b className={`${!findPass?'finder-norm-pass-text':'finder-norm-pass-text-false'}`}>비밀번호 찾기</b>
                </div>
            </div>
            <div className='login-devster-hr'/>
            {
                findId &&
                <FinderNormId findId={findId}/>
            }
            {
                findPass &&
                <FinderNormPass findPass={findPass}/>
            }
        </div>
    );
}

export default FinderNorm;