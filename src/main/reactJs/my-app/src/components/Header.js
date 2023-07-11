<<<<<<< HEAD
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
=======
import React from "react";
import "./style/Header.css";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <div className="header-box">
      <NavLink to={"/login"}>
        <button
          type="button"
          className="header-icon-list-text btn btn-lg btn-success"
        >
          로그인
        </button>
      </NavLink>
      <NavLink to={"/userinfo"}>
        <img
          className="header-icon-list"
          alt=""
          src={require("../assets/header-icon-list.svg").default}
        />
      </NavLink>
      <div className="header-logo">
        <NavLink to={"/"}>
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
>>>>>>> 650d23de1d2d797c299ab3a7572dbb4fb347635a
}

export default Header;
