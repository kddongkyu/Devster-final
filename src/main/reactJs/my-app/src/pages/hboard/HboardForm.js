import "./style/HboardForm.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";
import { jwtHandleError } from "../../api/JwtHandleError";
import { checkToken } from "../../api/checkToken";
import ad1 from './assets/008.png';

function HboardForm(props) {
  const [hbSubject, setHbSubject] = useState("");
  const [hbPhoto, setHbPhoto] = useState("");
  const [hbContent, setHbContent] = useState("");
  const [photoLength, setPhotoLength] = useState(0);
  const navi = useNavigate();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //에러 호출용 변수
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
  //디코딩 함수
  const de = checkToken();

  const onSubmitEvent = (e) => {
    e.preventDefault();
    const dto = {
      hb_subject: hbSubject,
      hb_content: hbContent,
      cm_idx: de.idx,
    };
    axiosIns
      .post("/api/compmember/hboard/D1", dto)
      .then((res) => {
        //성공적으로 등록된 경우, 목록으로 이동
        navi("/hboard");
      })
      .catch((error) => {
        //등록 실패 시 에러 처리
        jwtHandleError(error, toastAlert);
      });
  };

  //파일 업로드
  const onUploadEvent = (e) => {
    setIsLoading(true);
    const uploadPhoto = new FormData();
    const files = e.target.files;
    const maxAllowedFiles = 10;

    // 10장이내인지 확인
    if (files.length > maxAllowedFiles) {
      // Handle the error or inform the user that only 10 files are allowed
      alert(" 사진은 최대 10장까지만 업로드할 수 있습니다.");
      e.target.value = null;
      setIsLoading(false);
      return;
    }

    setPhotoLength(files.length);
    const newPhotos = Array.from(files);
    setSelectedPhotos([...newPhotos]);

    for (let i = 0; i < e.target.files.length; i++) {
      uploadPhoto.append("upload", e.target.files[i]);
    }

    axiosIns({
      method: "post",
      url: "/api/compmember/hboard/D1/photo/upload",
      data: uploadPhoto,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setIsLoading(false);
      })
      .catch((error) => {
        //axios용 에러함수
        jwtHandleError(error, toastAlert);
      });
  };

  return (
    <div>
      <form className="hboard-form" onSubmit={onSubmitEvent}>
        <div className="advertise-box">
          <img className="advertise-main"
               alt='' src={ad1}/>
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
        {/* 사진 미리보기*/}
        <div className="hboard-form-photo-list">
          {selectedPhotos.map((photo, index) => (
            <img
              key={index}
              src={URL.createObjectURL(photo)}
              alt={`미리보기 ${index + 1}`}
              className={`hboard-form-photo${index + 1}`}
            />
          ))}
        </div>

        <div className="hboard-form-fileupload">
          <input
            type="file"
            className="hboard-form-subject-rec"
            placeholder="첨부 사진을 올려주세요."
            onChange={onUploadEvent}
            multiple
          />
          <div className="hboard-form-fileupload-cnt-tex">
            <img
              alt=""
              src={require("./assets/hboard_form_fileupload_icon.svg").default}
            />
            &nbsp;&nbsp;사진 {photoLength}장이 등록되었습니다.
          </div>
        </div>
        <button type="submit" className="hboard-form-btn" disabled={isLoading}>
          <div
            className={
              isLoading
                ? "hboard-form-btn-child_loading"
                : "hboard-form-btn-child"
            }
          />
          <div className="hboard-form-btn-text">
            {" "}
            {isLoading ? "로딩중..." : "게시글등록"}{" "}
          </div>
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
