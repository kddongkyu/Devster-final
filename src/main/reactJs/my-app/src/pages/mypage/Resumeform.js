import React, { useEffect, useState } from "react";
import "./style/Resumeform.css";
import axiosIns from "../../api/JwtConfig";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Resumeform(props) {
  const decodedToken = jwt_decode(localStorage.accessToken);
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
      console.log(e);
    }
  };

  // Effects
  useEffect(() => {
    getMemberData(m_idx);
  }, []);

  const [resumeDto, setResumeDto] = useState({
    //r_idx: 1,
    m_idx: m_idx,
    r_self: "",
    r_pos: "",
    r_skill: "",
    r_link: "",
    r_gradestart: "",
    r_gradeend: "",
    r_gradecom: "",
    r_sta: "",
    r_file: "",
    r_refile: "",
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

  const addCareer = () => {
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
    console.log(newCareerList); // 이 부분을 추가했습니다.
    setResumeCareerDtoList(newCareerList);
  };

  // const handleChangeCareer = (e) => {
  //   setResumeCareerDtoList([
  //     {
  //       ...resumeCareerDtoList[0],
  //       [e.target.name]: e.target.value,
  //     },
  //   ]);
  // };

  const handleChangeCareer = (e, index) => {
    const updatedCareerList = resumeCareerDtoList.map((career, idx) =>
      idx === index ? { ...career, [e.target.name]: e.target.value } : career
    );
    setResumeCareerDtoList(updatedCareerList);
  };

  // useEffect(() => {
  //   console.log(resumeCareerDtoList);
  // }, [resumeCareerDtoList]);

  const [resumeLicenseDtoList, setResumeLicenseDtoList] = useState([
    {
      // relic_idx: 1,
      m_idx: m_idx,
      r_licdate: "",
      r_licname: "",
    },
  ]);

  const handleChange = (e) => {
    setResumeDto({
      ...resumeDto,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLic = (e) => {
    setResumeLicenseDtoList([
      {
        ...resumeLicenseDtoList[0],
        [e.target.name]: e.target.value,
      },
    ]);
  };

  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("upload", file);
    let url;

    switch (e.target.name) {
      case "r_file":
        try {
          const response = await axiosIns.post("/api/resume/D1/file", formData);
          url = response.data.url;
          setResumeDto((prevDto) => ({
            ...prevDto,
            resumeFileUrl: url,
          }));
        } catch (error) {
          console.log(error.message);
        }
        break;
      case "r_refile":
        try {
          const response = await axiosIns.post(
            "/api/resume/D1/refile",
            formData
          );
          url = response.data.url;
          setResumeDto((prevDto) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resumeWrapper = {
      resumeDto,
      resumeCareerDtoList,
      resumeLicenseDtoList,
    };

    try {
      const response = await axiosIns.post("/api/resume/D1", resumeWrapper);
      console.log(response.data);
      navigate("/myresume"); // after successful post, navigate to /resume
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="resumeform" onSubmit={handleSubmit}>
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
              src={require("./assets/resumeform_header_email_icon.svg").default}
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
            />
          </div>
        </div>
        <div className="resumeform-skill">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">
              <span>{`기술 스택  `}</span>
              <span className="span">(업무 툴 / 스킬)</span>
            </b>
          </div>
          <div className="resumeform-job-box">
            <input
              className="resumeform-job-box-rec"
              type="text"
              name="r_skill"
              value={resumeDto.r_skill}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="resumeform-link">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">
              <span>{`링크 업로드  `}</span>
              <span className="span">(웹페이지 및 블로그)</span>
            </b>
          </div>
          <div className="resumeform-job-box">
            <input
              className="resumeform-job-box-rec"
              type="text"
              name="r_link"
              value={resumeDto.r_link}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="resumeform-school">
          <div className="resumeform-school-title">
            <b className="resumeform-job-tiltle-text">
              <span>{`학력  `}</span>
              <span className="span">(최종학력)</span>
            </b>
          </div>
          <div className="resumeform-school-entrance">
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
            />
          </div>
        </div>
        <div className="resumeform-career">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">경력</b>
            <img
              className="icon-add-circle-outline"
              alt=""
              src={require("./assets/icon _add_circle_outline.svg").default}
              onClick={addCareer}
            />
          </div>
          {resumeCareerDtoList.map((career, index) => (
            <div className="resumeform-career-group-02" key={index}>
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
                />
              </div>
              <div className="resumeform-career-group-02-gro6">
                <input
                  className="resumeform-school-entrance-rec"
                  type="text"
                  name="r_department"
                  value={career.r_department}
                  onChange={(e) => handleChangeCareer(e, index)}
                />
              </div>
              <div className="resumeform-career-group-02-gro8">
                <input
                  className="resumeform-school-entrance-rec"
                  type="text"
                  name="r_position"
                  value={career.r_position}
                  onChange={(e) => handleChangeCareer(e, index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="resumeform-certificate">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">자격증</b>
            <img
              className="resume-certificate-plusicon"
              alt=""
              src={require("./assets/resume_certificate_plusicon.svg").default}
            />
          </div>
          <div className="resumeform-certificate-box">
            <div className="resumeform-certificate-box-dat">
              <input
                className="resumeform-school-entrance-rec"
                type="date"
                name="r_licdate"
                value={resumeLicenseDtoList.r_licdate}
                onChange={handleChangeLic}
              />
            </div>
            <input
              className="resumeform-certificate-box-inp"
              type="text"
              name="r_licname"
              value={resumeLicenseDtoList.r_licname}
              onChange={handleChangeLic}
            />
          </div>
        </div>
        <div className="resumeform-content">
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
        <div className="resumeform-fileupload">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">
              <span>{`첨부파일 업로드  `}</span>
              <span className="span">(자격증 및 포트폴리오)</span>
            </b>
          </div>
          <div className="resumeform-job-box">
            {/* <div className="resumeform-job-box-rec" /> */}
            <input
              className="resumeform-job-box-rec"
              type="file"
              name="r_file"
              // value={resumeDto.r_file}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="resumeform-resumefileupload">
          <div className="resumeform-job-tiltle">
            <b className="resumeform-job-tiltle-text">이력서 업로드</b>
          </div>
          <div className="resumeform-job-box">
            <input
              className="resumeform-job-box-rec"
              type="file"
              name="r_refile"
              // value={resumeDto.r_refile}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        style={{ position: "absolute", top: "126rem", right: "3rem" }}
      >
        Submit
      </button>
    </form>
  );
}

export default Resumeform;
