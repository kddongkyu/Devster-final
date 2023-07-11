
import React, {useState} from 'react';
import './style/Header.css';
import {NavLink} from "react-router-dom";
import {MenuModal} from "./index";

function Header(props) {
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const openMenuBar=()=> {
        setIsMenuOpen(true);
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
            <MenuModal isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        </div>
    );

}

export default Header;
