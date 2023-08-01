import React, { useEffect, useState } from "react";
import axiosIns from "../../api/JwtConfig";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../api/checkToken";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function ResumeUpdateform(props) {
  const decodedToken = checkToken();
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const m_idx = decodedToken.idx;

  const navigate = useNavigate();

  const [member, setMember] = useState({
    m_name: "",
    m_email: "",
  });

  const [resume, setResume] = useState({
    r_file: "",
    r_reffile: "",
  });

  const [resumeCareerList, setResumeCareerList] = useState([]);
  const [resumeLicenseList, setResumeLicenseList] = useState([]);

  const getMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  const getResume = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/resume/D1/${idx}`);
      setResume(response.data.resumeDto);
      setResumeCareerList(response.data.resumeCareerDtoList);
      setResumeLicenseList(response.data.resumeLicenseDtoList);
      console.log(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  const removeCareer = (index) => {
    const newCareerList = resumeCareerList.filter((_, idx) => idx !== index);
    setResumeCareerList(newCareerList);
  };

  const removeLicense = (index) => {
    const newLicenseList = resumeLicenseList.filter((_, idx) => idx !== index);
    setResumeLicenseList(newLicenseList);
  };

  useEffect(() => {
    getMemberData(m_idx);
    getResume(m_idx);
  }, []);

  const updateResume = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosIns.put("/api/resume/D1", {
        resumeDto: resume,
        resumeCareerDtoList: resumeCareerList,
        resumeLicenseDtoList: resumeLicenseList,
      });

      console.log("response.data: " + response.data);

      if (response.status === 200) {
        navigate("/myresume");
        console.log("resumeCareerList: " + resumeCareerList.r_company);
      } else {
        console.error("An error occurred while updating the resume");
      }

      console.log(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  const handleFileChange = async (e) => {
    let file = e.target.files[0];

    let extension = file.name.split(".").pop().toLowerCase();

    if (extension !== "pdf") {
      alert("PDF 파일만 가능합니다.");
      e.target.value = null;
      return;
    }

    let formData = new FormData();
    formData.append("upload", file);
    let url;

    switch (e.target.name) {
      case "r_file":
        setResume((prevResume) => ({ ...prevResume, r_file: file.name }));
        try {
          const response = await axiosIns.post("/api/resume/D1/file", formData);
          url = response.data.url;
          setResume((prevDto) => ({
            ...prevDto,
            resumeFileUrl: url,
          }));
        } catch (error) {
          console.log(error.message);
        }
        break;
      case "r_refile":
        setResume((prevResume) => ({ ...prevResume, r_reffile: file.name }));
        try {
          const response = await axiosIns.post(
            "/api/resume/D1/refile",
            formData
          );
          url = response.data.url;
          setResume((prevDto) => ({
            ...prevDto,
            reFileUrl: url,
          }));
        } catch (error) {
          console.log(error.message);
        }
        break;
      default:
        break;
    }
  };

  const addCareer = () => {
    if (resumeCareerList.length >= 3) {
      alert("최대 3개까지만 가능합니다");
      return;
    }

    const newCareerList = [
      ...resumeCareerList,
      {
        m_idx: m_idx,
        r_carstartdate: "",
        r_carenddate: "",
        r_company: "",
        r_department: "",
        r_position: "",
      },
    ];
    setResumeCareerList(newCareerList);
  };

  const addLicense = () => {
    if (resumeLicenseList.length >= 3) {
      alert("최대 3개까지만 가능합니다");
      return;
    }

    const newLicenseList = [
      ...resumeLicenseList,
      {
        m_idx: m_idx,
        r_licdate: "",
        r_licname: "",
      },
    ];
    setResumeLicenseList(newLicenseList);
  };

  return (
    <form
      className="resumeform"
      onSubmit={updateResume}
      style={{
        height: `${
          121 + resumeCareerList.length * 9 + resumeLicenseList.length * 4
        }rem`,
      }}
    >
      <div className="resumeform-wrapper">
        <div className="resumeform-header">
          <b className="resumeform-header-name">{member.m_name}</b>
          <div className="resumeform-header-ck">
            {/*<div className="resumeform-header-ck-text">이력서 공개여부</div>*/}
            {/*<img*/}
            {/*  className="resumeform-header-ck-rec-icon"*/}
            {/*  alt=""*/}
            {/*  src={require("./assets/resumeform_header_ck_rec.svg").default}*/}
            {/*/>*/}
            <input className="switch" type="checkbox" checked="true" />
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
              value={resume.r_pos || ""}
              onChange={(e) => setResume({ ...resume, r_pos: e.target.value })}
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
              value={resume.r_skill || ""}
              onChange={(e) =>
                setResume({ ...resume, r_skill: e.target.value })
              }
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
              value={resume.r_link || ""}
              onChange={(e) => setResume({ ...resume, r_link: e.target.value })}
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
            <input
              className="resumeform-school-entrance-rec"
              type="date"
              name="r_gradestart"
              value={
                (resume.r_gradestart &&
                  !isNaN(Date.parse(resume.r_gradestart)) &&
                  new Date(resume.r_gradestart).toISOString().split("T")[0]) ||
                ""
              }
              onChange={(e) =>
                setResume({ ...resume, r_gradestart: e.target.value })
              }
            />
          </div>
          <div className="resumeform-school-graduation">
            <input
              className="resumeform-school-entrance-rec"
              type="date"
              name="r_gradeend"
              value={
                (resume.r_gradeend &&
                  !isNaN(Date.parse(resume.r_gradeend)) &&
                  new Date(resume.r_gradeend).toISOString().split("T")[0]) ||
                ""
              }
              onChange={(e) =>
                setResume({ ...resume, r_gradeend: e.target.value })
              }
            />
          </div>
          <div className="resumeform-school-inputname">
            <input
              className="resumeform-school-entrance-rec"
              type="text"
              name="r_gradecom"
              value={resume.r_gradecom || ""}
              onChange={(e) =>
                setResume({ ...resume, r_gradecom: e.target.value })
              }
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
          {resumeCareerList.map((career, index) => (
            <div key={index} className="resumeform-career-group-02">
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
                  name={`r_carstartdate${index}`}
                  value={
                    (career.r_carstartdate &&
                      !isNaN(Date.parse(career.r_carstartdate)) &&
                      new Date(career.r_carstartdate)
                        .toISOString()
                        .split("T")[0]) ||
                    ""
                  }
                  onChange={(e) => {
                    const updatedCareerList = [...resumeCareerList];
                    updatedCareerList[index].r_carstartdate = e.target.value;
                    setResumeCareerList(updatedCareerList);
                  }}
                />
              </div>
              <div className="resumeform-career-group-02-gro2">
                <input
                  className="resumeform-school-entrance-rec"
                  type="date"
                  name="r_carenddate"
                  value={
                    (career.r_carenddate &&
                      !isNaN(Date.parse(career.r_carenddate)) &&
                      new Date(career.r_carenddate)
                        .toISOString()
                        .split("T")[0]) ||
                    ""
                  }
                  onChange={(e) => {
                    const updatedCareerList = [...resumeCareerList];
                    updatedCareerList[index].r_carenddate = e.target.value;
                    setResumeCareerList(updatedCareerList);
                  }}
                />
              </div>
              <div className="resumeform-career-group-02-gro4">
                <input
                  className="resumeform-school-entrance-rec"
                  type="text"
                  name="r_company"
                  value={career.r_company || ""}
                  onChange={(e) => {
                    const updatedCareerList = [...resumeCareerList];
                    updatedCareerList[index].r_company = e.target.value;
                    setResumeCareerList(updatedCareerList);
                  }}
                />
              </div>
              <div className="resumeform-career-group-02-gro6">
                <input
                  className="resumeform-school-entrance-rec"
                  type="text"
                  name="r_department"
                  value={career.r_department || ""}
                  onChange={(e) => {
                    const updatedCareerList = [...resumeCareerList];
                    updatedCareerList[index].r_department = e.target.value;
                    setResumeCareerList(updatedCareerList);
                  }}
                />
              </div>
              <div className="resumeform-career-group-02-gro8">
                <input
                  className="resumeform-school-entrance-rec"
                  type="text"
                  name="r_position"
                  value={career.r_position || ""}
                  onChange={(e) => {
                    const updatedCareerList = [...resumeCareerList];
                    updatedCareerList[index].r_position = e.target.value;
                    setResumeCareerList(updatedCareerList);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="resumeform-certificate"
          style={{ top: `${51 + resumeCareerList.length * 9}rem` }}
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
          {resumeLicenseList.map((license, index) => (
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
                  value={
                    (license.r_licdate &&
                      !isNaN(Date.parse(license.r_licdate)) &&
                      new Date(license.r_licdate)
                        .toISOString()
                        .split("T")[0]) ||
                    ""
                  }
                  onChange={(e) => {
                    const updatedLicenseList = [...resumeLicenseList];
                    updatedLicenseList[index].r_licdate = e.target.value;
                    setResumeLicenseList(updatedLicenseList);
                  }}
                />
              </div>
              <input
                className="resumeform-certificate-box-inp"
                type="text"
                name="r_licname"
                value={license.r_licname || ""}
                onChange={(e) => {
                  const updatedLicenseList = [...resumeLicenseList];
                  updatedLicenseList[index].r_licname = e.target.value;
                  setResumeLicenseList(updatedLicenseList);
                }}
              />
            </div>
          ))}
        </div>
        <div
          className="resumeform-content"
          style={{
            top: `${
              56 + resumeCareerList.length * 9 + resumeLicenseList.length * 4
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
              value={resume.r_self || ""}
              onChange={(e) => setResume({ ...resume, r_self: e.target.value })}
            />
          </div>
        </div>
        <div
          className="resumeform-fileupload"
          style={{
            top: `${
              82 + resumeCareerList.length * 9 + resumeLicenseList.length * 4
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
            <label htmlFor="fileUpload" className="customFileUpload">
              {resume.r_file || "Choose File"}
            </label>
            <input
              id="fileUpload"
              style={{ display: "none" }}
              className="resumeform-job-box-rec"
              type="file"
              name="r_file"
              onChange={handleFileChange}
            />
            {/* <button
              type="button"
              onClick={() => document.getElementById("fileUpload").click()}
              className="customFileUploadButton"
            >
              파일선택
            </button> */}
            <button
              type="button"
              className="clearFileInput"
              onClick={() =>
                setResume((prevResume) => ({ ...prevResume, r_file: "delete" }))
              }
            >
              <img alt="" src={require("./assets/icon-trash.svg").default} />
            </button>
          </div>
        </div>
        <div
          className="resumeform-resumefileupload"
          style={{
            top: `${
              92 + resumeCareerList.length * 9 + resumeLicenseList.length * 4
            }rem`,
          }}
        >
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">이력서 업로드</b>
          </div>
          <div className="resumeform-job-box">
            <label htmlFor="resumeFileUpload" className="customFileUpload">
              {resume.r_reffile || "Choose File"}
            </label>
            <input
              id="resumeFileUpload"
              style={{ display: "none" }}
              className="resumeform-job-box-rec"
              type="file"
              name="r_refile"
              onChange={handleFileChange}
              // value={resumeDto.r_refile}
            />
            {/* <div className="resumeform-link-box-icon-text">
              {" "}
              PDF 파일로 올려주세요.
            </div> */}
            {/* <button
              type="button"
              onClick={() =>
                document.getElementById("resumeFileUpload").click()
              }
              className="customFileUploadButton"
            >
              파일선택
            </button> */}
            <button
              type="button"
              className="clearFileInput"
              onClick={() =>
                setResume((prevResume) => ({
                  ...prevResume,
                  r_reffile: "delete",
                }))
              }
            >
              <img alt="" src={require("./assets/icon-trash.svg").default} />
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="resume-update-submit-button"
        style={{
          position: "absolute",
          top: `${
            112 + resumeCareerList.length * 9 + resumeLicenseList.length * 4
          }rem`,
          right: "2.4rem",
        }}
      >
        저장
      </button>
    </form>
  );
}

export default ResumeUpdateform;
