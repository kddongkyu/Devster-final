import React, {useState} from 'react';
import {FinderCompId, FinderCompPass} from "./index";

function FinderComp(props) {
    const [findCompId,setFindCompId] = useState(true);
    const [findPass,setFindPass] = useState(false);

    const handleOnFindCompId=()=> {
        setFindCompId(true);
        setFindPass(false);
    }

    const handleOnFindPass=()=> {
        setFindCompId(false);
        setFindPass(true);
    }
    return (
        <div>
            <div className='finder-norm-id'>
                <div
                    className={`${findCompId?'finder-norm-id-box':'finder-norm-id-box-false'}`}
                    onClick={handleOnFindCompId}
                >
                    <b className={`${findCompId?'finder-norm-id-text':'finder-norm-id-text-false'}`}>아이디 찾기</b>
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
                findCompId &&
                <FinderCompId/>
            }
            {
                findPass &&
                <FinderCompPass/>
            }
        </div>
    );
}

export default FinderComp;