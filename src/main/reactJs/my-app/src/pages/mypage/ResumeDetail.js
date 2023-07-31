import React, { useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";
import { useNavigate, useParams } from "react-router-dom";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function ResumeDetail(props) {
  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const { m_idx, currentPage } = useParams();
  const [detailData, setDetailData] = useState({});
  const [member, setMember] = useState({
    m_name: "",
    m_email: "",
    m_nickname: "",
    ai_name: "",
  });

  const navi = useNavigate();

  const photoUrl = process.env.REACT_APP_MEMBERURL;
  const imageUrl = `${photoUrl}${member.m_photo}`;
  const FileUrl = process.env.REACT_APP_RESUMEFILEURL;
  const REFileUrl = process.env.REACT_APP_RESUMEREFILEURL;

  const getMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
      //console.log("사진: " + response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    } finally {
    }
  };

  useEffect(() => {
    getMemberData(m_idx);
  }, []);

  useEffect(() => {
    axiosIns
      .get(`/api/resume/D1/${m_idx}`)
      .then((response) => {
        setDetailData(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        jwtHandleError(e, toastAlert);
      });
  }, [m_idx]);

  const timeForToday = (value) => {
    if (!value) {
      return "";
    }

    const valueConv = value.slice(0, -10);
    const today = new Date();
    const timeValue = new Date(valueConv);

    // timeValue를 한국 시간대로 변환
    const timeValueUTC = new Date(timeValue.toISOString());
    const offset = timeValue.getTimezoneOffset() * 60 * 1000; // 분 단위를 밀리초 단위로 변환
    const timeValueKST = new Date(timeValueUTC.getTime() - offset);

    const betweenTime = Math.floor(
      (today.getTime() - timeValueKST.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }
    console.log(betweenTime);

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 8) {
      return `${betweenTimeDay}일 전`;
    }

    const year = String(timeValue.getFullYear()).slice(0, 4);
    const month = String(timeValue.getMonth() + 1).padStart(2, "0");
    const day = String(timeValue.getDate()).padStart(2, "0");

    const formattedDateWithoutTime = `${year}-${month}-${day}`;

    return formattedDateWithoutTime;
  };

  return (
    <div className="resume-box-detail">
      {detailData.resumeDto && (
        <div className="nboard-detail-textarea-detail">
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
            <span className="resume_info_box_content">
              {detailData.resumeDto.r_pos}
            </span>
          </div>

          <div className="resume_info_box_02">
            <div className="resume_info_box_title">
              기술스택<span>(업무 툴 / 스킬)</span>
            </div>
            {detailData.resumeDto.r_skill.split(",").map((item, index) => (
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
              {detailData.resumeDto.r_link}
            </span>
          </div>

          <div className="resume_info_box_04">
            <div className="resume_info_box_title">학력</div>
            <span className="resume_info_box_content">
              {detailData.resumeDto.r_gradecom}
            </span>
          </div>

          <div className="resume_info_box_05">
            <div className="resume_info_box_title">경력</div>

            {detailData.resumeCareerDtoList &&
              detailData.resumeCareerDtoList.map((item, idx) => (
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

            {detailData.resumeLicenseDtoList &&
              detailData.resumeLicenseDtoList.map((item, idx) => (
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
              {detailData.resumeDto.r_self}
            </span>
          </div>

          {detailData &&
            detailData.resumeDto &&
            detailData.resumeDto.r_file && (
              <div className="resume_info_box_08">
                <div className="resume_info_box_title">첨부파일 업로드</div>
                <span className="resume_info_box_content">
                  <a
                    href={`${FileUrl}${detailData.resumeDto.r_file}`}
                    download={`${member.m_name} 첨부파일.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    첨부파일 열기
                  </a>
                </span>
              </div>
            )}

          {detailData &&
            detailData.resumeDto &&
            detailData.resumeDto.r_reffile && (
              <div className="resume_info_box_09">
                <div className="resume_info_box_title">이력서 파일 업로드</div>
                <span className="resume_info_box_content">
                  <a
                    href={`${REFileUrl}${detailData.resumeDto.r_reffile}`}
                    download={`${member.m_name} 이력서.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    이력서 파일 열기
                  </a>
                </span>
              </div>
            )}

          <div className="nboard-detail-photo-list"></div>
        </div>
      )}
    </div>
  );
}

export default ResumeDetail;
