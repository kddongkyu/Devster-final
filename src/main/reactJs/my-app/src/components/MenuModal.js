import React from "react";
import "./style/MenuModal.css";
import { NavLink } from "react-router-dom";

function MenuModal({ isMenuOpen, setIsMenuOpen }) {
  const closeMenuBar = () => {
    setIsMenuOpen(false);
  };

  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className="menu-modal-box">
      <div className="moblie-menu-modal">
        <div className="menu-modal">
          <div className="menu-modal-logo">
            <NavLink to={"/"} onClick={closeMenuBar}>
              <img
                className="menu-modal-img-icon"
                alt=""
                src={require("../assets/header-logo-img.svg").default}
              />
              <div className="menu-modal-text">Devster</div>
            </NavLink>
          </div>
          <img
            className="menu-modal-close-icon"
            alt=""
            src={require("../assets/menu_modal_close.svg").default}
            onClick={closeMenuBar}
          />
        </div>
        <div className="menu-modal-options">
          <b className="menu-modal-options-fb">일반게시판</b>
          <div className="menu-modal-options-qna">Q&A</div>
          <b className="menu-modal-options-hire">채용정보</b>
          <b className="menu-modal-options-aca">학원별게시판</b>
          <b className="menu-modal-options-review">회사후기</b>
        </div>

        <div className="menu-mypage">
          <NavLink to={"/userinfo"} onClick={closeMenuBar}>
            <b className="menu-modal-options_mypage">
              마이페이지{" "}
              <span style={{ fontSize: "1.6rem" }}>
                {sessionStorage.myname}님 반갑습니다!
              </span>
            </b>
          </NavLink>
        </div>

        <div className="menu-account">
          <div className="menu-account-box" />
          <div className="menu-account-signin">
            <div className="menu-account-signin-box" />
            <b className="menu-account-signin-text">로그인</b>
          </div>
          <div className="menu-account-signup">
            <div className="menu-account-signup-box" />
            <b className="menu-account-signup-text">회원가입</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
