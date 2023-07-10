import React from 'react';
import './style/Header.css';
import {NavLink} from "react-router-dom";

function Header(props) {
    return (
        <div className="header-box">
            <img
                className="header-icon-list"
                alt=""
                src={require("../assets/header-icon-list.svg").default}
            />
            <div className="header-logo">
                <NavLink to={"/mypage/userinfo"}>
                    <img
                        className="header-logo-img-icon"
                        alt=""
                        src={require("../assets/header-logo-img.svg").default}
                    />
                    <div className="header-logo-text">Devster</div>
                </NavLink>
            </div>
        </div>
    );
}

export default Header;