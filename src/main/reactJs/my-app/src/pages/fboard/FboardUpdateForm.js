import React, {useState, useEffect, useCallback} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";

function FboardUpdateForm(props) {
    const [fbSubject, setFbSubject] = useState("");
    const [fbPhoto, setFbPhoto] = useState("");
    const [fbContent, setFbContent] = useState("");
    const navi = useNavigate();
    const { fb_idx, currentPage } = useParams();
    const location = useLocation();
    const [photoLength, setPhotoLength]=useState(0);
    const fboardData = location.state;
    const [newSelectedPhotos, setNewSelectedPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [arrayFromString, setArrayFromString] = useState([]);
    const photoUrl = process.env.REACT_APP_PHOTO+"fboard/";

    let de = jwt_decode(localStorage.getItem("accessToken"));
    const m_idx = de.idx;


    useEffect(() => {
        if (fboardData && fboardData.fboard) {
            setFbSubject(fboardData.fboard.fb_subject);
            setFbPhoto(fboardData.fboard.fb_photo);
            setFbContent(fboardData.fboard.fb_content);

            if(fboardData.fboard.fb_photo!=null){
                setArrayFromString(fboardData.fboard.fb_photo.split(","));

                // setPhotoLength(arrayFromString.length);
            }
        }
    }, [fboardData]);

    // 기존 사진 삭제
    const deleteImage = useCallback((index, imageFileName) => {
        // 이미지를 삭제하는 요청을 서버로 보내는 axios 요청
        axiosIns
            .delete(`/api/fboard/D1/photo/${fb_idx}/${imageFileName}`)
            .then((res) => {
                // 클릭한 이미지를 배열에서 제거하는 로직
                // const newPhotoArray = arrayFromString.filter((_, i) => i !== index);
                // setArrayFromString(newPhotoArray);
                setArrayFromString((prevArray) => prevArray.filter((_, i) => i !== index));

                // setPhotoLength(photoLength - 1);
            })
            .catch((error) => {
                // 삭제 실패 시 에러 처리
                console.error(error);
            });
    },[arrayFromString, fb_idx]);

    // 추가 사진 삭제
    const deleteNewImage = (index) => {
        setNewSelectedPhotos((prevPhotos) => {
            const updatedPhotos = prevPhotos.filter((_, i) => i !== index);
            return updatedPhotos;
        });
    };

  useEffect(() => {
    if (fboardData && fboardData.fboard) {
      setFbSubject(fboardData.fboard.fb_subject);
      setFbPhoto(fboardData.fboard.fb_photo);
      setFbContent(fboardData.fboard.fb_content);

      if (fboardData.fboard.fb_photo != null) {
        setArrayFromString(fboardData.fboard.fb_photo.split(","));

        // setPhotoLength(arrayFromString.length);
      }
    }
  }, [fboardData]);

    // 파일 업로드
    const onUploadEvent = useCallback((e) => {
        setIsLoading(true);
        const uploadPhoto = new FormData();
        const selectedFiles = e.target.files;
        // const uploadedFiles = arrayFromString.map((imageId) => new File([], imageId));
        // const filesToUpload = [...uploadedFiles, ...selectedFiles];
        const maxAllowedFiles = 10;

        // Check if the number of files exceeds the limit
        if (selectedFiles.length + arrayFromString.length > maxAllowedFiles) {
            // Handle the error or inform the user that only 10 files are allowed
            alert(" 사진은 최대 10장까지만 업로드할 수 있습니다.");
            e.target.value = null;
            setIsLoading(false);
            return;
        }
        // setPhotoLength(photoLength + selectedFiles.length);
        const newPhotos = Array.from(selectedFiles);
        setNewSelectedPhotos([...newSelectedPhotos, ...newPhotos]);

        for (let i = 0; i < selectedFiles.length; i++) {
            uploadPhoto.append("upload", selectedFiles[i]);
        }
        axiosIns({
            method: "post",
            url: `/api/fboard/D1/photo/${fb_idx}`,
            data: uploadPhoto,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                // 업로드된 이미지 파일명과 기존 이미지 파일명을 합침
                // 서버 응답인 res.data가 비어있지 않은지 확인한 후에 분할합니다.
                const updatedImageFileNames = res.data ? [...res.data.split(","), ...arrayFromString.filter(Boolean)] : arrayFromString.filter(Boolean);
                setArrayFromString(updatedImageFileNames);

            })
            .catch((error) => {
                console.error(error);
            }).finally(()=>{
                setIsLoading(false);
            });
    },[arrayFromString,fb_idx, newSelectedPhotos]);


    axiosIns
      .put(`/api/fboard/D1/${fb_idx}`, dto)
      .then((res) => {
        // 성공적으로 업데이트된 경우, 상세 페이지로 이동
        navi(`/fboard/detail/${fb_idx}/${currentPage}`);
      })
      .catch((error) => {
        // 업데이트 실패 시 에러 처리
        console.error(error);
      });
  };

  // 파일 업로드
  const onUploadEvent = useCallback(
    (e) => {
      setIsLoading(true);
      const uploadPhoto = new FormData();
      const selectedFiles = e.target.files;
      // const uploadedFiles = arrayFromString.map((imageId) => new File([], imageId));
      // const filesToUpload = [...uploadedFiles, ...selectedFiles];
      const maxAllowedFiles = 10;

      // Check if the number of files exceeds the limit
      if (selectedFiles.length + arrayFromString.length > maxAllowedFiles) {
        // Handle the error or inform the user that only 10 files are allowed
        alert(" 사진은 최대 10장까지만 업로드할 수 있습니다.");
        e.target.value = null;
        setIsLoading(false);
        return;
      }
      // setPhotoLength(photoLength + selectedFiles.length);
      const newPhotos = Array.from(selectedFiles);
      setNewSelectedPhotos([...newSelectedPhotos, ...newPhotos]);

      for (let i = 0; i < selectedFiles.length; i++) {
        uploadPhoto.append("upload", selectedFiles[i]);
      }
      axiosIns({
        method: "post",
        url: `/api/fboard/D1/photo/${fb_idx}`,
        data: uploadPhoto,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          // 업로드된 이미지 파일명과 기존 이미지 파일명을 합침
          // 서버 응답인 res.data가 비어있지 않은지 확인한 후에 분할합니다.
          const updatedImageFileNames = res.data
            ? [...res.data.split(","), ...arrayFromString.filter(Boolean)]
            : arrayFromString.filter(Boolean);
          setArrayFromString(updatedImageFileNames);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [arrayFromString, fb_idx, newSelectedPhotos]
  );

  return (
    <div>
      <form className="fboard-form" onSubmit={onSubmitEvent}>
        <div className="advertise-box">
          <div className="advertise-main" />
          <b className="advertise-text">광고</b>
        </div>
        <div className="fboard-name">
          <div className="board-name-box" />
          <div className="fboard-name-text">
            <div className="fboard-name-text-type">자유게시판</div>
            <div className="fboard-name-text-detail">
              다양한 주제의 자유로운 대화를 나누는 게시판
            </div>
          </div>
        </div>
        <div className="fboard-form-subject">
          <input
            type="text"
            className="fboard-form-subject-rec"
            placeholder="제목을 입력해주세요."
            required
            onChange={(e) => setFbSubject(e.target.value)}
            value={fbSubject}
          />
        </div>
        <div className="fboard-form-content">
          <textarea
            className="fboard-form-content-rec"
            required
            value={fbContent}
            onChange={(e) => setFbContent(e.target.value)}
          ></textarea>
                </div>

                {/* 사진 미리보기*/}
                <div className="fboard-form-photo-list">
                    {([...arrayFromString, ...newSelectedPhotos]).map((imageId, index) => (
                        <img
                            key={index}
                            src={typeof imageId === 'string' ? `${photoUrl}${imageId}` : URL.createObjectURL(imageId)}
                            alt={`Image ${index}`}
                            className={`fboard-form-photo${index + 1}`}
                            // onClick={() => deleteImage(index, imageId)}
                            onClick={() => {
                                if (typeof imageId === 'string') {
                                    deleteImage(index, imageId);
                                } else {
                                    deleteNewImage(index-1);
                                }
                            }}
                        />
                    ))}
                    <div className="fboard-form-photo-list_text">삭제하고싶은 사진을 클릭하세요.</div>
                </div>

                <div className="fboard-form-fileupload">
                    <input
                        type="file" multiple
                        className="fboard-form-subject-rec"
                        placeholder="첨부 사진을 올려주세요."
                        onChange={onUploadEvent}
                    />
                    <div className="fboard-form-fileupload-cnt-tex">
                        <img
                            // className="fboard-form-fileupload-icon"
                            alt=""
                            src={require("./assets/qboard_form_fileupload_icon.svg").default}
                        />
                        &nbsp;&nbsp;사진 {arrayFromString.length}장이 등록되었습니다.
                    </div>
                </div>
                <button type='submit' className="fboard-form-btn" disabled={isLoading}>
                    <div className={isLoading ? "fboard-form-btn-child_loading" : "fboard-form-btn-child"} />
                    <div className="fboard-form-btn-text">{isLoading ? "로딩중..." : "게시글수정"}</div>
                    <img
                        className="fboard-form-btn-icon"
                        alt=""
                        src={require("./assets/qboard_form_btn_icon.svg").default}
                    />
                </button>
            </form>
        </div>

        {/* 사진 미리보기*/}
        <div className="fboard-form-photo-list">
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
              // onClick={() => deleteImage(index, imageId)}
              onClick={() => {
                if (typeof imageId === "string") {
                  deleteImage(index, imageId);
                } else {
                  deleteNewImage(index - 1);
                }
              }}
            />
          ))}
          <div className="fboard-form-photo-list_text">
            삭제하고싶은 사진을 클릭하세요.
          </div>
        </div>

        <div className="fboard-form-fileupload">
          <input
            type="file"
            multiple
            className="fboard-form-subject-rec"
            placeholder="첨부 사진을 올려주세요."
            onChange={onUploadEvent}
          />
          <div className="fboard-form-fileupload-cnt-tex">
            <img
              // className="fboard-form-fileupload-icon"
              alt=""
              src={require("./assets/qboard_form_fileupload_icon.svg").default}
            />
            &nbsp;&nbsp;사진 {arrayFromString.length}장이 등록되었습니다.
          </div>
        </div>
        <button type="submit" className="fboard-form-btn" disabled={isLoading}>
          <div
            className={
              isLoading
                ? "fboard-form-btn-child_loading"
                : "fboard-form-btn-child"
            }
          />
          <div className="fboard-form-btn-text">
            {isLoading ? "로딩중..." : "게시글수정"}
          </div>
          <img
            className="fboard-form-btn-icon"
            alt=""
            src={require("./assets/qboard_form_btn_icon.svg").default}
          />
        </button>
      </form>
    </div>
  );
}

export default FboardUpdateForm;
