import React, {useState} from "react";
import "./style/Header.css";
import {NavLink} from "react-router-dom";
import {MenuModal} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {resetUnreadMsg, setHidden, setModalOpen} from "../redux/devChat";

function Header(props) {
    const dispatch = useDispatch();
    const unreadMsg = useSelector(state=>state.devChat.unreadMsg);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openMenuBar = () => {
        setIsMenuOpen(true);
    };

    const handleOpenChat =() => {
        dispatch(setModalOpen(true));
        dispatch(setHidden(false));
        dispatch(resetUnreadMsg());
        document.body.style.overflow='hidden';
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
            {unreadMsg}
            <button
                style={{position:'absolute', right:'6rem'}}
                onClick={handleOpenChat}
            >채팅</button>
            <MenuModal isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        </div>
    );
}

export default Header;
