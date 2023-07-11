import React from "react";
import "./style/MyResume.css";
import { NavLink } from "react-router-dom";

function MyResume(props) {
  return (
    <div className="resume-none">
      <div className="content-resume">
        <b className="text-content-resume">내 이력서</b>
        <div className="resume-add-box" />
        <NavLink to={"/myresume/form"}>
          <img
            className="resume-add-button-icon"
            alt=""
            src={require("./assets/resume-add-button.svg").default}
          />
        </NavLink>
        <div className="text-add-newresume">새로운 이력서를 추가해보세요!</div>
      </div>
    </div>
  );
}

export default MyResume;
