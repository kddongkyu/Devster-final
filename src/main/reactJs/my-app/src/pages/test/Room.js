import React, {useEffect, useRef, useState} from 'react';
import Message from "./Message";
import './Room.css'

function Room({roomName, msg, userNameRef, msgRef, publish, ppl}) {
    const msgSend = (e) => {
        if (msgRef.current.value === '') {
            alert('값을 입력하세요');
            return
        } else {
            // publish('CHAT', userNameRef.current.value, msgRef.current.value);
            publish('CHAT', '야붕이', msgRef.current.value);
            msgRef.current.value='';
        }
    }
    const enterKey = (e) => {
        if (e.key === 'Enter') {
            msgSend();
        }
    }

    return (
        <div>
            <h1>{roomName}</h1>
            <h1>{ppl}</h1>
            <div id='chats' style={{
                width: '500px',
                height: '400px',
                border: '1px solid',
                overflowY: 'auto'
            }}>
                {
                    msg.map((item, idx) => {
                        return (
                            <Message key={idx} item={item}/>
                        )
                    })
                }
            </div>
            <div id='tooldbox'>
                {/*<input placeholder='대화명' ref={userNameRef}/>*/}
                <input placeholder='보낼메세지' ref={msgRef} onKeyUp={enterKey}/>
                <button onClick={msgSend}>전송</button>
            </div>

            <div className="moblie-chat-room">
                <div className="chat-header">
                    <div className="chat-header-box" />
                    <b className="chat-header-acaname">강남비트캠프701호일이삼사</b>
                    <b className="chat-header-ppls">(12345)</b>
                    <img
                        className="chat-header-close-icon"
                        alt=""
                        src="/chat-header-close.svg"
                    />
                </div>
                <div className="chat-body">
                    <div className="chat-body-msg-r">
                        <div className="chat-body-msg-r-img" />
                        <div className="chat-body-msg-r-id">비트캠프 야붕이</div>
                        <div className="chat-body-msg-r1">
                            <div className="chat-body-msg-r-box" />
                            <div className="chat-body-msg-r-text">
                                ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ
                            </div>
                        </div>
                        <div className="chat-body-msg-r-date">오전 12:32</div>
                    </div>
                    <div className="chat-body-msg-s">
                        <div className="chat-body-msg-s1">
                            <div className="chat-body-msg-s-box" />
                            <div className="chat-body-msg-s-text">
                                ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ
                            </div>
                        </div>
                        <div className="chat-body-msg-s-date">오전 12:36</div>
                    </div>
                </div>
                <div className="chat-footer">
                    <img
                        className="chat-footer-upload-icon"
                        alt=""
                        src="/chat-footer-upload.svg"
                    />
                    <div className="chat-footer-input">
                        <div className="chat-footer-input-box" />
                        <div className="chat-footer-input-text">
                            ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                        </div>
                    </div>
                    <div className="chat-footer-send">
                        <div className="chat-footer-send-btn" />
                        <img
                            className="chat-footer-send-icon"
                            alt=""
                            src="/chat-footer-send-icon.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room;