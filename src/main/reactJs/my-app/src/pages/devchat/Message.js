import React from 'react';
import {useSelector} from "react-redux";

function Message({item}) {
    const date = new Date(item.date);
    const msgTime = {hour: 'numeric', minute: 'numeric', hour12: true};
    const uploadTime = {year: 'numeric', month: '2-digit', day: '2-digit'};
    const timeString = date.toLocaleTimeString('ko-KR', msgTime);
    const msgImgUrl = process.env.REACT_APP_CHATIMG;
    const msgImgDir = date.toLocaleDateString('ko-KR', uploadTime).replace(/\. /g, '').replace('.', '');

    if (item.type === 'READ_MARKER') {
        return (
            <div className="read-marker">
                {item.msg}
            </div>
        );
    } else {
        if (item.type === 'CHAT') {
            return (
                <div className="normal-msg" style={{fontSize: '3rem'}}>
                    <b>{item.userName}</b>
                    {item.msg}
                    {
                        item.msgImg.map((url, idx) => (
                            <img
                                key={idx}
                                alt=''
                                src={`${msgImgUrl}${msgImgDir}/${url}`}
                                style={{width: '100px'}}
                            />
                        ))
                    }
                    {timeString}
                </div>

            );
        } else if (item.type === 'ENTER') {
            return (
                <div className="normal-msg">
                    {item.msg}
                </div>
            );
        } else if (item.type === 'EXIT') {
            return (
                <div>
                    {item.msg}
                </div>
            )
        }
    }
}

export default React.memo(Message);