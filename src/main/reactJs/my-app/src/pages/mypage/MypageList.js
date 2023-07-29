import React, { useEffect, useState } from "react";
import "./style/MypageList.css";
import { Outlet } from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import MypageListGuest from "./MypageListGuest";
import MypageListAdmin from "./MypageListAdmin";
import MypageListUser from "./MypageListUser";
import MypageListCompany from "./MypageListCompany";
import MypageListComGuest from "./MypageListComGuest";
import { checkToken } from "../../api/checkToken";

function MypageList(props) {
  const [member, setMember] = useState({});

  const [companyMember, setCompanyMember] = useState([]);

  const decodedToken = checkToken();

  const memberType = decodedToken.type;

  const getMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/member/D1/${idx}`);
      setMember(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCompMemberData = async (idx) => {
    try {
      const response = await axiosIns.get(`/api/compmember/D1/${idx}`);
      setCompanyMember(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Effects
  useEffect(() => {
    if (memberType === "normal") {
      getMemberData(decodedToken.idx);
    } else if (memberType === "company") {
      getCompMemberData(decodedToken.idx);
    }
  }, [memberType, decodedToken.idx]);

  let ComponentToRender;
  let componentHeight;

  if (memberType === "normal" && member.m_role === "GUEST") {
    ComponentToRender = MypageListGuest;
    componentHeight = "26.6rem";
  } else if (memberType === "company" && companyMember.cm_role === "USER") {
    ComponentToRender = MypageListCompany;
    componentHeight = "26.6rem";
  } else if (memberType === "normal" && member.m_role === "USER") {
    ComponentToRender = MypageListUser;
    componentHeight = "30.6rem";
  } else if (memberType === "company" && companyMember.cm_role === "GUEST") {
    ComponentToRender = MypageListComGuest;
    componentHeight = "21rem";
  } else {
    ComponentToRender = MypageListAdmin;
    componentHeight = "21.6rem";
  }

  return (
    <div className="mypage">
      <div className="mypage-wrapper" style={{ height: componentHeight }}>
        <ComponentToRender />
        {/* {member.m_role === "USER" ? <MypageListUser /> : <MypageListAdmin />} */}
        {/* {member.m_role === "GUEST" ? <MypageListAdmin /> : <MypageListGuest />} */}
      </div>
      <Outlet />
    </div>
  );
}

export default MypageList;
