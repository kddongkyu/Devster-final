import React from "react";
import { NavLink } from "react-router-dom";

function MypageListCompany(props) {
  const activeStyle = {
    backgroundColor: "#e5e7eb",
    color: "#222",
  };
  const deactiveStyle = {
    color: "var(--color-slategray)",
  };

  return (
    <div>
      <b className="text-myaccount">내 계정</b>
      <div className="menu-userinfo">
        <NavLink
          to={"/compuserinfo"}
          className="menulist-userinfo-box"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <div className="text_userinfo">회원정보</div>
          <img
            className="icon-userinfo"
            alt=""
            src={require("./assets/user-cicrle-light.svg").default}
          />
        </NavLink>
      </div>
      <div className="menu-bookmarklist">
        <NavLink
          to={"/resumelist"}
          className="menulist-userinfo-box"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <div className="text-bookmarks">구직자 이력서 보기</div>
          <img
            className="icon-userinfo"
            alt=""
            src={require("./assets/bookmark.svg").default}
          />
        </NavLink>
      </div>
      <div className="menu-myresume">
        <NavLink
          to={"/company/withdrawal"}
          className="menulist-userinfo-box"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <div className="text-bookmarks">계정탈퇴</div>
          <img
            className="icon-resume"
            alt=""
            src={require("./assets/close-ring.svg").default}
          />
        </NavLink>
      </div>
      <div className="menu-withdrawal">
        <NavLink
          to={"/notice/admin"}
          className="menulist-userinfo-box"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <div className="text-bookmarks">공지사항</div>
          <img
            className="icon-resume"
            alt=""
            src={require("./assets/info.svg").default}
          />
        </NavLink>
      </div>

      <div className="line-mypage-guest-user " />
    </div>
  );
}

export default MypageListCompany;
