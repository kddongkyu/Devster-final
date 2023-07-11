import "./style/AboardForm.css";
const AboardForm = () => {
  return (
    <div className="aboard-form">
      <div className="advertise-box">
        <div className="advertise-main" />
        <b className="advertise-text">광고</b>
      </div>
      <div className="moblie" />
      <div className="aboard-name">
        <div className="aboard-name-box" />
        <div className="aboard-name-text">
          <b className="board-name-text-type">학원별 게시판</b>
          <div className="board-name-text-detail">
            인증이 완료된 사용자만 열람할 수 있는 게시판입니다.
          </div>
        </div>
      </div>
      <div className="qboard-form-subject">
        <div className="qboard-form-subject-rec" />
        <div className="div">제목을 입력해주세요.</div>
      </div>
      <div className="qboard-form-content">
        <div className="qboard-form-content-rec" />
        <div className="qboard-form-content-text">내용을 입력해주세요.</div>
      </div>
      <div className="qboard-form-fileupload">
        <div className="qboard-form-subject-rec" />
        <div className="qboard-form-fileupload-placeho">
          첨부 사진을 올려주세요.
        </div>
        <img
          className="qboard-form-fileupload-icon"
          alt=""
          src={require("./assets/qboard_form_fileupload_icon.svg").default}
        />
        <div className="qboard-form-fileupload-cnt-tex">
          사진 3장이 등록되었습니다.
        </div>
      </div>
      <div className="qboard-form-btn">
        <div className="qboard-form-btn-child" />
        <div className="qboard-form-btn-text">게시글등록</div>
        <img
          className="qboard-form-btn-icon"
          alt=""
          src={require("./assets/qboard_form_btn_icon.svg").default}
        />
      </div>
      <div className="qboard-form-btn1">
        <div className="qboard-form-btn-child" />
        <div className="qboard-form-btn-text">게시글등록</div>
        <img
          className="qboard-form-btn-icon"
          alt=""
          src="/qboard-form-btn-icon1.svg"
        />
      </div>
    </div>
  );
};

export default AboardForm;
