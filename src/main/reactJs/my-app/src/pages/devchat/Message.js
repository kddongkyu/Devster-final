import React from 'react';

function Message({ item }) {
    const date = new Date();
    const options={hour : 'numeric', minute: 'numeric', hour12:true};
    const timeString = date.toLocaleTimeString('ko-KR',options);

    if (item.type === 'READ_MARKER') {
        return (
            <div className="read-marker">
                {item.msg}
            </div>
        );
    } else {
        if (item.type === 'CHAT') {
            return (
                <div className="normal-msg">
                    <b>{item.userName}</b> {item.msg}
                    <div>{timeString}</div>
                </div>

            );
        } else {
            return (
                <div className="normal-msg">
                    <b>{item.userName}</b> {item.msg}
                </div>
            );
        }
    }
}

export default React.memo(Message);