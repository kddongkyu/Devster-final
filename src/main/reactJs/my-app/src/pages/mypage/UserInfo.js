import React from "react";
import "./style/UserInfo.css";

function UserInfo(props) {
  return (
    <div className="userinfo">
      <div className="userinfo-wrapper">
        <b className="text-userinfo">회원정보</b>
        <div className="text-name">이름</div>
        <div className="userinfo-name">
          <input className="userinfo-name-box" />
        </div>
        <div className="text-email">이메일</div>
        <div className="userinfo-email">
          <input className="userinfo-name-box" />
        </div>
        <div className="text-hp">전화번호</div>
        <div className="userinfo-hp">
          <input className="userinfo-name-box" />
        </div>
        <div className="text-belong">소속</div>
        <div className="userinfo-belong">
          <input className="userinfo-name-box" />
        </div>
        <div className="text-nickname">별명</div>
        <div className="userinfo-nickname">
          <input className="userinfo-name-box" />
        </div>
        <div className="text-profilepic">프로필 사진</div>
        <div className="userinfo-profile">
          <div className="button-profilechange">
            <div className="button-profilechange-box" />
            <div className="text-change">변경</div>
          </div>
          <div className="profile-picture" />
        </div>
        <img
          className="userinfo-line-01-icon"
          alt=""
          src="/userinfo-line-01.svg"
        />
        <div className="button-userinfo-save">
          <div className="button-userinfo-save-box" />
          <b className="text-save">저장</b>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
