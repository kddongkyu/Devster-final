import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import * as SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';
import './ChatLoading.css';
import Room from './Room';
import {ChatLogo} from "../../assets";

function DevChat(props) {
    const {ai_idx} = useParams();
    const [roomName, setRoomName] = useState('');
    const [ppl, setPpl] = useState(0);
    const [msg, setMsg] = useState([]);
    const [connected, setConnected] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);

    const client = useRef();
    const userNameRef = useRef();
    const msgRef = useRef();

    useEffect(() => {
        axios.get('/devchat/' + ai_idx)
            .then(res => {
                setRoomName(res.data);
                connect();
            });
    }, [ai_idx]);

    useEffect(() => {
        if (connected) {
            setTimeout(() => {
                setChatVisible(true);
            }, 200);
        }
    }, [connected]);

    const connect = () => {
        let sock = new SockJS('/wss');

        client.current = StompJS.Stomp.over(sock);
        let ws = client.current;
        ws.connect({}, (e) => {
            ws.subscribe('/sub/devchat/' + ai_idx, data => {
                AddChat(data.body);
            });
            ws.subscribe('/sub/devchat/' + ai_idx + '/ppl', data => {
                setPpl(data.body);
            });
            publish('ENTER', '익명');
            setConnected(true);
        });
    }

    const AddChat = (data) => {
        setMsg(msg => [
            ...msg,
            data
        ]);
    }

    const publish = (type, userName, msg) => {
        const roomId = ai_idx;
        client.current.send('/pub/msg', {}, JSON.stringify({
            type,
            roomId,
            userName,
            msg
        }));
    }

    return (
        <div>
            {
                chatVisible ?
                    <div className='chat-list'>
                        <Room roomName={roomName} msg={msg} userNameRef={userNameRef} msgRef={msgRef}
                              publish={publish} ppl={ppl}/>
                    </div> :
                    <div className={`moblie-chat ${connected ? 'moblie-chat-loaded' : ''}`}>
                        <div className='chat-logo-text'>Devster</div>
                        {/*<img className='chat-logo-icon' alt='' src='/chat-logo-icon.svg'/>*/}
                        <ChatLogo connected={connected}/>
                        <div className='chat-slogan'>Hello World!</div>
                    </div>
            }
        </div>
    );
}

export default DevChat;