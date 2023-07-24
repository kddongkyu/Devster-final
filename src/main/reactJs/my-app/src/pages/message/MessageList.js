import React, {useEffect, useState} from 'react';
import '../message/style/Message.css'
import {NavLink} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";
import MessageListPreview from "./MessageListPreview";
import MessageZeroPreview from "./MessageZeroPreview";

function MessageList(props) {

    const [messageList, setMessageList] = useState(null);
    const [page, setPage] = useState(0);


    const getMessageList = (page)=>{
        const url = `/api/message/D1?page=${page}&size=7`
        axiosIns.get(url)
            .then(response =>{
                console.log(response.data);
                setMessageList(response.data);
            })
    }


    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
        getMessageList(page + 1);
    }

    const handlePrevious = () => {
        setPage(prevPage => prevPage - 1);
        getMessageList(page - 1);
    }


    useEffect(()=> {
        getMessageList();
    },[])

    return (
        <div className="moblie-textmsg">
            <div className="textmsg-searchbar">
                <div className="textmsg-searchbar-box" />
                <div className="textmsg-searchbar-search-text">메세지 검색</div>
                <img
                    className="textmsg-searchbar-search-icon"
                    alt=""
                    src="/textmsg-searchbar-search-icon.svg"
                />
                <img
                    className="textmsg-searchbar-sort-icon"
                    alt=""
                    src="/textmsg-searchbar-sort-icon.svg"
                />
            </div>
            {
                messageList && messageList.length > 0 ?
                    messageList.map((message, index) =>
                        <MessageListPreview
                            message={message}
                            isLast={index === messageList.length - 1}
                            key={message.id}
                        />
                    ) : <MessageZeroPreview />
            }
            <div className="button-container">
                <button className="delete-button" onClick={handlePrevious} disabled={page === 0}>이전</button>
                <button className="delete-button" onClick={handleNext}>다음</button>
            </div>

        </div>
    );
}

export default MessageList;