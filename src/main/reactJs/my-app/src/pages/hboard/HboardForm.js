import "./style/HboardForm.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";

function HboardForm(props) {
  const [hbSubject, setHbSubject] = useState("");
  const [hbPhoto, setHbPhoto] = useState("");
  const [hbContent, setHbContent] = useState("");
  const [photoLength, setPhotoLength] = useState(0);
  const navi = useNavigate();

  let de = jwt_decode(localStorage.getItem("accessToken"));
  console.log(de.idx);

  const onSubmitEvent = (e) => {
    e.preventDefault();

    const dto = {
      hb_subject: hbSubject,
      hb_content: hbContent,
      cm_idx: de.idx,
    };

    axiosIns
      .post("/api/hboard/D1", dto)
      .then((res) => {
        //성공적으로 등록된 경우, 목록으로 이동
        navi("/hboard");
      })
      .catch((error) => {
        //등록 실패 시 에러 처리
        console.error(error);
      });
  };

  //파일 업로드
  const onUploadEvent = (e) => {
    const uploadPhoto = new FormData();
    setPhotoLength(e.target.files.length);

    for (let i = 0; i < e.target.files.length; i++) {
      uploadPhoto.append("upload", e.target.files[i]);
    }

    axiosIns({
      method: "post",
      url: "/api/hboard/D1/photo/upload",
      data: uploadPhoto,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      // setFbPhoto(res.data);
      // // 추가: 업로드가 완료되면 fbPhoto 상태를 dto에 설정
      // const dto = {
      //     fb_subject: fbSubject,
      //     fb_photo: res.data.join(","), // 여러장의 사진 URL을 쉼표로 구분하여 문자열로 설정
      //     fb_content: fbContent,
      //     m_idx: de.idx
      // };
    });
  };

  return (
    <div>
      <form className="hboard-form" onSubmit={onSubmitEvent}>
        <div className="advertise-box">
          <div className="advertise-main" />
          <b className="advertise-text">광고</b>
        </div>
        <div className="hboard-name">
          <div className="hboard-name-box" />
          <div className="hboard-name-text">
            <b className="hboard-name-text-type">채용정보 게시판</b>
            <div className="hboard-name-text-detail">
              다양한 기업들의 공고를 확인할 수 있는 게시판
            </div>
          </div>
        </div>
        <div className="hboard-form-subject">
          <input
            type="text"
            className="hboard-form-subject-rec"
            placeholder="제목을 입력해주세요."
            required
            onChange={(e) => setHbSubject(e.target.value)}
            value={hbSubject}
          />
        </div>
        <div className="hboard-form-content">
          <textarea
            className="hboard-form-content-rec"
            placeholder="내용을 입력해주세요."
            required
            value={hbContent}
            onChange={(e) => setHbContent(e.target.value)}
          ></textarea>
        </div>
        <div className="hboard-form-fileupload">
          <input
            type="file"
            className="hboard-form-subject-rec"
            placeholder="첨부 사진을 올려주세요."
            onChange={onUploadEvent}
            multiple
          />
          {/* <div className="hboard-form-subject-rec" />
        <div className="hboard-form-fileupload-placeho">
          첨부 사진을 올려주세요.
        </div> */}
          <div className="hboard-form-fileupload-cnt-tex">
            <img
              alt=""
              src={require("./assets/hboard_form_fileupload_icon.svg").default}
            />
            &nbsp;&nbsp;사진 {photoLength}장이 등록되었습니다.
          </div>
        </div>
        <button type="submit" className="hboard-form-btn">
          <div className="hboard-form-btn-child" />
          <div className="hboard-form-btn-text">게시글등록</div>
          <img
            className="hboard-form-btn-icon"
            alt=""
            src={require("./assets/hboard_form_btn_icon.svg").default}
          />
        </button>
        <div className="mobile" />
      </form>
    </div>
  );
}

export default HboardForm;
