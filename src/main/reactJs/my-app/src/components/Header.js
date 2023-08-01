import React, { useState } from "react";
import "./style/Header.css";
import { NavLink } from "react-router-dom";
import { MenuModal } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { resetUnreadMsg, setHidden, setModalOpen } from "../redux/devChat";

function Header({ isMenuOpen, setIsMenuOpen }) {
    const dispatch = useDispatch();
    const unreadMsg = useSelector(state => state.devChat.unreadMsg);
    const openMenuBar = () => {
        setIsMenuOpen(true);
        document.documentElement.style.overflow = 'hidden';
    };

    const handleOpenChat = () => {
        dispatch(setModalOpen(true));
        dispatch(setHidden(false));
        dispatch(resetUnreadMsg());
        document.documentElement.style.overflow = 'hidden';
    }

    return (
        <div className="header-box">
            <img
                className="header-icon-list"
                alt=""
                src={require("../assets/header-icon-list.svg").default}
                onClick={openMenuBar}
            />
            <div className="header-logo">
                <NavLink to={"/home"}>
                    <img
                        className="header-logo-img-icon"
                        alt=""
                        src={require("../assets/header-logo-img.svg").default}
                    />
                    <div className="header-logo-text">Devster</div>
                </NavLink>
            </div>
            <div
                onClick={handleOpenChat}>
                <img
                    className="chat-logo-icon"
                    alt=''
                    src={require('../assets/chat_bubble.svg').default}
                />
                {/* {unreadMsg} */}
            </div>
            <MenuModal isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
    );
}

export default Header;
