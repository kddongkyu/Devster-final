import React, {useEffect, useState} from 'react';
import './style/AboardUpdateForm.css';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";

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

    let de = jwt_decode(localStorage.getItem("accessToken"));
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

    // 배열을 콤마로 이어진 문자열로 변환하는 함수
    const convertArrayToString = (arr) => {
        console.log(arr.join(','));
        return arr.join(',');
    };
    const handleImageClick = (index) => {
        // 클릭한 이미지를 배열에서 제거하는 로직
        const newPhotoArray = arrayFromString.filter((_, i) => i !== index);
        setArrayFromString(newPhotoArray);

        // // 변경된 배열을 문자열로 변환하여 setFbPhoto에 넣어줌
        // const newPhotoString = convertArrayToString(newPhotoArray);
        // setFbPhoto(newPhotoString);
        console.log(arrayFromString);
    };

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            ab_subject: abSubject,
            ab_photo: abPhoto,
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
                console.error(error);
            });
    };

    // 파일 업로드
    const onUploadEvent = (e) => {
        const uploadPhoto = new FormData();
        uploadPhoto.append("upload", e.target.files[0]);
        uploadPhoto.append("upload", arrayFromString[0])
        axiosIns({
            method: "post",
            url: `/api/academyboard/D1/photo/${ab_idx}`,
            data: uploadPhoto,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                setAbPhoto(res.data);
            })
            .catch((error) => {
                console.error(error);
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
            <div className="aboard-update-form-photo-list">
                {arrayFromString.map((imageId, index) => (
                    // <div className={'fboard-form-photo'+(index+1)}>
                    <img
                        className={'aboard-form-photo'+(index+1)} key={index}
                        src={`${photoUrl}${imageId}`}
                        alt={`Image ${index}`}
                        onClick={() => handleImageClick(index)}
                    />
                    // </div>
                ))}
                <div className="aboard-update-form-photo1" />
                <div className="aboard-update-form-photo2" />
                <div className="aboard-update-form-photo3" />
                <div className="aboard-update-form-photo4" />
                <div className="aboard-update-form-photo5" />
                <div className="aboard-update-form-photo6" />
                <div className="aboard-update-form-photo7" />
                <div className="aboard-update-form-photo8" />
                <div className="aboard-update-form-photo9" />
                <div className="aboard-update-form-photo10" />
            </div>
            <div className="aboard-update-form-fileupload">
                <input className="aboard-update-form-subject-rec"
                type="file" multiple
                 placeholder="첨부 사진을 올려주세요"
                 onChange={onUploadEvent}
                />

                {/*<img*/}
                {/*    className="aboard-update-form-fileupload-icon"*/}
                {/*    alt=""*/}
                {/*    src={require("./assets/qboard_form_fileupload_icon.svg").default}*/}
                {/*/>*/}
                {/*<div className="aboard-update-form-fileupload-2">*/}
                {/*    사진 3장이 등록되었습니다.*/}
                {/*</div>*/}
            </div>
            <button type="submit" className="aboard-update-form-btn">
                <div className="aboard-update-form-btn-child" />
                <div className="aboard-update-form-btn-text">게시글수정</div>
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