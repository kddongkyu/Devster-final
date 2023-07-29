import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function NboardForm(props) {
  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const [nbSubject, setNbSubject] = useState("");
  const [nbPhoto, setNbPhoto] = useState("");
  const [nbContent, setNbContent] = useState("");
  const [photoLength, setPhotoLength] = useState(0);
  const navi = useNavigate();

  const onSubmitEvent = (e) => {
    e.preventDefault();

    const dto = {
      nb_subject: nbSubject,
      nb_photo: nbPhoto,
      nb_content: nbContent,
      m_idx: decodedToken.idx,
    };

    axiosIns
      .post("/api/nboard/D1", dto)
      .then((res) => {
        // 성공적으로 등록된 경우, 목록으로 이동
        navi("/notice/admin");
      })
      .catch((error) => {
        // 등록 실패 시 에러 처리
        jwtHandleError(e, toastAlert);
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
      url: "/api/nboard/D1/photo/upload",
      data: uploadPhoto,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setNbPhoto(res.data.join(","));
    });
  };

  return (
    <div>
      <form className="fboard-form" onSubmit={onSubmitEvent}>
        <div className="fboard-name">
          <div className="board-name-box" />
          <div className="fboard-name-text">
            <div className="fboard-name-text-type">공지사항</div>
          </div>
        </div>
        <div className="fboard-form-subject">
          <input
            type="text"
            className="fboard-form-subject-rec"
            placeholder="제목을 입력해주세요."
            required
            onChange={(e) => setNbSubject(e.target.value)}
            value={nbSubject}
          />
        </div>
        <div className="fboard-form-content">
          <textarea
            className="fboard-form-content-rec"
            placeholder="내용을 입력해주세요."
            required
            value={nbContent}
            onChange={(e) => setNbContent(e.target.value)}
          ></textarea>
        </div>

        <div className="fboard-form-fileupload">
          <input
            type="file"
            className="fboard-form-subject-rec"
            placeholder="첨부 사진을 올려주세요."
            onChange={onUploadEvent}
            multiple
          />
          {/*<div className="fboard-form-fileupload-placeho">*/}
          {/*  첨부 사진을 올려주세요.*/}
          {/*</div>*/}
          <div className="fboard-form-fileupload-cnt-tex">
            <img
              // className="fboard-form-fileupload-icon"
              alt=""
              src={require("./assets/qboard_form_fileupload_icon.svg").default}
            />
            &nbsp;&nbsp;사진 {photoLength}장이 등록되었습니다.
          </div>
        </div>
        <button type="submit" className="fboard-form-btn">
          <div className="fboard-form-btn-child" />
          <div className="fboard-form-btn-text">게시글등록</div>
          <img
            className="fboard-form-btn-icon"
            alt=""
            src={require("./assets/qboard_form_btn_icon.svg").default}
          />
        </button>
        <div className="moblie" />
      </form>
      {/*<img alt='' src={`${photoUrl}${photo}`}/>*/}
    </div>
  );
}

export default NboardForm;
