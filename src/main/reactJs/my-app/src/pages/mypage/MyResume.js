import React, { useEffect, useState } from "react";
import "./style/MyResume.css";
import { NavLink } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";

function MyResume(props) {
  const [resume, setResume] = useState(null);

  const [member, setMember] = useState({
    m_name: "",
    m_email: "",
    m_nickname: "",
    ai_name: "",
  });

  const decodedToken = jwt_decode(localStorage.accessToken);
  const photoUrl = process.env.REACT_APP_MEMBERURL;
  const imageUrl = `${photoUrl}${member.m_photo}`;
  const m_idx = decodedToken.idx;

  //console.log(m_idx);

  const [isLoadingMemberData, setIsLoadingMemberData] = useState(true); // 초기값은 true

  // Functions
  const getMemberData = async (idx) => {
    try {
      setIsLoadingMemberData(true); // 데이터를 불러오기 시작하면 로딩 상태를 true로 설정
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
      //console.log("사진: " + response.data);
    } catch (e) {
      console.log(e);
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
      } catch (error) {
        console.error("Failed to fetch resume: ", error.message);
        setResume(null); // Or however you want to handle this error in your UI
      }
    };

    fetchResume();
  }, []);

  const deleteResume = async () => {
    const url = `/api/resume/D1/${m_idx}`;

    try {
      const response = await axiosIns.delete(url);
      console.log("Resume successfully deleted.");
      setResume(null); // 삭제한 후 UI를 업데이트합니다.
    } catch (error) {
      console.log(
        "There was a problem with the delete operation: " + error.message
      );
    }
  };

  return (
    <div className="resume-none">
      <div className="content-resume">
        <b className="text-content-resume">내 이력서</b>

        {resume ? (
          <div className="resume-box">
            <div className="member_info_box">
              <div className="member_info_box_util">
                <div className="member_info_box_username">{member.m_name}</div>
                <div className="member_info_box_email_box">
                  <img
                    className="icon-email"
                    alt=""
                    src={require("./assets/user-cicrle-light.svg").default}
                  />
                  <div className="member_info_box_email">{member.m_email}</div>
                </div>
                <div className="member_info_box_hp_box">
                  <img
                    className="icon-hp"
                    alt=""
                    src={require("./assets/user-cicrle-light.svg").default}
                  />
                  <div className="member_info_box_hp">01055554444</div>
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
                  style={{ display: "inline-block", marginRight: "0.5rem" }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="resume_info_box_03">
              <div className="resume_info_box_title">
                링크 업로드<span>(웹페이지 및 블로그)</span>
              </div>
              <span className="resume_info_box_content">
                {resume.resumeDto.r_link}
              </span>
            </div>
            <div className="resume_info_box_04">
              <div className="resume_info_box_title">학력</div>
              <span className="resume_info_box_content">
                {resume.resumeDto.r_gradecom}
              </span>
            </div>
            <div className="resume_info_box_05">
              <div className="resume_info_box_title">경력</div>

              {resume.resumeCareerDtoList &&
                resume.resumeCareerDtoList.map((item, idx) => (
                  <span
                    key={idx}
                    className="resume_info_box_content"
                    style={{
                      marginRight: "0.5rem",
                      display: idx >= 2 ? "inline-block" : "inline", // 조건 추가
                    }}
                  >
                    {item.r_company}
                  </span>
                ))}
            </div>
            <div className="resume_info_box_06">
              <div className="resume_info_box_title">자격증</div>

              {resume.resumeLicenseDtoList &&
                resume.resumeLicenseDtoList.map((item, idx) => (
                  <span
                    key={idx}
                    className="resume_info_box_content"
                    style={{
                      marginRight: "0.5rem",
                      display: idx >= 2 ? "inline-block" : "inline", // 조건 추가
                    }}
                  >
                    {item.r_licname}
                  </span>
                ))}
            </div>
            <div className="resume_info_box_07">
              <div className="resume_info_box_title">간단 자기소개</div>
              <span className="resume_info_box_content">
                {resume.resumeDto.r_self}
              </span>
            </div>
            <div className="resume_info_box_08">
              <div className="resume_info_box_title">첨부파일 업로드</div>
              <span className="resume_info_box_content">
                {resume.resumeDto.r_file}
                {/* <br />
                {resume.resumeDto.r_reffile} */}
              </span>
            </div>
            <button type="button" onClick={deleteResume}>
              삭제
            </button>
            <NavLink to={"/updateresume"}>
              <button type="button">수정</button>
            </NavLink>
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
    </div>
  );
}

export default MyResume;
