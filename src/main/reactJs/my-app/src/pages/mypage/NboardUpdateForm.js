import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";

function NboardUpdateForm(props) {
  const { nb_idx, currentPage } = useParams();
  const [nbSubject, setNbSubject] = useState("");
  const [nbContent, setNbContent] = useState("");
  const [nbPhotos, setNbPhotos] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    // Fetch the current post data
    axiosIns
      .get(`/api/nboard/D0/${nb_idx}`)
      .then((response) => {
        setNbSubject(response.data.nboard.nb_subject);
        setNbContent(response.data.nboard.nb_content);
        setNbPhotos(
          response.data.nboard.nb_photo
            ? response.data.nboard.nb_photo.split(",")
            : []
        );
      })
      .catch((error) => {
        console.error("Error fetching nboard detail:", error);
      });
  }, [nb_idx]);

  const onSubmitEvent = (e) => {
    e.preventDefault();
    const updateForm = new FormData();

    // Append the updated data
    updateForm.append("nb_subject", nbSubject);
    updateForm.append("nb_content", nbContent);
    nbPhotos.forEach((photo) => {
      updateForm.append("nb_photo", photo);
    });

    axiosIns
      .put(`/api/nboard/D1/${nb_idx}`, updateForm)
      .then((res) => {
        // Navigate to the detail page after successful update
        navi(`/nboard/detail/${nb_idx}/${currentPage}`);
      })
      .catch((error) => {
        // Error handling
        console.error(error);
      });
  };

  const onUploadEvent = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      setNbPhotos((oldPhotos) => [...oldPhotos, e.target.files[i]]);
    }
    console.log(nbPhotos);
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
            required
            onChange={(e) => setNbSubject(e.target.value)}
            value={nbSubject}
          />
        </div>
        <div className="fboard-form-content">
          <textarea
            className="fboard-form-content-rec"
            required
            value={nbContent}
            onChange={(e) => setNbContent(e.target.value)}
          ></textarea>
        </div>

        <div className="fboard-form-fileupload">
          <input
            type="file"
            className="fboard-form-subject-rec"
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
            &nbsp;&nbsp;사진 {nbPhotos.length}장이 등록되었습니다.
          </div>
        </div>
        <button
          type="submit"
          className="fboard-form-btn"
          // disabled={!isSubmitEnabled}
        >
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

export default NboardUpdateForm;
