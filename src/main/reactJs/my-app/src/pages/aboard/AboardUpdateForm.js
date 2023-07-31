import React, {useCallback, useEffect, useState} from 'react';
import './style/AboardUpdateForm.css';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {checkToken} from "../../api/checkToken";
import {jwtHandleError} from "../../api/JwtHandleError";

function AboardUpdateForm(props) {

    const [abSubject, setAbSubject] = useState("");
    const [abPhoto, setAbPhoto] = useState("");
    const [abContent, setAbContent] = useState("");
    const navi = useNavigate();
    const { ab_idx, currentPage } = useParams();
    const location = useLocation();
    const aboardData = location.state;
    const [arrayFromString, setArrayFromString] = useState([]);
    const photoUrl = process.env.REACT_APP_PHOTO+"aboard/";
    const [newSelectedPhotos, setNewSelectedPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //에러 호출용 변수
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    //디코딩 함수
    const de = checkToken();
    const m_idx = de.idx;

    useEffect(() => {
        if (aboardData && aboardData.aboard) {
            setAbSubject(aboardData.aboard.ab_subject);
            setAbPhoto(aboardData.aboard.ab_photo);
            setAbContent(aboardData.aboard.ab_content);

            if(aboardData.aboard.ab_photo!=null){
                setArrayFromString(aboardData.aboard.ab_photo.split(","));
            }
        }
    }, [aboardData]);


    // 기존 사진 삭제
    const deleteImage = useCallback((index, imageFileName) => {
        // 이미지를 삭제하는 요청을 서버로 보내는 axios 요청
        axiosIns
            .delete(`/api/academyboard/D1/photo/${ab_idx}/${imageFileName}`)
            .then((res) => {
                setArrayFromString((prevArray) => prevArray.filter((_, i) => i !== index));
            })
            .catch((error) => {
                // 삭제 실패 시 에러 처리
                jwtHandleError(error, toastAlert);
            });
    }, [arrayFromString, ab_idx]);

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
            ab_subject: abSubject,
            ab_photo: arrayFromString.join(','),
            ab_content: abContent,
            m_idx: m_idx,
        };

        axiosIns
            .put(`/api/academyboard/D1/${ab_idx}`, dto)
            .then((res) => {
                // 성공적으로 업데이트된 경우, 상세 페이지로 이동
                navi(`/aboard/detail/${ab_idx}/${currentPage}`);
            })
            .catch((error) => {
                // 업데이트 실패 시 에러 처리
                jwtHandleError(error, toastAlert);
            });
    };


    // 파일 업로드
    const uploadPhoto = (e) => {
        setIsLoading(true);
        const upload = new FormData();
        const maxAllowedFiles = 10;

        // 업데이트된 사진 10장이내인지 확인
        if (e.target.files.length + arrayFromString.length > maxAllowedFiles) {
            alert(" 사진은 최대 10장까지만 업로드할 수 있습니다.");
            e.target.value = null;
            setIsLoading(false);
            return;
        }

        for (let i = 0; i < e.target.files.length; i++) {
            upload.append("upload", e.target.files[i]);
        }
        axiosIns({
            method: "post",
            url: `/api/academyboard/D1/photo/${ab_idx}`,
            data: upload,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                setArrayFromString([...arrayFromString, ...res.data.split(',')]);
                setIsLoading(false);
            })
            .catch((error) => {
                jwtHandleError(error, toastAlert);
            });
    };


        return (
        <form className="aboard-update-form" onSubmit={onSubmitEvent}>
            <div className="advertise-box">
                <div className="advertise-main" />
                <b className="advertise-text">광고</b>
            </div>
            <div className="aboard-update-name">
                <div className="aboard-update-name-box" />
                <div className="aboard-update-name-text">
                    <div className="aboard-update-name-text-type">학원별 게시판</div>
                    <div className="aboard-update-name-text-detail">
                        인증이 완료된 사용자만 열람할 수 있는 게시판입니다.
                    </div>
                </div>
            </div>
            <div className="aboard-update-form-subject">
                <input className="aboard-update-form-subject-rec"
                type="text"
                placeholder="제목을 입력해주세요."
                required
                onChange={(e) => setAbSubject(e.target.value)}
                value={abSubject}
                />
            </div>
            <div className="aboard-update-form-content">
                <textarea className="aboard-update-form-content-rec"
                  required
                  value={abContent}
                  onChange={(e) => setAbContent(e.target.value)}
                >
                </textarea>

            </div>
            {/*사진 미리보기*/}
            <div className="aboard-update-form-photo-list">
                {([...arrayFromString, ...newSelectedPhotos]).map((imageId, index) => (
                   <img
                    key={index}
                    src={typeof imageId === 'string' ? `${photoUrl}${imageId}` : URL.createObjectURL(imageId)}
                    alt={`Image ${index}`}
                    className={`aboard-form-photo${index + 1}`}
                    // onClick={() => deleteImage(index, imageId)}
                    onClick={() => {
                    if (typeof imageId === 'string') {
                    deleteImage(index, imageId);
                } else {
                    deleteNewImage(index - 1);
                }
                }}
                    />
                ))}
                {/*<div className="aboard-update-form-photo1" />*/}
                {/*<div className="aboard-update-form-photo2" />*/}
                {/*<div className="aboard-update-form-photo3" />*/}
                {/*<div className="aboard-update-form-photo4" />*/}
                {/*<div className="aboard-update-form-photo5" />*/}
                {/*<div className="aboard-update-form-photo6" />*/}
                {/*<div className="aboard-update-form-photo7" />*/}
                {/*<div className="aboard-update-form-photo8" />*/}
                {/*<div className="aboard-update-form-photo9" />*/}
                {/*<div className="aboard-update-form-photo10" />*/}
                <div className="aboard-form-photo-list_text">삭제하고싶은 사진을 클릭하세요.</div>
            </div>
            <div className="aboard-update-form-fileupload">
                <input className="aboard-update-form-subject-rec"
                type="file" multiple
                 placeholder="첨부 사진을 올려주세요"
                 onChange={uploadPhoto}
                />

                <img
                    className="aboard-update-form-fileupload-icon"
                    alt=""
                    src={require("./assets/qboard_form_fileupload_icon.svg").default}
                />
                <div className="aboard-update-form-fileupload-2">
                    &nbsp;&nbsp;사진 {arrayFromString.length + newSelectedPhotos.length}장이 등록되었습니다.
                </div>
            </div>
            <button type="submit" className="aboard-update-form-btn">
                <div className={isLoading ? "aboard-form-btn-child_loading" : "aboard-update-form-btn-child"}/>
                <div className="aboard-update-form-btn-text">{isLoading ? "로딩중..." : "게시글수정"}</div>
                <img
                    className="aboard-update-form-btn-icon"
                    alt=""
                    src={require("./assets/qboard_form_btn_icon.svg").default}
                />
            </button>
            <div className="moblie" />
        </form>
    );
}

export default AboardUpdateForm;