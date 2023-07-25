import "./style/FboardForm.css";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {jwtHandleError} from "../../api/JwtHandleError";
import {checkToken} from "../../api/checkToken";

function FboardForm(props) {

    const [fbSubject, setFbSubject] = useState('');
    const [fbPhoto, setFbPhoto] = useState('');
    const [fbContent, setFbContent] = useState('');
    const [photoLength, setPhotoLength] = useState(0);
    const navi = useNavigate();
    //에러 호출용 변수
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    //디코딩 함수
    const de=checkToken();

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            fb_subject: fbSubject,
            // fb_photo: fbPhoto,
            fb_content: fbContent,
            m_idx: de.idx
        };

        axiosIns.post("/api/fboard/D1", dto)
            .then(res => {
                // 성공적으로 등록된 경우, 목록으로 이동
                navi("/fboard");
            })
            .catch(error => {
                // 등록 실패 시 에러 처리
                console.error(error);
            });
    }

//파일 업로드
    const onUploadEvent = (e) => {
        const uploadPhoto = new FormData();
        setPhotoLength(e.target.files.length);

        for (let i = 0; i < e.target.files.length; i++) {
            uploadPhoto.append("upload", e.target.files[i]);
        }

        axiosIns({
            method: 'post',
            url: '/api/fboard/D1/photo/upload',
            data: uploadPhoto,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            // setFbPhoto(res.data);
            // // 추가: 업로드가 완료되면 fbPhoto 상태를 dto에 설정
            // const dto = {
            //     fb_subject: fbSubject,
            //     fb_photo: res.data.join(","), // 여러장의 사진 URL을 쉼표로 구분하여 문자열로 설정
            //     fb_content: fbContent,
            //     m_idx: de.idx
            // };
        }).catch(error=>{
            //axios용 에러함수
           jwtHandleError(error,toastAlert);
        });
    }

    return (
        <div>
            <form className="fboard-form" onSubmit={onSubmitEvent}>
                <div className="advertise-box">
                    <div className="advertise-main"/>
                    <b className="advertise-text">광고</b>
                </div>
                <div className="fboard-name">
                    <div className="board-name-box"/>
                    <div className="fboard-name-text">
                        <div className="fboard-name-text-type">자유게시판</div>
                        <div className="fboard-name-text-detail">
                            다양한 주제의 자유로운 대화를 나누는 게시판
                        </div>
                    </div>
                </div>
                <div className="fboard-form-subject">
                    <input type="text" className="fboard-form-subject-rec" placeholder="제목을 입력해주세요."
                           required
                           onChange={(e) => setFbSubject(e.target.value)} value={fbSubject}/>

                </div>
                <div className="fboard-form-content">
        <textarea className="fboard-form-content-rec"
                  placeholder="내용을 입력해주세요."
                  required value={fbContent}
                  onChange={(e) => setFbContent(e.target.value)}
        ></textarea>
                </div>

                <div className="fboard-form-fileupload">
                    <input type="file" className="fboard-form-subject-rec"
                           placeholder="첨부 사진을 올려주세요."
                           onChange={onUploadEvent} multiple/>
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
                <button type='submit' className="fboard-form-btn">
                    <div className="fboard-form-btn-child"/>
                    <div className="fboard-form-btn-text">게시글등록</div>
                    <img
                        className="fboard-form-btn-icon"
                        alt=""
                        src={require("./assets/qboard_form_btn_icon.svg").default}
                    />
                </button>
                <div className="moblie"/>
            </form>
            {/*<img alt='' src={`${photoUrl}${photo}`}/>*/}
        </div>
    );
}
;

export default FboardForm;
