import React, { useState, useEffect } from "react";
import axiosIns from "../../api/JwtConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { JwtPageChk } from "../../api/JwtPageChk";
import "./style/Main.css";
import {
  MainBest,
  MainFreeboard,
  MainHire,
  MainQnA,
  MainReview,
} from "./index";
import { jwtHandleError } from "../../api/JwtHandleError";

function Main(props) {
  const navi = useNavigate();

  return (
    <div className="moblie-main">
      <div className="main-preview-name">
        <div className="main-preview-name-box" />
        <b className="main-preview-name-text">실시간 인기글</b>
      </div>
      <MainBest />
      <div className="main-preview-name1">
        <div className="main-preview-name-box" />
        <b className="main-preview-name-text">자유게시판 (최신순)</b>
      </div>
      <MainFreeboard />
      <div className="main-freeboard-more">
        <div
          className="main-best-more-text"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navi("/fboard");
          }}
        >
          더보기
        </div>
        <img
          className="main-best-more-icon"
          alt=""
          src={require("./assets/main_more_icon.svg").default}
        />
      </div>
      <div className="main-preview-name2">
        <div className="main-preview-name-box" />
        <b className="main-preview-name-text">질문게시판 (최신순)</b>
      </div>
      <MainQnA />
      <div className="main-qna-more">
        <div
          className="main-best-more-text"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navi("/qboard");
          }}
        >
          더보기
        </div>
        <img
          className="main-best-more-icon"
          alt=""
          src={require("./assets/main_more_icon.svg").default}
        />
      </div>
      <div className="main-preview-name3">
        <div className="main-preview-name-box" />
        <b className="main-preview-name-text">채용게시판 (최신순)</b>
      </div>
      <MainHire />
      <div className="main-hire-more">
        <div
          className="main-best-more-text"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navi("/hboard");
          }}
        >
          더보기
        </div>
        <img
          className="main-best-more-icon"
          alt=""
          src={require("./assets/main_more_icon.svg").default}
        />
      </div>
      <div className="main-preview-name4">
        <div className="main-preview-name-box" />
        <b className="main-preview-name-text">리뷰게시판 (최신순)</b>
      </div>
      <MainReview />
      <div className="main-review-more">
        <div
          className="main-best-more-text"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navi("/review");
          }}
        >
          더보기
        </div>
        <img
          className="main-best-more-icon"
          alt=""
          src={require("./assets/main_more_icon.svg").default}
        />
      </div>
    </div>
  );
}
export default Main;
