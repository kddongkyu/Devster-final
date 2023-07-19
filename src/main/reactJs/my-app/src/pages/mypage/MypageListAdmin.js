import React from "react";
import { NavLink } from "react-router-dom";

function MypageListAdmin(props) {
  const activeStyle = {
    backgroundColor: "#e5e7eb",
    color: "#222",
  };
  const deactiveStyle = {
    color: "var(--color-slategray)",
  };

  return (
    <div className="">
      <b className="text-myaccount">관리자</b>
      <div className="menu-userinfo">
        <NavLink
          to={"/notice/admin"}
          className="menulist-userinfo-box"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <div className="text_userinfo">공지사항 등록</div>
          <img
            className="icon-userinfo"
            alt=""
            src={require("./assets/user-cicrle-light.svg").default}
          />
        </NavLink>
      </div>
      <div className="menu-bookmarklist">
        <NavLink
          to={"/member/approval"}
          className="menulist-userinfo-box"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <div className="text_userinfo">일반회원 가입 승인</div>
          <img
            className="icon-userinfo"
            alt=""
            src={require("./assets/user-cicrle-light.svg").default}
          />
        </NavLink>
      </div>
      <div className="menu-myresume">
        <NavLink
          to={"/"}
          className="menulist-userinfo-box"
          style={({ isActive }) => {
            return isActive ? activeStyle : deactiveStyle;
          }}
        >
          <div className="text_userinfo">기업회원 가입 승인</div>
          <img
            className="icon-userinfo"
            alt=""
            src={require("./assets/user-cicrle-light.svg").default}
          />
        </NavLink>
      </div>
      <div className="line-mypage_02" />
    </div>
  );
}

export default MypageListAdmin;
