import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./style/UserInfo.css";
import noimage from "./assets/noimage.png";

function UserInfo(props) {
  const [member, setMember] = useState({
    m_name: "",
    m_email: "",
    m_nickname: "",
    ai_name: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const decodedToken = jwt_decode(localStorage.jwtToken);
  const photoUrl =
    "https://kr.object.ncloudstorage.com/bit701.bucket.102/devster/member/";
  const imageUrl = `${photoUrl}${previewImage}`;
  const m_idx = decodedToken.m_idx;

  // 이미지 URL 결정
  // const imageUrl = member.m_photo
  //   ? `${photoUrl}${member.m_photo}`
  //   : noimage;

  // Functions
  const getMemberData = async (idx) => {
    try {
      const response = await Axios.get(`/member/${idx}`);
      setMember(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("upload", file);
    try {
      await Axios.post(`/member/photo/${m_idx}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const userInfoResponse = await Axios.get(`/member/${m_idx}`);
      setPreviewImage(userInfoResponse.data.m_photo);
    } catch (error) {
      console.error("Failed to upload image: ", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.put("/member", member);
      if (response.status === 200) {
        alert("수정되었습니다");
        navigate(`/userinfo`);
      } else {
        console.log("There was an issue updating the member");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Effects
  useEffect(() => {
    getMemberData(decodedToken.m_idx);
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

  const fileInputRef = useRef();

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="userinfo">
      <form className="userinfo-wrapper" onSubmit={onSubmit}>
        <b className="text-userinfo">회원정보</b>
        <div className="text-name">이름</div>
        <div className="userinfo-name">
          <input
            className="userinfo-name-box"
            type="text"
            disabled
            value={member.m_name}
            onChange={(e) =>
              setMember({
                ...member,
                m_name: e.target.value,
              })
            }
          />
        </div>
        <div className="text-email">이메일</div>
        <div className="userinfo-email">
          <input
            className="userinfo-name-box"
            type="text"
            disabled
            value={member.m_email}
            onChange={(e) =>
              setMember({
                ...member,
                m_email: e.target.value,
              })
            }
          />
        </div>
        {/* <div className="text-hp">전화번호</div>
        <div className="userinfo-hp">
          <input className="userinfo-name-box" />
        </div> */}
        <div className="text-belong">소속</div>
        <div className="userinfo-belong">
          <input
            className="userinfo-name-box"
            type="text"
            disabled
            value={member.ai_name}
          />
        </div>
        <div className="text-nickname">별명</div>
        <div className="userinfo-nickname">
          <input
            className="userinfo-name-box"
            type="text"
            value={member.m_nickname}
            onChange={(e) =>
              setMember({
                ...member,
                m_nickname: e.target.value,
              })
            }
          />
        </div>
        <div className="text-profilepic">프로필 사진</div>

        <div className="userinfo-profile">
          <input
            type="file"
            id="file"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          <button
            type="button"
            onClick={openFilePicker}
            className="userinfo-profile-input"
          >
            변경
          </button>
          <div className="profile-picture">
            {/* <img alt="" src={imageUrl} /> */}
            {imageUrl && <img src={imageUrl} alt="Preview" />}
          </div>
        </div>

        <img
          className="userinfo-line-01-icon"
          alt=""
          src="/userinfo-line-01.svg"
        />
        <div className="button-userinfo-save">
          <button type="submit" className="button-userinfo-save-box">
            <b className="text-save" style={{ color: "#fff" }}>
              저장
            </b>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
