import "./style/HboardForm.css";
import Axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

const HboardUpdateForm = () => {
  const [hb_subject, setHb_subject] = useState("");
  const [hb_photo, setHb_photo] = useState("");
  const [hb_content, setHb_content] = useState("");
  const navi = useNavigate();
  const { hb_idx, currentPage } = useParams();
  const location = useLocation();
  const hboardData = location.state;
  const [newSelectedPhotos, setNewSelectedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [arrayFromString, setArrayFromString] = useState([]);
  const photoUrl = process.env.REACT_APP_PHOTO + "hboard/";

  //에러 호출용 변수
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  let de = jwt_decode(localStorage.getItem("accessToken"));
  const cm_idx = de.idx;

  useEffect(() => {
    if (hboardData) {
      setHb_subject(hboardData.hb_subject);
      setHb_content(hboardData.hb_content);
      setHb_photo(hboardData.hb_photo);
      if (hboardData.hb_photo != null) {
        setArrayFromString(hboardData.hb_photo.split(","));
      }
    }
  }, [hboardData]);

  //기존 사진 삭제
  const deleteImage = useCallback(
    (index, imageFileName) => {
      //이미지를 삭제하는 요청을 서버로 보내는 axios 요청
      axiosIns
        .delete(`/api/compmember/hboard/D1/photo/${hb_idx}/${imageFileName}`)
        .then((res) => {
          setArrayFromString((prevArray) =>
            prevArray.filter((_, i) => i !== index)
          );
        })
        .catch((error) => {
          // 삭제 실패 시 에러 처리
          jwtHandleError(error, toastAlert);
        });
    },
    [arrayFromString, hb_idx]
  );

  // 추가 사진 삭제
  const deleteNewImage = (index) => {
    setNewSelectedPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.filter((_, i) => i !== index);
      return updatedPhotos;
    });
  };

  const onSubmitEvent = (e) => {
    e.preventDefault();

    const dto = {
      hb_subject: hb_subject,
      hb_content: hb_content,
      hb_photo: arrayFromString.join(","),
      cm_idx: cm_idx,
    };

    axiosIns
      .put(`/api/compmember/hboard/D1/${hb_idx}`, dto)
      .then((res) => {
        //성공적으로 업데이트 된 경우, 상세 페이지로 이동
        navi(`/hboard/detail/${hb_idx}/${currentPage}`);
      })
      .catch((error) => {
        jwtHandleError(error, toastAlert);
      });
  };

  //파일 업로드
  const uploadPhoto = (e) => {
    setIsLoading(true);
    const upload = new FormData();
    const maxAllowedFiles = 10;

    //업데이트된 사진 10장이내인지 확인
    if (e.target.files.length + arrayFromString.length > maxAllowedFiles) {
      alert("사진은 최대 10장까지만 업로드할 수 있습니다.");
      e.target.value = null;
      setIsLoading(false);
      return;
    }

    for (let i = 0; i < e.target.files.length; i++) {
      upload.append("upload", e.target.files[i]);
    }

    axiosIns({
      method: "post",
      url: `/api/compmember/hboard/D1/photo/${hb_idx}`,
      data: upload,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setArrayFromString([...arrayFromString, ...res.data.split(",")]);
      setIsLoading(false);
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
          <div className="board-name-box" />
          <div className="hboard-name-text">
            <div className="hboard-name-text-type">채용게시판</div>
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
            onChange={(e) => setHb_subject(e.target.value)}
            value={hb_subject}
          />
        </div>
        <div className="hboard-form-content">
          <textarea
            className="hboard-form-content-rec"
            required
            value={hb_content}
            onChange={(e) => setHb_content(e.target.value)}
          ></textarea>
        </div>

        {/*사진 미리보기*/}
        <div className="hboard-form-photo-list">
          {[...arrayFromString, ...newSelectedPhotos].map((imageId, index) => (
            <img
              key={index}
              src={
                typeof imageId === "string"
                  ? `${photoUrl}${imageId}`
                  : URL.createObjectURL(imageId)
              }
              alt={`Image ${index}`}
              className={`fboard-form-photo${index + 1}`}
              onClick={() => {
                if (typeof imageId === "string") {
                  deleteImage(index, imageId);
                } else {
                  deleteNewImage(index - 1);
                }
              }}
            />
          ))}
          <div className="hboard-form-photo-list_text">
            삭제하고 싶은 사진을 클릭하세요.
          </div>
        </div>

        <div className="hboard-form-fileupload">
          <input
            type="file"
            multiple
            className="hboard-form-subject-rec"
            placeholder="첨부 사진을 올려주세요."
            onChange={uploadPhoto}
          />
          <div className="hboard-form-fileupload-cnt-tex">
            <img
              alt=""
              src={require("./assets/qboard_form_fileupload_icon.svg").default}
            />
            &nbsp;&nbsp;사진 {arrayFromString.length + newSelectedPhotos.length}
            장이 등록되었습니다.
          </div>
        </div>
        <button type="submit" className="fboard-form-btn" disabled={isLoading}>
          <div
            className={
              isLoading
                ? "hboard-form-btn-child_loading"
                : "hboard-form-btn-child"
            }
          />
          <div className="hboard-form-btn-text">
            {isLoading ? "로딩중..." : "게시글수정"}
          </div>
          <img
            className="hboard-form-btn-icon"
            alt=""
            src={require("./assets/qboard_form_btn_icon.svg").default}
          />
        </button>
      </form>
    </div>
  );
};

export default HboardUpdateForm;
