import "./style/HboardForm.css";
const HboardForm = () => {
  return (
    <div className="hboard-form">
      <div className="advertise-box">
        <div className="advertise-main" />
        <b className="advertise-text">광고</b>
      </div>
      <div className="moblie" />
      <div className="hboard-name">
        <div className="hboard-name-box" />
        <div className="hboard-name-text">
          <b className="hboard-name-text-type">채용정보 게시판</b>
          <div className="hboard-name-text-detail">
            다양한 기업들의 공고를 확인할 수 있는 게시판
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
    </div>
  );
};

export default HboardForm;
