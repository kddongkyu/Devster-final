import React, { useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function CompanyApprovalApply(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [member, setMember] = useState({ m_filename: "" });
  const [isLoading, setIsLoading] = useState(true);
  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const getMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMemberData(decodedToken.idx);
  }, [decodedToken.idx]);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append("upload", selectedFile);
    try {
      const response = await axiosIns.post(
        "/api/member/D1/checkphoto",
        formData
      );
      alert("사진이 업로드 되었습니다");
      await getMemberData(decodedToken.idx);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          height: "78.1rem",
          position: "relative",
          top: "40rem",
          width: "calc(100% - 4.4rem)",
          left: "2rem",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="approval-apply">
        <div className="content-bookmarks">
          <div className="content-bookmarks1" style={{ display: "block" }}>
            <b className="text-bookmark">학원인증 신청</b>
            {member.m_filename && member.m_filename !== "no" ? (
              <div
                className="bookmark-01"
                style={{ width: "100%", marginTop: "2rem" }}
              >
                학원 인증 사진이 업로드 되어있습니다. 운영진이 확인 후 승인이
                되면 활동이 가능합니다.
              </div>
            ) : (
              <>
                <div
                  className="bookmark-01"
                  style={{ width: "100%", marginTop: "2rem" }}
                >
                  학원 인증을 완료하시지 않으면 자유 게시판의 읽기만 가능합니다.
                  다른 기능을 이용하고 싶으시다면, 학원 인증을 완료해주세요
                </div>
                <input
                  type="file"
                  onChange={fileSelectedHandler}
                  className="approval-apply-input"
                />
                <button
                  onClick={fileUploadHandler}
                  className="approval-apply-button"
                >
                  업로드
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyApprovalApply;
