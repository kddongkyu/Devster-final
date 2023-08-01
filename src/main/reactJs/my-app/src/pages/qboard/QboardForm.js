import "./style/QboardForm.css";
import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {checkToken} from "../../api/checkToken";
import axiosIns from "../../api/JwtConfig";
import {jwtHandleError} from "../../api/JwtHandleError";
const QboardForm = (props) => {
    const [qbSubject, setQbSubject] = useState('');
    const [qbContent, setQbContent] = useState('');
    const [photoLength, setPhotoLength] = useState(0);
    const navi = useNavigate();
    const [newSelectedPhotos, setNewSelectedPhotos] = useState([]);
    const [arrayFromString, setArrayFromString] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedImageIds, setUploadedImageIds] = useState([]);
    const [isUpdate,setIsUpdate] = useState(false);

    const { qb_idx, currentPage } = useParams();
    const photoUrl = process.env.REACT_APP_PHOTO + "qboard/";


    //에러 호출용 변수
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    //디코딩 함수
    const de = checkToken();

    const checkUpdate = () => {
        if(qb_idx != null) {
            setIsUpdate(true);
            axiosIns.get(`/api/qboard/D0/${qb_idx}`)
                .then(res => {
                    setQbSubject(res.data.qboardDto.qb_subject);
                    setQbContent(res.data.qboardDto.qb_content);
                    if (res.data.qboardDto.qb_photo != null) {
                        setUploadedImageIds(res.data.qboardDto.qb_photo.split(","));
                    }

                })
        }
    }

    const deleteImage = (index, imageId) => {
        axiosIns({
            method: "delete",
            url: `/api/qboard/D1/photo/${imageId}`,
        })
            .then(() => {
                // Remove the image ID from the uploadedImageIds array
                const newUploadedImageIds = [...uploadedImageIds];
                newUploadedImageIds.splice(index, 1);
                setUploadedImageIds(newUploadedImageIds);
            })
            .catch((error) => {
                console.error("Error deleting image:", error);
            });
    };

    useEffect(()=>{
        checkUpdate();
    },[])

    const onSubmitEvent = (e) => {
        if(isUpdate) {
            e.preventDefault();
            const dto = {
                qb_subject: qbSubject,
                qb_content: qbContent,
                qb_photo: uploadedImageIds.join(','),
                m_idx: de.idx
            };
            axiosIns.put(`/api/qboard/D1/${qb_idx}`, dto)
                .then(res => {
                    // 성공적으로 등록된 경우, 목록으로 이동
                    navi(`/qboard/detail/${qb_idx}/${currentPage}`);
                })
                .catch(error => {
                    // 등록 실패 시 에러 처리
                    jwtHandleError(error, toastAlert);
                });
        } else {
            e.preventDefault();
            const dto = {
                qb_subject: qbSubject,
                qb_content: qbContent,
                qb_photo: uploadedImageIds.join(','),
                m_idx: de.idx
            };
            axiosIns.post("/api/qboard/D1", dto)
                .then(res => {
                    // 성공적으로 등록된 경우, 목록으로 이동
                    navi(`/qboard`);
                })
                .catch(error => {
                    // 등록 실패 시 에러 처리
                    jwtHandleError(error, toastAlert);
                });
        }
    }

    const uploadPhoto = (e) => {
        setIsLoading(true);
        const upload = new FormData();
        const maxAllowedFiles = 10;

        // 업데이트된 사진 10장이내인지 확인
        if (e.target.files.length + uploadedImageIds.length > maxAllowedFiles) {
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
            url: "/api/qboard/D1/photo/upload",
            data: upload,
            headers: {"Content-Type": "multipart/form-data"}
        })
            .then((res) => {
                // 서버로부터 반환받은 파일 이름을 uploadedImageIds 상태에 추가합니다.
                setUploadedImageIds([...uploadedImageIds, ...res.data.split(',')]);
                setIsLoading(false);
            });
    }


    return (
      <div>
    <form className="qboard-form" onSubmit={onSubmitEvent}>
      <div className="advertise-box">
        <div className="advertise-main" />
        <b className="advertise-text">광고</b>
      </div>
        <div className="qboard-name">
            <div className="board-name-box"/>
            <div className="qboard-name-text">
                <div className="qboard-name-text-type">Q&A게시판</div>
                <div className="qboard-name-text-detail">
                    궁금한점을 물어볼 수 있는 게시판
                </div>
            </div>
        </div>
      <div className="qboard-form-subject">
        <input type="text" className="qboard-form-subject-rec" placeholder="제목을 입력해주세요." required onChange={(e)=> setQbSubject(e.target.value)} value={qbSubject}/>
      </div>
      <div className="qboard-form-content">
        <textarea className="qboard-form-content-rec" placeholder="질문 내용을 입력해주세요."
        required onChange={(e)=> setQbContent(e.target.value)} value={qbContent}></textarea>
      </div>

        <div className="qboard-form-photo-list">
            {uploadedImageIds.map((imageId, index) => (
                <img
                    key={index}
                    src={`${photoUrl}${imageId}`}
                    alt={`Image ${index}`}
                    className={`qboard-form-photo${index + 1}`}
                    onClick={() => deleteImage(index, imageId)}
                />
            ))}
            <div className="qboard-form-photo-list_text">삭제하고싶은 사진을 클릭하세요.</div>
        </div>

        <div className="qboard-form-inputfileupload">
            <input type="file" className="qboard-form-subject-rec"
                   placeholder="첨부 사진을 올려주세요."
                   onChange={uploadPhoto} multiple/>
            <div className="qboard-form-fileupload-cnt-tex">
                <img
                    alt=""
                    src={require("./assets/qboard_form_fileupload_icon.svg").default}
                />
                &nbsp;&nbsp;사진 {arrayFromString.length + newSelectedPhotos.length}장이 등록되었습니다.
            </div>

        </div>
        <button type='submit' className="qboard-form-submitbtn" disabled={isLoading}>
            <div className={isLoading ? "qboard-form-submitbtn-child_loading" : "qboard-form-submitbtn-child"}/>
            <div className="qboard-form-submitbtn-text"> {isLoading ? "로딩중..." : "질문 등록"} </div>
            <img
                className="qboard-form-submitbtn-icon"
                alt=""
                src={require("./assets/qboard_form_btn_icon.svg").default}
            />
        </button>
      <div className="moblie" />
    </form>
      </div>
  );
};

export default QboardForm;
