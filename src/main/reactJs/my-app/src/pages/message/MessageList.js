import React, {useEffect, useState} from 'react';
import '../message/style/Message.css'
import {NavLink} from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import MessageListPreview from "./MessageListPreview";
import MessageZeroPreview from "./MessageZeroPreview";

function MessageList(props) {

    const [messageList, setMessageList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");


    const getMessageList = (page)=>{
        const url = `/api/message/D1/list/${page}`
        axiosIns.get(url)
            .then(response =>{
                console.log(response.data.list);
                setMessageList(response.data.list);
                setTotalPages(response.data.totalPages);
            })
    }

    const getSearchResults = () => {
        const url = `/api/message/D1/search/${searchTerm}`;
        axiosIns.get(url)
            .then(response => {
                console.log(response.data.list);
                setMessageList(response.data.list);
                setTotalPages(response.data.totalPages);
                setPage(0);  // Reset page number
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        if(searchTerm) {
            getSearchResults();
        } else {
            getMessageList(page);
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    const goToPreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };


    useEffect(()=> {
        getMessageList(page);
    },[])

    useEffect(() => {
        getMessageList(page);
    }, [page]);



    return (
        <div className="moblie-textmsg">
            <div className="textmsg-searchbar">
                <input type="text" className="textmsg-searchbar-box"
                       placeholder="쪽지 내용 검색"
                       onChange={handleSearchChange}
                       onKeyDown={handleEnterKeyPress}
                       value={searchTerm}/>
                <img
                    className="textmsg-searchbar-search-icon"
                    alt=""
                    src={require("./assets/textmsg_searchbar_search_icon.svg").default}
                    onClick={handleSearchClick}
                />
            </div>
            {
                messageList && messageList.length > 0 ?
                    messageList.map((message, index) =>
                        <>
                        <MessageListPreview
                            message={message}
                            isLast={index === messageList.length - 1}
                            key={message.id}
                        />
                    <hr className="message-list-hr"/>
                        </>
                    ) : <MessageZeroPreview />
            }
            <div className="button-container">
                {totalPages > 0 && (
                    <>
                        <button
                            className="delete-button"
                            onClick={goToPreviousPage}
                            style={{visibility: page > 0 ? "visible" : "hidden"}}
                        >
                            이전
                        </button>
                        <button
                            className="delete-button"
                            onClick={goToNextPage}
                            style={{visibility: page < totalPages - 1 ? "visible" : "hidden"}}
                        >
                            다음
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default MessageList;