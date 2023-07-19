import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";

function FboardUpdateForm({ fboardData }) {
    const [fbSubject, setFbSubject] = useState("");
    const [fbPhoto, setFbPhoto] = useState("");
    const [fbContent, setFbContent] = useState("");
    const navi = useNavigate();
    const { fb_idx, currentPage } = useParams();

    let de = jwt_decode(localStorage.getItem("accessToken"));
    const m_idx = de.idx;

    useEffect(() => {
        if (fboardData && fboardData.fboard) {
            setFbSubject(fboardData.fboard.fb_subject);
            setFbPhoto(fboardData.fboard.fb_photo);
            setFbContent(fboardData.fboard.fb_content);
        }
    }, [fboardData]);


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
                <div className="qboard-form-subject">
                    <input
                        type="text"
                        className="qboard-form-subject-rec"
                        placeholder="제목을 입력해주세요."
                        required
                        onChange={(e) => setFbSubject(e.target.value)}
                        value={fbSubject}
                    />
                </div>
                <div className="qboard-form-content">
          <textarea
              className="qboard-form-content-rec"
              placeholder="내용을 입력해주세요."
              required
              value={fbContent}
              onChange={(e) => setFbContent(e.target.value)}
          ></textarea>
                </div>
                <div className="qboard-form-fileupload">
                    <input
                        type="file"
                        className="qboard-form-subject-rec"
                        placeholder="첨부 사진을 올려주세요."
                        onChange={onUploadEvent}
                    />
                </div>
                <button type="submit" className="qboard-form-btn">
                   게시글수정
                </button>
            </form>
        </div>
    );
}

export default FboardUpdateForm;
