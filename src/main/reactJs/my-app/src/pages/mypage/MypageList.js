import React, { useEffect, useState } from "react";
import "./style/MypageList.css";
import { NavLink, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";
import MypageListGuest from "./MypageListGuest";
import MypageListAdmin from "./MypageListAdmin";

function MypageList(props) {
  const activeStyle = {
    backgroundColor: "#e5e7eb",
    color: "#222",
  };
  const deactiveStyle = {
    color: "var(--color-slategray)",
  };

  const [member, setMember] = useState({
    m_role: "",
  });

  const decodedToken = jwt_decode(localStorage.accessToken);

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
    getMemberData(decodedToken.idx);
  }, []);

  console.log(member.m_role);

  return (
    <div className="mypage">
      <div className="mypage-wrapper">
        {member.m_role === "GUEST" ? <MypageListGuest /> : <MypageListAdmin />}
        {/* {member.m_role === "GUEST" ? <MypageListAdmin /> : <MypageListGuest />} */}
      </div>
      <Outlet />
    </div>
  );
}

export default MypageList;
