import React from "react";
import { NavLink } from "react-router-dom";

function MypageListUser(props) {
  const activeStyle = {
    backgroundColor: "#e5e7eb",
    color: "#1f2937",
  };
  const deactiveStyle = {
    color: "#808491",
  };
  return (
    <div>
      <b className="text-myaccount">내 계정</b>
      <div className="menu-userinfo">
        <NavLink
          to={"/userinfo"}
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
          to={"/bookmarks"}
          className="menulist-userinfo-box"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <div className="text-bookmarks">채용정보 북마크</div>
          <img
            className="icon-userinfo"
            alt=""
            src={require("./assets/bookmark.svg").default}
          />
        </NavLink>
      </div>
      <div className="menu-myresume">
        <NavLink
          to={"/myresume"}
          className="menulist-userinfo-box"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <div className="text-bookmarks">내 이력서</div>
          <img
            className="icon-resume"
            alt=""
            src={require("./assets/file-dock.svg").default}
          />
        </NavLink>
      </div>
      <div className="menu-withdrawal">
        <NavLink
          to={"/withdrawal"}
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
      <div className="menu-notice">
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
      <div className="line-mypage" />
    </div>
  );
}

export default MypageListUser;
