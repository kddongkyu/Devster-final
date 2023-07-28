import "./style/AboardForm.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {jwtHandleError} from "../../api/JwtHandleError";
import {checkToken} from "../../api/checkToken";

function AboardForm(props) {
    const [abSubject,setAbSubject]=useState('');
    const [abContent,setAbContent]=useState('');
    const [photoLength,setPhotoLength]=useState(0);
    const navi = useNavigate();
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //에러 호출용 변수
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    //디코딩 함수
    const de = checkToken();

    const onSubmitEvnet=(e)=>{
        e.preventDefault();

        const dto = {
            ab_subject : abSubject,
            ab_content : abContent,
            m_idx:de.idx
        };

        axiosIns.post("/api/academyboard/D1",dto)
            .then(res =>{
                navi("/aboard");
            })
            .catch(error =>{
                jwtHandleError(error, toastAlert);
            });
    }


    const onUploadEvent=(e)=>{
        setIsLoading(true);
        const uploadPhoto=new FormData();
        const files = e.target.files;
        const maxAllowedFiles = 10;

        // 10장이내인지 확인
        if (files.length > maxAllowedFiles) {
            // Handle the error or inform the user that only 10 files are allowed
            toastAlert("사진은 최대 10장까지만 업로드 가능합니다.", "warning");
            e.target.value = null;
            setIsLoading(false);
            return;
        }

        setPhotoLength(files.length);
        const newPhotos = Array.from(files);
        setSelectedPhotos([...newPhotos]);

        for(let i=0;i<files.length; i++){
            uploadPhoto.append("upload",files[i]);
        }

        axiosIns({
            method:'post',
            url:'/api/academyboard/D1/photo/upload',
            data:uploadPhoto,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            setIsLoading(false);
        }).catch(error => {
            //axios용 에러함수
            jwtHandleError(error, toastAlert);
        });
    }



    return (
        <div>
            <form className="aboard-form" onSubmit={onSubmitEvnet}>
                <div className="advertise-box">
                    <div className="advertise-main" />
                    <b className="advertise-text">광고</b>
                </div>

                <div className="aboard-name">
                    <div className="aboard-name-box" />
                    <div className="aboard-name-text">
                        <b className="aboard-name-text-type">학원별 게시판</b>
                        <div className="aboard-name-text-detail">
                            학원 인증이 완료된 학생만 열람할 수 있는 게시판입니다.
                        </div>
                    </div>
                </div>

                <div className="aboard-form-subject">
                    <input className="aboard-form-subject-rec"
                           type="text"
                           placeholder="제목을 입력해주세요."
                           required
                           onChange={(e)=>setAbSubject(e.target.value)}
                           value={abSubject}
                    />

                </div>
                <div className="aboard-form-content">
              <textarea className="aboard-form-content-rec"
                        placeholder="내용을 입력해주세요."
                        required value={abContent}
                        onChange={(e)=>setAbContent(e.target.value)}>
              </textarea>
                </div>

                <div className="aboard-form-photo-list">
                    {selectedPhotos.map((photo, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(photo)}
                            alt={`미리보기 ${index + 1}`}
                            className={`aboard-form-photo${index + 1}`}
                        />
                    ))}
                </div>
                <div className="aboard-form-fileupload">
                    <input className="aboard-form-subject-rec"
                           type="file"
                           placeholder="첨부 사진을 올려주세요"
                           multiple
                           onChange={onUploadEvent}
                    />
                    <div className="aboard-form-fileupload-cnt-tex">
                        <img
                            className="aboard-form-fileupload-icon"
                            alt=""
                            src={require("./assets/qboard_form_fileupload_icon.svg").default}
                        />
                        &nbsp;&nbsp;사진 {photoLength}장이 등록되었습니다.
                    </div>
                </div>

                <button type="submit" className="aboard-form-btn"
                        disabled={isLoading}>
                    <div className={isLoading ? "aboard-form-btn-child_loading" : "aboard-form-btn-child"} />
                    <div className="aboard-form-btn-text">
                        {isLoading ? "로딩중..." : "게시글등록"}
                    </div>
                    <img
                        className="aboard-form-btn-icon"
                        alt=""
                        src={require("./assets/qboard_form_btn_icon.svg").default}
                    />
                </button>
            </form>
        </div>
    );
};

export default AboardForm;
