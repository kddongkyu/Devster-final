import React, { useEffect, useState } from "react";
import "./style/MyResume.css";
import { NavLink } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";
import MyResumeTranslate from "./MyResumeTranslate";
import defaultProfileImage from './assets/logo_profile.svg';


function MyResume(props) {
  const decodedToken = checkToken();
  const m_idx = decodedToken.idx;
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const [resume, setResume] = useState();

  const [member, setMember] = useState({
    m_name: "",
    m_email: "",
    m_nickname: "",
    ai_name: "",
  });

  const photoUrl = process.env.REACT_APP_MEMBERURL;
  const imageUrl = (member.m_photo === null || member.m_photo === undefined || member.m_photo === '')?defaultProfileImage:`${photoUrl}${member.m_photo}`;
  const FileUrl = process.env.REACT_APP_RESUMEFILEURL;
  const REFileUrl = process.env.REACT_APP_RESUMEREFILEURL;

  const [isLoadingMemberData, setIsLoadingMemberData] = useState(true);

  const [isTransOpen, setIsTransOpen] = useState(false);
  const openTransModal = () => {
    setIsTransOpen(true);
  }

  // Functions
  const getMemberData = async (idx) => {
    try {
      setIsLoadingMemberData(true); // 데이터를 불러오기 시작하면 로딩 상태를 true로 설정
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
      //console.log("사진: " + response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    } finally {
      setIsLoadingMemberData(false); // 데이터를 모두 불러왔으면 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    getMemberData(decodedToken.idx);
  }, []);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axiosIns.get(`/api/resume/D1/${m_idx}`);
        if (!response || !response.data) {
          //console.log(response.data);
          console.error("No response or data received from the server.");
          setResume(null); // Or however you want to handle this error in your UI
        } else {
          setResume(response.data);
          //console.log(response.data);
        }
      } catch (e) {
        jwtHandleError(e, toastAlert);
        setResume(null); // Or however you want to handle this error in your UI
      }
    };

    fetchResume();
  }, []);

  const deleteResume = async () => {
    const url = `/api/resume/D1`;

    try {
      const response = await axiosIns.delete(url);
      console.log("Resume successfully deleted.");
      setResume(null); // 삭제한 후 UI를 업데이트합니다.
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  return (
    <div
      className="resume-none"
      // style={{ height: resume && resume.resumeDto ? "192rem" : "75rem" }}
    >
      <div className="content-resume">
        <b className="text-content-resume">내 이력서</b>

        {resume && resume.resumeDto ? (
          <div className="resume-box">
            <div className="member_info_box">
              <div className="member_info_box_util">
                <div className="member_info_box_username">{member.m_name}</div>
                <div className="member_info_box_email_box">
                  <img
                    className="icon-email"
                    alt=""
                    src={require("./assets/icon_mail.svg").default}
                  />
                  <div className="member_info_box_email">{member.m_email}</div>
                </div>
                <div className="member_info_box_hp_box">
                  <img
                    className="icon-hp"
                    alt=""
                    src={require("./assets/icon_phone.svg").default}
                  />
                  <div className="member_info_box_hp">01034689412</div>
                </div>
              </div>
              <div className="member_info_box_userphoto">
                {!isLoadingMemberData && <img alt="" src={imageUrl} />}
              </div>
            </div>

            <div className="resume_info_box_01">
              <div className="resume_info_box_title">희망직무</div>
              <span className="resume_info_box_content">
                {resume.resumeDto.r_pos}
              </span>
            </div>
            <div className="resume_info_box_02">
              <div className="resume_info_box_title">
                기술스택<span>(업무 툴 / 스킬)</span>
              </div>
              {resume.resumeDto.r_skill.split(",").map((item, index) => (
                <div
                  key={index}
                  className="resume_info_box_content"
                  style={{ display: "inline-block", marginRight: "0.3rem" }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="resume_info_box_03">
              <div className="resume_info_box_title">
                링크 업로드<span>(웹페이지 및 블로그)</span>
              </div>
              <a
                href={resume.resumeDto.r_link}
                className="resume_info_box_content"
              >
                <img
                  alt=""
                  src={require("./assets/icon_link.svg").default}
                  style={{ width: "2rem", marginTop: "-.25rem" }}
                />
                &nbsp;
                <span>{resume.resumeDto.r_link}</span>
              </a>
            </div>
            <div className="resume_info_box_04">
              <div className="resume_info_box_title">학력</div>
              <div className="resume_info_box_content">
                {resume.resumeDto.r_gradecom}
                <div>
                  <span
                    style={{
                      color: "#626567",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    {new Date(resume.resumeDto.r_gradestart)
                      .toISOString()
                      .split("T")[0]
                      .slice(0, 7)
                      .replace("-", ".")}
                  </span>
                  <span
                    style={{
                      color: "#626567",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    {" "}
                    ~{" "}
                  </span>
                  <span
                    style={{
                      color: "#626567",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    {new Date(resume.resumeDto.r_gradeend)
                      .toISOString()
                      .split("T")[0]
                      .slice(0, 7)
                      .replace("-", ".")}
                  </span>
                  &nbsp;
                  <span
                    style={{
                      color: "#626567",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    {resume.resumeDto.r_sta}
                  </span>
                </div>
              </div>
            </div>
            <div className="resume_info_box_05">
              <div className="resume_info_box_title">경력</div>

              {resume.resumeCareerDtoList &&
                resume.resumeCareerDtoList.map((item, idx) => (
                  <div
                    key={idx}
                    className="resume_info_box_content"
                    style={{
                      marginRight: "0.5rem",
                    }}
                  >
                    {item.r_company}
                    <div>
                      <span
                        style={{
                          color: "#626567",
                          fontSize: "1.2rem",
                          fontWeight: "500",
                        }}
                      >
                        {new Date(item.r_carstartdate)
                          .toISOString()
                          .split("T")[0]
                          .slice(0, 7)
                          .replace("-", ".")}
                      </span>
                      <span
                        style={{
                          color: "#626567",
                          fontSize: "1.2rem",
                          fontWeight: "500",
                        }}
                      >
                        ~
                      </span>
                      <span
                        style={{
                          color: "#626567",
                          fontSize: "1.2rem",
                          fontWeight: "500",
                        }}
                      >
                        {new Date(item.r_carenddate)
                          .toISOString()
                          .split("T")[0]
                          .slice(0, 7)
                          .replace("-", ".")}
                      </span>
                      &nbsp;
                      <span
                        style={{
                          color: "#626567",
                          fontSize: "1.2rem",
                          fontWeight: "500",
                        }}
                      >
                        {item.r_department}&nbsp;
                        {item.r_position}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="resume_info_box_06">
              <div className="resume_info_box_title">자격증</div>

              {resume.resumeLicenseDtoList &&
                resume.resumeLicenseDtoList.map((item, idx) => (
                  <div
                    key={idx}
                    className="resume_info_box_content"
                    style={{
                      marginRight: "0.5rem",
                    }}
                  >
                    {item.r_licname}
                    <div>
                      <span
                        style={{
                          color: "#626567",
                          fontSize: "1.2rem",
                          fontWeight: "500",
                        }}
                      >
                        {new Date(item.r_licdate)
                          .toISOString()
                          .split("T")[0]
                          .slice(0, 7)
                          .replace("-", ".")}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="resume_info_box_07">
              <div className="resume_info_box_title2">간단 자기소개</div>

              <img className="translate-btn"
                  alt=""
                  src={require("./assets/translate_btn.svg").default}
                   onClick={openTransModal}
              />

              <div className="resume_info_box_content">
                {resume.resumeDto.r_self}
              </div>

              <MyResumeTranslate isTransOpen={isTransOpen}
                                 setIsTransOpen={setIsTransOpen}
                                 transConent = {resume.resumeDto.r_self}/>
            </div>
            {resume && resume.resumeDto && resume.resumeDto.r_file && (
              <div className="resume_info_box_08">
                <div className="resume_info_box_title">
                  첨부파일&nbsp;
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      color: "#626567",
                    }}
                  >
                    (포트폴리오 / 경력기술서 등을 첨부)
                  </span>
                </div>
                <span className="resume_info_box_content">
                  <a
                    href={`${FileUrl}${resume.resumeDto.r_file}`}
                    download={`${member.m_name} 첨부파일.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt=""
                      src={require("./assets/icon_file-attach.svg").default}
                      style={{ width: "2rem", marginTop: "-.25rem" }}
                    />
                    &nbsp;첨부파일 열기
                  </a>
                </span>
              </div>
            )}
            {resume && resume.resumeDto && resume.resumeDto.r_reffile && (
              <div className="resume_info_box_09">
                <div className="resume_info_box_title">
                  이력서 파일&nbsp;
                  <span
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      color: "#626567",
                    }}
                  >
                    (이력서를 파일로 첨부)
                  </span>
                </div>
                <span className="resume_info_box_content">
                  <a
                    href={`${REFileUrl}${resume.resumeDto.r_reffile}`}
                    download={`${member.m_name} 이력서.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt=""
                      src={require("./assets/icon_file-attach.svg").default}
                      style={{ width: "2rem", marginTop: "-.25rem" }}
                    />
                    &nbsp;이력서 파일 열기
                  </a>
                </span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                justifyContent: "center",
                width: "100%",
                marginTop: "2rem",
              }}
            >
              <NavLink to={"/updateresume"} style={{ width: "100%" }}>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    background: "#721EA6",
                    // border: "0",
                    padding: "1rem 0 1rem 0",
                    color: "#fff  ",
                    borderRadius: ".5rem",
                    border: "2px solid #721EA6",
                  }}
                >
                  수정
                </button>
              </NavLink>
              <button
                type="button"
                onClick={deleteResume}
                style={{
                  width: "100%",
                  background: "#fff",
                  // border: "0",
                  padding: "1rem 0 1rem 0",
                  color: "#000  ",
                  borderRadius: ".5rem",
                  border: "2px solid #ccc",
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="resume-add-box" />
            <NavLink to={"/myresume/form"}>
              <img
                className="resume-add-button-icon"
                alt=""
                src={require("./assets/resume-add-button.svg").default}
              />
              <div className="text-add-newresume">이력서를 추가해 보세요!</div>
            </NavLink>
          </div>
        )}

        <div className="text-add-newresume"></div>
      </div>
      <div style={{ marginTop: "4.4rem" }}>
        <img
          alt=""
          src={require("./assets/ad_resume.png")}
          style={{ width: "100%" }}
        />
      </div>

    </div>
  );
}

export default MyResume;
