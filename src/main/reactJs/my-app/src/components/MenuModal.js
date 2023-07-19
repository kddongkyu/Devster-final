import React, { useEffect, useState } from "react";
import "./style/MenuModal.css";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axiosIns from "../api/JwtConfig";

function MenuModal({ isMenuOpen, setIsMenuOpen }) {
  const closeMenuBar = () => {
    setIsMenuOpen(false);
  };

  const [member, setMember] = useState({
    m_nickname: "",
    m_email: "",
    m_role: "",
  });

  //const decodedToken = jwt_decode(localStorage.accessToken);
  const photoUrl = process.env.REACT_APP_MEMBERURL;
  const imageUrl = `${photoUrl}${member.m_photo}`;

  //console.log("url: " + imageUrl);

  const getMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Effects
  useEffect(() => {
    if (localStorage.accessToken && localStorage.refreshToken) {
      const decodedToken = jwt_decode(localStorage.accessToken);
      getMemberData(decodedToken.idx);
    }
  }, []);

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
          <NavLink to={"/"}>
            <b className="menu-modal-options-fb">일반게시판</b>
          </NavLink>
          <div className="menu-modal-options-qna">Q&A</div>
          <b className="menu-modal-options-hire">채용정보</b>
          <b className="menu-modal-options-aca">학원별게시판</b>
          <b className="menu-modal-options-review">회사후기</b>
        </div>

        <div className="menu-mypage">
          <div className="menu-mypage-box">
            <div className="menu-mypage-userinfo">
              <div className="menu-mypage-userinfo-img">
                {member.m_photo ? <img alt="" src={imageUrl} /> : null}
              </div>
              <div className="menu-mypage-userinfo-contents">
                <div className="menu-mypage-userinfo-nickname">
                  {member.m_nickname}
                </div>
                <div className="menu-mypage-userinfo-email">
                  {member.m_email}
                </div>
              </div>
            </div>
            <NavLink
              to={member.m_role === "GUEST" ? "/userinfo" : "/notice/admin"}
              // to={member.m_role === "GUEST" ? "/notice/admin" : "/userinfo"}
              onClick={closeMenuBar}
            >
              <b className="menu-modal-options_mypage">
                <div style={{ marginTop: "1rem" }}>마이페이지</div>
              </b>
            </NavLink>
          </div>
        </div>

        <div className="menu-account">
          <div className="menu-account-box" />
          <NavLink to={"/signin"}>
            <div className="menu-account-signin">
              <button className="menu-account-signin-box">로그인</button>
            </div>
          </NavLink>
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
