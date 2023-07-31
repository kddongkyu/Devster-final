import React from 'react';
import {useSelector} from "react-redux";

function IdBox(props) {
    const m_email=useSelector(state => state.norm.m_email);

    const submitIsValid= useSelector([
        state.norm.emailChk,
        state.norm.emailRegChk
    ]);
    return (
        <div>

        </div>
    );
}

export default IdBox;