// MessagePreview.js

import React from 'react';
import '../message/style/Message.css'
import {NavLink} from "react-router-dom";

function MessagePreview({message,isLast}) {

    const profileUrl = process.env.REACT_APP_MEMBERURL;

    return (
        <div className={`textmsg-preview ${!isLast ? "textmsg-preview-border" : ""}`}>
            <NavLink to={`/message/detail/${message.mes_idx}`}>
                <div className="textmsg-preview-box" />
                <img className="textmsg-preview-img" alt={`${message.send_nick}의 프로필 사진`}
                     src={message.send_nick_photo ? `${profileUrl}${message.send_nick_photo}`
                         : require("./assets/logo_profile.svg").default}/>
                <b className="textmsg-preview-subject">{message.subject}</b>
                <div className="textmsg-preview-id">{message.send_nick}</div>
                <div className="textmsg-preview-date">{message.send_time}</div>
            </NavLink>
        </div>
    );
}

export default MessagePreview;
