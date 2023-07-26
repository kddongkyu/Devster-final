import "./style/AboardForm.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";
const AboardForm = () => {

    const [abSubject,setAbSubject]=useState('');
    const [abContent,setAbContent]=useState('');
    const [photoLength,setPhotolength]=useState('');
    //const [selectedPhotos,setSelectedPhotos]=useState('');
    const navi=useNavigate();


    let de = jwt_decode(localStorage.getItem('accessToken'));
    console.log(de.idx);

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
            .catch(errer =>{
                console.error("aboarderrer"+errer);
            });
    }


    const onUploadEvent=(e)=>{
        const uploadPhoto=new FormData();
        setPhotolength(e.target.files.length);

        for(let i=0;i<e.target.files.length; i++){
            uploadPhoto.append("upload",e.target.files[i]);
        }

        axiosIns({
            method:'post',
            url:'/api/academyboard/D1/photo/upload',
            data:uploadPhoto,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
           // setAbphoto(res.data);
        });
    }



  return (
      <form className="aboard-form" onSubmit={onSubmitEvnet}>
          <div className="advertise-box">
              <div className="advertise-main" />
              <b className="advertise-text">광고</b>
          </div>
          <div className="moblie" />
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
          <div className="aboard-form-fileupload">
              <input className="aboard-form-subject-rec"
                     type="file"
                     placeholder="첨부 사진을 올려주세요"
                     multiple
                     onChange={onUploadEvent}
              />
              <img
                  className="aboard-form-fileupload-icon"
                  alt=""
                  src={require("./assets/qboard_form_fileupload_icon.svg").default}
              />
              <div className="aboard-form-fileupload-cnt-tex">
                  &nbsp;&nbsp;사진 {photoLength}장이 등록되었습니다.
              </div>
          </div>
          <button type="submit" className="aboard-form-btn">
              <div className="aboard-form-btn-child" />
              <div className="aboard-form-btn-text">게시글등록</div>
              <img
                  className="aboard-form-btn-icon"
                  alt=""
                  src={require("./assets/qboard_form_btn_icon.svg").default}
              />
          </button>
          {/* 사진 미리보기*/}
          <div className="aboard-form-photo-list">
              {/*{selectedPhotos.map((photo, index) => (*/}
              {/*    <img*/}
              {/*        key={index}*/}
              {/*        src={URL.createObjectURL(photo)}*/}
              {/*        alt={`미리보기 ${index + 1}`}*/}
              {/*        className={`fboard-form-photo${index + 1}`}*/}
              {/*    />*/}
              {/*))}*/}

              <div className="aboard-form-photo1" />
              <div className="aboard-form-photo2" />
              <div className="aboard-form-photo3" />
              <div className="aboard-form-photo4" />
              <div className="aboard-form-photo5" />
              <div className="aboard-form-photo6" />
              <div className="aboard-form-photo7" />
              <div className="aboard-form-photo8" />
              <div className="aboard-form-photo9" />
              <div className="aboard-form-photo10" />
          </div>
      </form>
  );
};

export default AboardForm;
