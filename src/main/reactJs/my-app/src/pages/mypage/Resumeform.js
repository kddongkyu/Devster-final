import React from "react";
import "./style/Resumeform.css";

function Resumeform(props) {
  return (
    <div className="resumeform">
      <div className="resumeform-wrapper">
        <div className="resumeform-header">
          <b className="resumeform-header-name">장수현</b>
          <div className="resumeform-header-ck">
            <div className="resumeform-header-ck-text">이력서 공개여부</div>
            <img
              className="resumeform-header-ck-rec-icon"
              alt=""
              src={require("./assets/resumeform_header_ck_rec.svg").default}
            />
            <div className="resumeform-header-ck-ecl" />
          </div>
          <div className="resumeform-header-email">
            <img
              className="resumeform-header-email-icon"
              alt=""
              src={require("./assets/resumeform_header_email_icon.svg").default}
            />
            <div className="resumeform-header-email-text">
              ehowl3609@gmail.com
            </div>
          </div>
          <div className="resumeform-header-tel">
            <img
              className="resumeform-header-tel-icon"
              alt=""
              src={require("./assets/resumeform_header_tel_icon.svg").default}
            />
            <div className="resumeform-header-email-text">01036094771</div>
          </div>
        </div>
        <div className="resumeform-job">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">개발 직무</b>
            <img
              className="resumeform-job-line-01-icon"
              alt=""
              src="/resumeform-job-line-01.svg"
            />
          </div>
          <div className="resumeform-job-box">
            <div className="resumeform-job-box-rec" />
            <div className="resumeform-job-box-text">직무를 작성해주세요.</div>
          </div>
        </div>
        <div className="resumeform-skill">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">
              <span>{`기술 스택  `}</span>
              <span className="span">(업무 툴 / 스킬)</span>
            </b>
            <img
              className="resumeform-job-line-01-icon"
              alt=""
              src="/resumeform-skill-line-01.svg"
            />
          </div>
          <div className="resumeform-job-box">
            <div className="resumeform-job-box-rec" />
            <div className="resumeform-skill-box-text">
              사용가능한 언어 / 툴 / 스킬 (ex : JAVA, Spring)
            </div>
          </div>
        </div>
        <div className="resumeform-link">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">
              <span>{`링크 업로드  `}</span>
              <span className="span">(웹페이지 및 블로그)</span>
            </b>
            <img
              className="resumeform-job-line-01-icon"
              alt=""
              src="/resumeform-link-line-01.svg"
            />
          </div>
          <div className="resumeform-job-box">
            <div className="resumeform-job-box-rec" />
            <div className="resumeform-link-box-icon-text">
              {" "}
              http:// 또는 https:// 를 포함하여 작성해주세요.
            </div>
            <img
              className="resumeform-link-box-icon"
              alt=""
              src={require("./assets/resumeform_link_box_icon.svg").default}
            />
          </div>
        </div>
        <div className="resumeform-school">
          <div className="resumeform-school-title">
            <b className="resumeform-job-tiltle-text">
              <span>{`학력  `}</span>
              <span className="span">(최종학력)</span>
            </b>
            <img
              className="resumeform-job-line-01-icon"
              alt=""
              src="/resumeform-school-line-01.svg"
            />
          </div>
          <div className="resumeform-school-entrance">
            <div className="resumeform-school-entrance-rec" />
            <div className="resumeform-school-entrance-ico">
              입학 : 년-월-일
            </div>
            <img
              className="resumeform-school-entrance-ico-icon"
              alt=""
              src={
                require("./assets/resumeform_school_entrance_icon.svg").default
              }
            />
          </div>
          <div className="resumeform-school-graduation">
            <div className="resumeform-school-entrance-rec" />
            <div className="resumeform-school-graduation-i">
              졸업 : 년-월-일
            </div>
            <img
              className="resumeform-school-graduation-i-icon"
              alt=""
              src={
                require("./assets/resumeform_school_entrance_icon.svg").default
              }
            />
          </div>
          <div className="resumeform-school-inputname">
            <div className="resumeform-school-entrance-rec" />
          </div>
        </div>
        <div className="resumeform-career">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">경력</b>
            <img
              className="icon-add-circle-outline"
              alt=""
              src={require("./assets/icon _add_circle_outline.svg").default}
            />
            <img
              className="resumeform-job-line-01-icon"
              alt=""
              src="/resumeform-career-line-01.svg"
            />
          </div>
          <div className="resumeform-career-group-02">
            <div className="resumeform-career-group-02-gro">
              <div className="resumeform-school-entrance-rec" />
              <div className="resumeform-career-group-02-tex">년-월-일</div>
              <img
                className="icon-calendar-outline-02"
                alt=""
                src={require("./assets/icon_calendar_outline_02.svg").default}
              />
            </div>
            <div className="resumeform-career-group-02-gro2">
              <div className="resumeform-school-entrance-rec" />
              <div className="resumeform-career-group-02-tex1">년-월-일</div>
              <img
                className="resumeform-school-graduation-i-icon"
                alt=""
                src={require("./assets/icon_calendar_outline_01.svg").default}
              />
            </div>
            <div className="resumeform-career-group-02-gro4">
              <div className="resumeform-school-entrance-rec" />
              <div className="resumeform-career-group-02-tex2">회사명</div>
            </div>
            <div className="resumeform-career-group-02-gro6">
              <div className="resumeform-school-entrance-rec" />
              <div className="resumeform-career-group-02-tex2">{`부서 `}</div>
            </div>
            <div className="resumeform-career-group-02-gro8">
              <div className="resumeform-school-entrance-rec" />
              <div className="resumeform-career-group-02-tex4">{`직책 `}</div>
            </div>
          </div>
        </div>
        <div className="resumeform-certificate">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">자격증</b>
            <img
              className="resume-certificate-plusicon"
              alt=""
              src={require("./assets/resume_certificate_plusicon.svg").default}
            />
            <img
              className="resumeform-job-line-01-icon"
              alt=""
              src="/resumeform-certificate-line-01.svg"
            />
          </div>
          <div className="resumeform-certificate-box">
            <div className="resumeform-certificate-box-dat">
              <div className="resumeform-school-entrance-rec" />
              <div className="resumeform-certificate-box-dat2">년-월-일</div>
              <img
                className="resumeform-certificate-box-dat-icon"
                alt=""
                src={
                  require("./assets/resumeform_certificate_box_date_icon.svg")
                    .default
                }
              />
            </div>
            <div className="resumeform-certificate-box-inp" />
          </div>
        </div>
        <div className="resumeform-content">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">간단 자기소개</b>
            <img
              className="resumeform-job-line-01-icon"
              alt=""
              src="/resumeform-content-title-line-01.svg"
            />
          </div>
          <div className="resume-content-box">
            <div className="resume-content-box-input" />
            <div className="resume-content-box-text">
              <p className="p">{`간단한 자기소개를 통해 이력서를 돋보이게 만들어보세요. `}</p>
              <p className="p">(3~5줄 권장)</p>
            </div>
          </div>
        </div>
        <div className="resumeform-fileupload">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">
              <span>{`첨부파일 업로드  `}</span>
              <span className="span">(자격증 및 포트폴리오)</span>
            </b>
            <img
              className="resumeform-job-line-01-icon"
              alt=""
              src="/resumeform-fileupload-title-line-01.svg"
            />
          </div>
          <div className="resumeform-job-box">
            <div className="resumeform-job-box-rec" />
            <div className="resumeform-link-box-icon-text">
              {" "}
              PDF 파일로 올려주세요.
            </div>
            <img
              className="resumeform-fileupload-box-icon"
              alt=""
              src={
                require("./assets/resumeform_resumefileupload_box_icon.svg")
                  .default
              }
            />
          </div>
        </div>
        <div className="resumeform-resumefileupload">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">이력서 업로드</b>
            <img
              className="resumeform-job-line-01-icon"
              alt=""
              src="/resumeform-resumefileupload-line-01.svg"
            />
          </div>
          <div className="resumeform-job-box">
            <div className="resumeform-job-box-rec" />
            <img
              className="resumeform-fileupload-box-icon"
              alt=""
              src={
                require("./assets/resumeform_resumefileupload_box_icon.svg")
                  .default
              }
            />
            <div className="resumeform-link-box-icon-text">
              {" "}
              PDF 파일로 올려주세요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resumeform;
