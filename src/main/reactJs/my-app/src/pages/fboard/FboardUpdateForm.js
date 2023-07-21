import React, { useState, useEffect } from "react";
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
    const fboardData = location.state;

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
            }
        }
    }, [fboardData]);

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
            fb_subject: fbSubject,
            fb_photo: fbPhoto,
            fb_content: fbContent,
            m_idx: m_idx,
        };

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
    const onUploadEvent = (e) => {
        const uploadPhoto = new FormData();
        uploadPhoto.append("upload", e.target.files[0]);
        uploadPhoto.append("upload", arrayFromString[0])
        axiosIns({
            method: "post",
            url: `/api/fboard/D1/photo/${fb_idx}`,
            data: uploadPhoto,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => {
                setFbPhoto(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
                    {arrayFromString.map((imageId, index) => (
                        // <div className={'fboard-form-photo'+(index+1)}>
                            <img
                                className={'fboard-form-photo'+(index+1)} key={index}
                                src={`${photoUrl}${imageId}`}
                                alt={`Image ${index}`}
                                onClick={() => handleImageClick(index)}
                            />
                        // </div>
                    ))}
                </div>

                <div className="fboard-form-fileupload">
                    <input
                        type="file" multiple
                        className="fboard-form-subject-rec"
                        placeholder="첨부 사진을 올려주세요."
                        onChange={onUploadEvent}
                    />
                </div>
                <button type='submit' className="fboard-form-btn">
                    <div className="fboard-form-btn-child" />
                    <div className="fboard-form-btn-text">게시글수정</div>
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
