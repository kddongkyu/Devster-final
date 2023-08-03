import React, {useState} from "react";
import "./style/Header.css";
import {NavLink} from "react-router-dom";
import {MenuModal} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {resetUnreadMsg, setHidden, setModalOpen} from "../redux/devChat";
import jwt_decode from "jwt-decode";
import axiosIns from "../api/JwtConfig";
import {useSnackbar} from "notistack";
import ToastAlert from "../api/ToastAlert";

function Header({isMenuOpen, setIsMenuOpen}) {
    const dispatch = useDispatch();
    const unreadMsg = useSelector(state => state.devChat.unreadMsg);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const openMenuBar = () => {
        setIsMenuOpen(true);
    };

    const handleOpenChat = async () => {
        let role = '';
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
            const decodedToken = jwt_decode(accessToken);
            role = decodedToken.role;
            try {
                const res = await axiosIns({
                    method: 'post',
                    url: '/api/member/D1/check',
                });
                if (res.status === 200) {
                    if (!role || role === 'GUEST') {
                        toastAlert(<>인증된 회원만 사용가능합니다.<br/>회원인증을 먼저 진행해주세요.</>, 'warning');
                        return;
                    } else {
                        dispatch(setModalOpen(true));
                        dispatch(setHidden(false));
                        dispatch(resetUnreadMsg());
                    }
                }
            } catch (error) {
                toastAlert(<>로그인이 필요한 서비스입니다.<br/>로그인을 먼저 해주세요.</>, 'warning');
                return;
            }
        } else {
            toastAlert(<>로그인이 필요한 서비스입니다.<br/>로그인을 먼저 해주세요.</>, 'warning');
            return;
        }
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
                    src={require('../assets/chat_bubble_re.svg').default}
                />
                {
                    unreadMsg > 0 &&
                    <img
                        className="chat-logo-icon-unread"
                        alt=''
                        src={require('../assets/unread_msg.svg').default}
                    />
                }
            </div>
            <MenuModal isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        </div>
    );
}

export default Header;
