import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import * as StompJS from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import Message from "./Message";

function Room(props) {
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [msg, setMsg] = useState([]);

    const client = useRef();
    const userNameRef = useRef();
    const msgRef = useRef();

    useEffect(() => {
        axios.get('/room/info/' + roomId)
            .then(res => {
                setRoomName(res.data.roomName);
                connect();
            })
    }, [roomId]);

    const connect = () => {
        let sock = new SockJS('/wss');

        client.current = StompJS.Stomp.over(sock);
        let ws = client.current;
        ws.connect({}, (e) => {
            ws.subscribe('/sub/room/' + roomId, data => {
                AddChat(data.body);
            });
            publish("ENTER", '익명');
        });
    }
    const AddChat = (data) => {
        setMsg(msg => [
            ...msg,
            data
        ]);
    }

    const publish = (type, userName, msg) => {
        client.current.send('/pub/msg', {}, JSON.stringify({
            type,
            roomId,
            userName,
            msg
        }));
    }

    const msgSend = (e) => {
        if (userNameRef.current.value === '' || msgRef.current.value === '') {
            alert('값을 입력하세요');
            return
        } else {
            publish('CHAT', userNameRef.current.value, msgRef.current.value);
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
                <input placeholder='대화명' ref={userNameRef}/>
                <input placeholder='보낼메세지' ref={msgRef} onKeyUp={enterKey}/>
                <button onClick={msgSend}>전송</button>
            </div>
        </div>
    );
}

export default Room;