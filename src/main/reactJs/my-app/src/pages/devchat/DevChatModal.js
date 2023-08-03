import React from 'react';
import { useSelector } from "react-redux";
import {ChatLoading, DevChat} from "./index";
import './style/DevChat.css'

function DevChatModal(props) {
    const modalOpen = useSelector(state => state.devChat.modalOpen);
    const hidden = useSelector(state => state.devChat.hidden);

    if (!modalOpen) {
        return null;
    }

    return (
        <div className={`devchat-modal-box ${hidden ? 'hidden' : 'visible'}`}>
            <DevChat />
        </div>
    );
}

export default DevChatModal;