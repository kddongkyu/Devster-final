import React, { useEffect, useState } from "react";
import "./style/MyResume.css";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";

function MyResume(props) {
  const [resume, setResume] = useState(null);

  const [member, setMember] = useState({
    m_name: "정우영우영우기러기토마토별똥별우영우",
    m_email: "",
    m_nickname: "",
    ai_name: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const photoUrl =
    "https://kr.object.ncloudstorage.com/bit701.bucket.102/devster/member/";
  const imageUrl = `${photoUrl}${previewImage}`;
  const decodedToken = jwt_decode(localStorage.jwtToken);
  const m_idx = decodedToken.m_idx;

  // Functions
  const getMemberData = async (idx) => {
    try {
      const response = await Axios.get(`/member/${idx}`);
      setMember(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMemberData(decodedToken.m_idx);
  }, []);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await Axios.get(`/resume/${m_idx}`);
        setResume(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch resume: ", error);
      }
    };

    fetchResume();
  }, []);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userInfoResponse = await Axios.get(`/member/${m_idx}`);
        setPreviewImage(userInfoResponse.data.m_photo);
      } catch (error) {
        console.error("Failed to fetch profile image: ", error);
      }
    };
    fetchProfileImage();
  }, [m_idx]);

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
                <img alt="" src={imageUrl} />
              </div>
            </div>

            <div className="resume_info_box_01">
              <div className="resume_info_box_title">희망직무</div>
              <span className="resume_info_box_content">웹개발자</span>
            </div>
            <div className="resume_info_box_02">테스트</div>
            <div className="resume_info_box_03">테스트</div>
            <div className="resume_info_box_04">테스트</div>
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
            </NavLink>
          </div>
        )}

        <div className="text-add-newresume"></div>
      </div>
    </div>
  );
}

export default MyResume;
