import React, { useEffect, useRef, useState } from "react";
import "./style/Resumeform.css";
import axiosIns from "../../api/JwtConfig";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function Resumeform(props) {
  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);
  const m_idx = decodedToken.idx;

  const navigate = useNavigate();

  const [member, setMember] = useState({
    m_email: "",
    m_name: "",
  });

  const getMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  // Effects
  useEffect(() => {
    getMemberData(m_idx);
  }, []);

  const fileInput1 = useRef(null);
  const fileInput2 = useRef(null);

  const [resumeDto, setResumeDto] = useState({
    m_idx: m_idx,
    r_self: "",
    r_pos: "",
    r_skill: "",
    r_link: "",
    r_gradestart: "",
    r_gradeend: "",
    r_gradecom: "",
    r_sta: "",
    r_fileLocal: null,
    r_refileLocal: null,
    r_status: 1,
    r_ldate: "",
  });

  console.log(resumeDto);

  const [resumeCareerDtoList, setResumeCareerDtoList] = useState([
    {
      //recar_idx: 1,
      m_idx: m_idx,
      r_carstartdate: "",
      r_carenddate: "",
      r_company: "",
      r_department: "",
      r_position: "",
    },
  ]);

  const [resumeLicenseDtoList, setResumeLicenseDtoList] = useState([
    {
      // relic_idx: 1,
      m_idx: m_idx,
      r_licdate: "",
      r_licname: "",
    },
  ]);

  const addCareer = () => {
    if (resumeCareerDtoList.length >= 3) {
      alert("최대 3개까지만 가능합니다");
      return;
    }

    const newCareerList = [
      ...resumeCareerDtoList,
      {
        m_idx: m_idx,
        r_carstartdate: "",
        r_carenddate: "",
        r_company: "",
        r_department: "",
        r_position: "",
      },
    ];
    setResumeCareerDtoList(newCareerList);
  };

  const addLicense = () => {
    if (resumeLicenseDtoList.length >= 3) {
      alert("최대 3개까지만 가능합니다");
      return;
    }

    const newLicenseList = [
      ...resumeLicenseDtoList,
      {
        m_idx: m_idx,
        r_licdate: "",
        r_licname: "",
      },
    ];
    setResumeLicenseDtoList(newLicenseList);
  };

  const removeCareer = (index) => {
    const newCareerList = resumeCareerDtoList.filter((_, idx) => idx !== index);
    setResumeCareerDtoList(newCareerList);
  };

  const removeLicense = (index) => {
    const newLicenseList = resumeLicenseDtoList.filter(
      (_, idx) => idx !== index
    );
    setResumeLicenseDtoList(newLicenseList);
  };

  const clearFileInput1 = () => {
    if (fileInput1.current) {
      fileInput1.current.value = "";
    }
    setResumeDto({
      ...resumeDto,
      r_fileLocal: null,
    });
  };

  const clearFileInput2 = () => {
    if (fileInput2.current) {
      fileInput2.current.value = "";
    }
    setResumeDto({
      ...resumeDto,
      r_refileLocal: null,
    });
  };

  const handleChangeCareer = (e, index) => {
    const updatedCareerList = resumeCareerDtoList.map((career, idx) =>
      idx === index ? { ...career, [e.target.name]: e.target.value } : career
    );
    setResumeCareerDtoList(updatedCareerList);
  };

  // useEffect(() => {
  //   console.log(resumeCareerDtoList);
  // }, [resumeCareerDtoList]);

  const handleChange = (e) => {
    setResumeDto({
      ...resumeDto,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLicense = (e, index) => {
    const updatedLicenseList = resumeLicenseDtoList.map((license, idx) =>
      idx === index ? { ...license, [e.target.name]: e.target.value } : license
    );
    setResumeLicenseDtoList(updatedLicenseList);
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];

    if (file.type !== "application/pdf") {
      alert("pdf 파일만 업로드 할 수 있습니다");
      e.target.value = null;
      return;
    }

    switch (e.target.name) {
      case "r_file":
        setResumeDto((prevDto) => ({
          ...prevDto,
          r_fileLocal: file,
        }));
        break;
      case "r_refile":
        setResumeDto((prevDto) => ({
          ...prevDto,
          r_refileLocal: file,
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    if (resumeDto.r_fileLocal) {
      formData.append("upload", resumeDto.r_fileLocal);
      try {
        const response = await axiosIns.post("/api/resume/D1/file", formData);
        let url = response.data.url;
        resumeDto.r_file = url; // Update the resumeDto with the returned URL
      } catch (e) {
        jwtHandleError(e, toastAlert);
      }
    }

    if (resumeDto.r_refileLocal) {
      formData.append("upload", resumeDto.r_refileLocal);
      try {
        const response = await axiosIns.post("/api/resume/D1/refile", formData);
        let url = response.data.url;
        resumeDto.r_refile = url; // Update the resumeDto with the returned URL
      } catch (e) {
        jwtHandleError(e, toastAlert);
      }
    }

    const resumeWrapper = {
      resumeDto,
      resumeCareerDtoList,
      resumeLicenseDtoList,
    };

    try {
      const response = await axiosIns.post("/api/resume/D1", resumeWrapper);
      console.log(response.data);
      navigate("/myresume"); // after successful post, navigate to /resume
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  return (
    <form
      className="resumeform"
      onSubmit={handleSubmit}
      style={{
        height: `${
          118 + resumeCareerDtoList.length * 9 + resumeLicenseDtoList.length * 4
        }rem`,
      }}
    >
      <div className="resumeform-wrapper">
        <div className="resumeform-header">
          <b className="resumeform-header-name">{member.m_name}</b>
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
              src={require("./assets/icon_mail.svg").default}
            />
            <div className="resumeform-header-email-text">{member.m_email}</div>
          </div>
        </div>
        <div className="resumeform-job">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">개발 직무</b>
          </div>
          <div className="resumeform-job-box">
            <input
              className="resumeform-job-box-rec"
              type="text"
              name="r_pos"
              value={resumeDto.r_pos}
              onChange={handleChange}
              placeholder="예) 프론트엔드"
            />
          </div>
        </div>
        <div className="resumeform-skill">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">
              <span>{`기술 스택  `}</span>
              <span
                className="span"
                style={{ color: "#626567", fontWeight: "500" }}
              >
                (업무 툴 / 스킬)
              </span>
            </b>
          </div>
          <div className="resumeform-job-box">
            <input
              className="resumeform-job-box-rec"
              type="text"
              name="r_skill"
              value={resumeDto.r_skill}
              onChange={handleChange}
              placeholder="예) HTML,CSS,React,Javascript"
            />
          </div>
        </div>
        <div className="resumeform-link">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">
              <span>{`링크 업로드  `}</span>
              <span
                className="span"
                style={{ color: "#626567", fontWeight: "500" }}
              >
                (웹페이지 및 블로그)
              </span>
            </b>
          </div>
          <div className="resumeform-job-box">
            <input
              className="resumeform-job-box-rec"
              type="text"
              name="r_link"
              value={resumeDto.r_link}
              onChange={handleChange}
              placeholder="예) www.devster.kr"
            />
          </div>
        </div>
        <div className="resumeform-school">
          <div className="resumeform-school-title">
            <b className="resumeform-job-tiltle-text">
              <span>{`학력  `}</span>
              <span
                className="span"
                style={{ color: "#626567", fontWeight: "500" }}
              >
                (최종학력)
              </span>
            </b>
          </div>
          <div className="resumeform-school-entrance">
            <label htmlFor="start-date">시작일:</label>
            <input
              className="resumeform-school-entrance-rec"
              type="date"
              name="r_gradestart"
              value={resumeDto.r_gradestart}
              onChange={handleChange}
            />
          </div>
          <div className="resumeform-school-graduation">
            <input
              className="resumeform-school-entrance-rec"
              type="date"
              name="r_gradeend"
              value={resumeDto.r_gradeend}
              onChange={handleChange}
            />
          </div>
          <div className="resumeform-school-inputname">
            <input
              className="resumeform-school-entrance-rec"
              type="text"
              name="r_gradecom"
              value={resumeDto.r_gradecom}
              onChange={handleChange}
              placeholder="예) 한국대학교 경영학과"
            />
          </div>
        </div>
        <div className="resumeform-career">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">경력</b>
            <img
              className="icon-add-circle-outline"
              alt=""
              src={require("./assets/icon_circle_plus.svg").default}
              onClick={addCareer}
            />
          </div>
          {resumeCareerDtoList.map((career, index) => (
            <div className="resumeform-career-group-02" key={index}>
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => removeCareer(index)}
                  className="resumeform-career-group-02-removeButton"
                >
                  <img
                    alt=""
                    src={require("./assets/icon-trash.svg").default}
                  />
                </button>
              )}
              <div className="resumeform-career-group-02-gro">
                <input
                  className="resumeform-school-entrance-rec"
                  type="date"
                  name="r_carstartdate"
                  value={career.r_carstartdate}
                  onChange={(e) => handleChangeCareer(e, index)}
                />
              </div>
              <div className="resumeform-career-group-02-gro2">
                <input
                  className="resumeform-school-entrance-rec"
                  type="date"
                  name="r_carenddate"
                  value={career.r_carenddate}
                  onChange={(e) => handleChangeCareer(e, index)}
                />
              </div>
              <div className="resumeform-career-group-02-gro4">
                <input
                  className="resumeform-school-entrance-rec"
                  type="text"
                  name="r_company"
                  value={career.r_company}
                  onChange={(e) => handleChangeCareer(e, index)}
                  placeholder="회사명"
                />
              </div>
              <div className="resumeform-career-group-02-gro6">
                <input
                  className="resumeform-school-entrance-rec"
                  type="text"
                  name="r_department"
                  value={career.r_department}
                  onChange={(e) => handleChangeCareer(e, index)}
                  placeholder="부서명"
                />
              </div>
              <div className="resumeform-career-group-02-gro8">
                <input
                  className="resumeform-school-entrance-rec"
                  type="text"
                  name="r_position"
                  value={career.r_position}
                  onChange={(e) => handleChangeCareer(e, index)}
                  placeholder="직급"
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="resumeform-certificate"
          style={{ top: `${51 + resumeCareerDtoList.length * 9}rem` }}
        >
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">자격증</b>
            <img
              className="resume-certificate-plusicon"
              alt=""
              src={require("./assets/icon_circle_plus.svg").default}
              onClick={addLicense}
            />
          </div>
          {resumeLicenseDtoList.map((license, index) => (
            <div className="resumeform-certificate-box" key={index}>
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => removeLicense(index)}
                  className="resumeform-career-group-02-removeButton"
                >
                  <img
                    alt=""
                    src={require("./assets/icon-trash.svg").default}
                  />
                </button>
              )}
              <div className="resumeform-certificate-box-dat">
                <input
                  className="resumeform-school-entrance-rec"
                  type="date"
                  name="r_licdate"
                  value={license.r_licdate}
                  onChange={(e) => handleChangeLicense(e, index)}
                />
              </div>
              <input
                className="resumeform-certificate-box-inp"
                type="text"
                name="r_licname"
                value={license.r_licname}
                onChange={(e) => handleChangeLicense(e, index)}
                placeholder="예) 정보처리기능사"
              />
            </div>
          ))}
        </div>
        <div
          className="resumeform-content"
          style={{
            top: `${
              56 +
              resumeCareerDtoList.length * 9 +
              resumeLicenseDtoList.length * 4
            }rem`,
          }}
        >
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">간단 자기소개</b>
          </div>
          <div className="resume-content-box">
            <input
              className="resume-content-box-input"
              type="text"
              name="r_self"
              value={resumeDto.r_self}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className="resumeform-fileupload"
          style={{
            top: `${
              82 +
              resumeCareerDtoList.length * 9 +
              resumeLicenseDtoList.length * 4
            }rem`,
          }}
        >
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">
              <span>{`첨부파일 업로드  `}</span>
              <span
                className="span"
                style={{ color: "#626567", fontWeight: "500" }}
              >
                (자격증 및 포트폴리오)
              </span>
            </b>
          </div>
          <div className="resumeform-job-box">
            {/* <div className="resumeform-job-box-rec" /> */}

            <input
              ref={fileInput1}
              className="resumeform-job-box-rec"
              type="file"
              name="r_file"
              onChange={handleFileChange}
              style={{ width: "87%" }}
            />

            <button
              type="button"
              onClick={clearFileInput1}
              className="clearFileInput"
            >
              취소
            </button>
          </div>
        </div>
        <div
          className="resumeform-resumefileupload"
          style={{
            top: `${
              91 +
              resumeCareerDtoList.length * 9 +
              resumeLicenseDtoList.length * 4
            }rem`,
          }}
        >
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">이력서 업로드</b>
          </div>
          <div className="resumeform-job-box">
            <input
              ref={fileInput2}
              className="resumeform-job-box-rec"
              type="file"
              name="r_refile"
              onChange={handleFileChange}
              style={{ width: "87%" }}
            />
            <button
              type="button"
              onClick={clearFileInput2}
              className="clearFileInput"
            >
              취소
            </button>
          </div>
        </div>
      </div>
      <button
        className="resumeform-submit-button"
        type="submit"
        style={{
          position: "absolute",
          top: `${
            110 +
            resumeCareerDtoList.length * 9 +
            resumeLicenseDtoList.length * 4
          }rem`,
          right: "3rem",
        }}
      >
        저장
      </button>
    </form>
  );
}

export default Resumeform;
