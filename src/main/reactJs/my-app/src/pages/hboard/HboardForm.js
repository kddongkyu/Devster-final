import "./style/HboardForm.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const HboardForm = () => {
  const [hb_subject, setHb_subject] = useState("");
  const [hb_photo, setHb_photo] = useState("");
  const [hb_content, setHb_content] = useState("");

  const navi = useNavigate();

  const cm_idx = 14;

  const onSubmitEvent = (e) => {
    e.preventDefault();
    Axios.post("/hboard/insert", {
      cm_idx,
      hb_subject,
      hb_content,
      hb_photo,
    }).then((res) => {
      navi("/hboard");
    });
  };

  const onUploadEvent = (e) => {
    const uploadFile = new FormData();
    uploadFile.append("upload", e.target.files[0]);
    Axios({
      method: "post",
      url: "/hboard/upload",
      data: uploadFile,
      headers: { "Content-type": "multipart/form-data" },
    }).then((res) => {
      console.log(res.data);
      setHb_photo(res.data);
    });
  };

  return (
    <div className="hboard-form">
      <form onSubmit={onSubmitEvent}>
        <div className="advertise-box">
          <div className="advertise-main" />
          <b className="advertise-text">광고</b>
        </div>
        <div className="moblie" />
        <div className="hboard-name">
          <div className="hboard-name-box" />
          <div className="hboard-name-text">
            <b className="hboard-name-text-type">채용정보 게시판</b>
            <div className="hboard-name-text-detail">
              다양한 기업들의 공고를 확인할 수 있는 게시판
            </div>
          </div>
        </div>
        <div className="qboard-form-subject">
          <div className="qboard-form-subject-rec" />
          <div className="div">
            <input
              type="text"
              className="form-control"
              placeholder="제목을 입력해주세요"
              value={hb_subject}
              onChange={(e) => setHb_subject(e.target.value)}
            />
          </div>
        </div>
        <div className="qboard-form-content">
          <div className="qboard-form-content-rec" />
          <div className="qboard-form-content-text">
            <input
              type="text"
              className="form-control"
              placeholder="내용을 입력해주세요"
              value={hb_content}
              onChange={(e) => setHb_content(e.target.value)}
            />
          </div>
        </div>
        <div className="qboard-form-fileupload">
          <div className="qboard-form-subject-rec" />
          <div className="qboard-form-fileupload-placeho">
            첨부 사진을 올려주세요.
            <input
              type="file"
              className="form-control"
              onChange={onUploadEvent}
            />
          </div>
          <img
            className="qboard-form-fileupload-icon"
            alt=""
            src={require("./assets/qboard_form_fileupload_icon.svg").default}
          />
          <div className="qboard-form-fileupload-cnt-tex">
            사진 3장이 등록되었습니다.
          </div>
        </div>
        <div className="qboard-form-btn">
          <div className="qboard-form-btn-child" />
          {/* <div className="qboard-form-btn-text">게시글등록</div> */}
          <button type="submit" className="btn qboard-form-btn-text">
            게시글등록
          </button>
          <img
            className="qboard-form-btn-icon"
            alt=""
            src={require("./assets/qboard_form_btn_icon.svg").default}
          />
        </div>
      </form>
    </div>
  );
};

export default HboardForm;
