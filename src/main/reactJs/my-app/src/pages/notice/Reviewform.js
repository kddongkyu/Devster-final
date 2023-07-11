import React from 'react';
import './style/Reviewform.css';
function Reviewform(props) {
    return (
        <div className="notice-form">
            <div className="advertise-box">
                <div className="advertise-main" />
                <b className="advertise-text">광고</b>
            </div>
            <div className="notice-name">
                <div className="notice-name-box" />
                <div className="notice-name-text">
                    <div className="notice-name-text-type">공지게시판</div>
                    <div className="notice-name-text-detail">Devster 공지사항</div>
                </div>
            </div>
            <div className="notice-form-subject">
                <input className="notice-form-subject-rec" placeholder="제목을 입력해주세요"/>

            </div>
            <div className="notice-form-content" >
                <textarea className="notice-form-content-rec" placeholder="내용을 입력해주세요"/>
            </div>
            <div className="notice-form-fileupload">
                <div className="notice-form-subject-rec" />
                <div className="notice-form-fileupload-placeho">
                    첨부 사진을 올려주세요.
                </div>
                <img
                    className="notice-form-fileupload-icon"
                    alt=""
                    src={require('./assets/notice_form_fileupload_icon.svg').default}s
                />
                <div className="notice-form-fileupload-cnt-tex">
                    사진 3장이 등록되었습니다.
                </div>
            </div>
            <div className="notice-form-btn">
                <button className="notice-form-btn-child">
                    <div className="notice-form-btn-text">게시글등록</div>
                    <img
                        className="notice-form-btn-icon"
                        alt=""
                        src={require('./assets/notice_form_btn_icon.svg').default}
                    />
                </button>
            </div>
            <div className="moblie" />
        </div>
    );
}

export default Reviewform;