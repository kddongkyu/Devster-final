import React, { useEffect, useState } from "react";
import "./style/MyResume.css";
import { NavLink } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";

function MyResume(props) {
  const [resume, setResume] = useState(null);
  const [resumeLic, setResumeLic] = useState(null);
  const [resumeCar, setResumeCar] = useState(null);

  const [member, setMember] = useState({
    m_name: "",
    m_email: "",
    m_nickname: "",
    ai_name: "",
  });

  //console.log(member);

  const [isLoadingMemberData, setIsLoadingMemberData] = useState(true); // 초기값은 true
  // const [previewImage, setPreviewImage] = useState("noimage.png");
  const photoUrl = process.env.REACT_APP_MEMBERURL;
  const imageUrl = `${photoUrl}${member.m_photo}`;
  const decodedToken = jwt_decode(localStorage.accessToken);
  const m_idx = decodedToken.idx;

  // Functions
  const getMemberData = async (idx) => {
    try {
      setIsLoadingMemberData(true); // 데이터를 불러오기 시작하면 로딩 상태를 true로 설정
      const response = await axiosIns.get(`/member/${idx}`);
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
        const response = await axiosIns.get(`/resume/${m_idx}`);
        setResume(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch resume: ", error);
      }
    };

    fetchResume();
  }, []);

  useEffect(() => {
    const fetchResumeLic = async () => {
      try {
        const response = await axiosIns.get(`/resumelic/${m_idx}`);
        setResumeLic(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch resumelic: ", error);
      }
    };

    fetchResumeLic();
  }, []);

  useEffect(() => {
    const fetchResumeCar = async () => {
      try {
        const response = await axiosIns.get(`/resumecar/${m_idx}`);
        setResumeCar(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch resumecar: ", error);
      }
    };

    fetchResumeCar();
  }, []);

  // useEffect(() => {
  //   const fetchProfileImage = async () => {
  //     try {
  //       const userInfoResponse = await axiosIns.get(`/member/${m_idx}`);
  //       if (userInfoResponse.data.m_photo) {
  //         // m_photo 값이 존재하는 경우에만 setPreviewImage를 호출
  //         setPreviewImage(userInfoResponse.data.m_photo);
  //       } else {
  //         console.log("No profile image for user:", m_idx);
  //         setPreviewImage("noimage.png"); // 기본 이미지 이름을 사용
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch profile image: ", error);
  //     }
  //   };
  //   fetchProfileImage();
  // }, [m_idx]);

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
              <span className="resume_info_box_content">{resume.r_pos}</span>
            </div>
            <div className="resume_info_box_02">
              <div className="resume_info_box_title">
                기술스택<span>(업무 툴 / 스킬)</span>
              </div>
              {resume.r_skill.split(",").map((item, index) => (
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
              <span className="resume_info_box_content">{resume.r_link}</span>
            </div>
            <div className="resume_info_box_04">
              <div className="resume_info_box_title">학력</div>
              <span className="resume_info_box_content">
                {resume.r_gradecom}
              </span>
            </div>
            <div className="resume_info_box_05">
              <div className="resume_info_box_title">경력</div>

              {resumeCar &&
                resumeCar.map((item, idx) => (
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

              {resumeLic &&
                resumeLic.map((item, idx) => (
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
              <span className="resume_info_box_content">{resume.r_self}</span>
            </div>
            <div className="resume_info_box_08">
              <div className="resume_info_box_title">첨부파일 업로드</div>
              <span className="resume_info_box_content"></span>
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
              <div className="text-add-newresume">이력서 추가 플리즈</div>
            </NavLink>
          </div>
        )}

        <div className="text-add-newresume"></div>
      </div>
    </div>
  );
}

export default MyResume;
