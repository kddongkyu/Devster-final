import React, { useEffect, useRef, useState } from "react";
import "./style/UserInfo.css";
import axiosIns from "../../api/JwtConfig";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function UserInfo(props) {
  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const [member, setMember] = useState({
    m_name: "",
    m_email: "",
    m_nickname: "",
    ai_name: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const photoUrl = process.env.REACT_APP_MEMBERURL;
  const imageUrl = `${photoUrl}${previewImage}`;

  // Functions
  const getMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
      setPreviewImage(`${photoUrl}${response.data.m_photo}`); // 서버에서 불러온 이미지 경로를 저장
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file); // selectedImage에는 파일 객체를 저장
    setImagePreviewUrl(URL.createObjectURL(file)); // imagePreviewUrl에는 미리보기 URL을 저장
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("upload", selectedImage);
      try {
        const response = await axiosIns.post(`/api/member/D1/photo`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setPreviewImage(`${photoUrl}${response.data.m_photo}`); // 서버에서 받아온 이미지 경로를 저장
      } catch (e) {
        jwtHandleError(e, toastAlert);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 이미지 업로드
    await handleImageUpload();

    // 회원 정보 업데이트 로직
    try {
      const response = await axiosIns.put("/api/member/D1", member);
      if (response.status === 200) {
        alert("수정되었습니다");
        window.location.reload();
      } else {
        console.log("There was an issue updating the member");
      }
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  // Effects
  useEffect(() => {
    getMemberData(decodedToken.idx);
  }, [decodedToken.idx]);

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
            onChange={handleImagePreview}
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
            <img
              src={imagePreviewUrl ? imagePreviewUrl : previewImage}
              alt="Preview"
            />
          </div>
        </div>

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
