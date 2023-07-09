import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";

function Lobby(props) {
    const [lst, setLst] = useState([]);

    useEffect(() => {
        axios.get('/lobby/list')
            .then(res => setLst(res.data));
    });

    const RoomCreate = (e) => {
        let name = prompt('방제 입력').trim();

        if (name.length === 0)
            return;

        axios({
            method: 'post',
            url: '/lobby/create',
            data: JSON.stringify({name}),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => {
                setLst([
                    res.data,
                    ...lst
                ])
            })
    }

    return (
        <div>
            <button onClick={RoomCreate}>방만들기</button>
            <hr/>
            {
                lst.map((item, idx) =>
                        <NavLink key={idx} to={`/room/${item.roomId}`}>
                            <h1>{idx + 1}. {item.roomName}</h1>
                            <h1>{item.roomId}</h1>
                        </NavLink>
                )
            }
        </div>
    );
}

export default Lobby;