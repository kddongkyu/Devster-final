import "./style/QboardForm.css";
const QboardForm = () => {
  return (
    <div className="qboard-form">
      <div className="advertise-box">
        <div className="advertise-main" />
        <b className="advertise-text">광고</b>
      </div>
      <div className="qboard-form-header">
        <div className="qboard-form-header-rec" />
        <b className="qboard-form-header-name">{`Q&A`}</b>
        <div className="qboard-form-header-detail">질문 및 답변 게시판</div>
      </div>
      <div className="qboard-form-content">
        <div className="qboard-form-content-rec" />
        <div className="qboard-form-content-text">
          질문 내용을 입력해주세요.
        </div>
      </div>
      <div className="qboard-form-content">
        <div className="qboard-form-content-rec" />
        <div className="qboard-form-content-text">
          질문 내용을 입력해주세요.
        </div>
      </div>
      <div className="qboard-form-subject">
        <div className="qboard-form-subject-rec" />
        <div className="div">제목을 입력해주세요.</div>
      </div>
      <div className="qboard-form-subject">
        <div className="qboard-form-subject-rec" />
        <div className="div">제목을 입력해주세요.</div>
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
        <div className="qboard-form-btn-text">질문등록</div>
        <img
          className="qboard-form-btn-icon"
          alt=""
          src="/qboard-form-btn-icon.svg"
        />
      </div>
      <div className="qboard-form-btn">
        <div className="qboard-form-btn-child" />
        <div className="qboard-form-btn-text">질문등록</div>
        <img
          className="qboard-form-btn-icon"
          alt=""
          src={require("./assets/qboard_form_btn_icon.svg").default}
        />
      </div>
      <div className="moblie" />
    </div>
  );
};

export default QboardForm;
