import "./style/FboardForm.css";
const FboardForm = () => {
  return (
    <div className="fboard-form">
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
        <input type="text" className="qboard-form-subject-rec" placeholder="제목을 입력해주세요."/>
       
      </div>
      <div className="qboard-form-content">
        <textarea className="qboard-form-content-rec" placeholder="내용을 입력해주세요."></textarea>
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
      <div className="moblie" />
    </div>
  );
};

export default FboardForm;
