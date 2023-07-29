import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { setHidden, setMsg, wsDisconnect} from "../../redux/devChat";
import {DevChat} from "./index";
import './style/DevChat.css'

function DevChatModal(props) {
    const dispatch = useDispatch();
    const modalOpen = useSelector(state => state.devChat.modalOpen);
    const hidden = useSelector(state => state.devChat.hidden);
    const msg=useSelector(state=>state.devChat.msg);
    if (!modalOpen) {
        return null;
    }

    const handleMinimize = () => {
        dispatch(setHidden(true));
    }

    const handleClose = () => {
        dispatch(wsDisconnect());
    }

    return (
            <div className={`devchat-modal-box ${hidden?'hidden':'visible'}`}>
                <button onClick={handleMinimize}>Minimize</button>
                <button onClick={handleClose}>Close</button>
                <DevChat/>
            </div>
    );
}

export default DevChatModal;