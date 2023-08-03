import React, { useEffect, useState } from "react";
import "./style/MenuModal.css";
import { NavLink } from "react-router-dom";
import axiosIns from "../api/JwtConfig";
import { checkToken } from "../api/checkToken";

function MenuModal({ isMenuOpen, setIsMenuOpen }) {
  const closeMenuBar = () => {
    setIsMenuOpen(false);
  };

  const [member, setMember] = useState({
    m_nickname: "",
    m_email: "",
    m_role: "",
  });

  const [companyMember, setCompanyMember] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [memberType, setMemberType] = useState(null);

  const photoUrl = process.env.REACT_APP_MEMBERURL;
  const imageUrl = `${photoUrl}${member.m_photo}`;
  const decodedToken = checkToken();

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

  const handleLogout = async () => {
    try {
      if(window.confirm("로그아웃 하시겠습니까?")) {
        await axiosIns.get('/api/member/D1/logout', {
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log('로그아웃 성공');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  useEffect(() => {
    try {

      if (decodedToken) {
        setMemberType(decodedToken.type);
        setIsLoggedIn(true);

        if (decodedToken.type === "normal") {
          getMemberData(decodedToken.idx);
        } else if (decodedToken.type === "company") {
          getCompMemberData(decodedToken.idx);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setIsLoggedIn(false);
    }
  }, []);

  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className="menu-modal-box">
      <div className="moblie-menu-modal">
        <div className="menu-modal">
          <div className="menu-modal-logo">
            <NavLink to={"/"} onClick={closeMenuBar}>
              <img
                className="menu-modal-img-icon"
                alt=""
                src={require("../assets/header-logo-img.svg").default}
              />
              <div className="menu-modal-text">Devster</div>
            </NavLink>
          </div>
          <img
            className="menu-modal-close-icon"
            alt=""
            src={require("../assets/menu_modal_close.svg").default}
            onClick={closeMenuBar}
          />
        </div>
        {isLoggedIn ? (
          <div className="menu-modal-options">
            <NavLink to={"/notice/admin"} onClick={closeMenuBar}>
              <b className="menu-modal-options-not">공지사항</b>
            </NavLink>
            <NavLink to={"/fboard"} onClick={closeMenuBar}>
              <b className="menu-modal-options-fb">일반게시판</b>
            </NavLink>
            <NavLink to={"/qboard"} onClick={closeMenuBar}>
              <div className="menu-modal-options-qna">Q&A</div>
            </NavLink>
            <NavLink to={"/hboard"} onClick={closeMenuBar}>
              <b className="menu-modal-options-hire">채용정보</b>
            </NavLink>
            <NavLink to={"/aboard"} onClick={closeMenuBar}>
              <b className="menu-modal-options-aca">학원별게시판</b>
            </NavLink>
            <NavLink to={"/review"} onClick={closeMenuBar}>
              <b className="menu-modal-options-review">회사후기</b>
            </NavLink>
          </div>
        ) : (
            <div className="menu-modal-options">
              <NavLink to={"/fboard"} onClick={closeMenuBar}>
                <b className="menu-modal-options-fb2">일반게시판</b>
              </NavLink>
              <NavLink to={"/qboard"} onClick={closeMenuBar}>
                <div className="menu-modal-options-qna2">Q&A</div>
              </NavLink>
              <NavLink to={"/hboard"} onClick={closeMenuBar}>
                <b className="menu-modal-options-hire2">채용정보</b>
              </NavLink>
              <NavLink to={"/aboard"} onClick={closeMenuBar}>
                <b className="menu-modal-options-aca2">학원별게시판</b>
              </NavLink>
              <NavLink to={"/review"} onClick={closeMenuBar}>
                <b className="menu-modal-options-review2">회사후기</b>
              </NavLink>
            </div>
        )}


        {isLoggedIn ? (
          <div className="menu-mypage">
            <div className="menu-mypage-box">
              <div className="menu-mypage-userinfo">
                <div className="menu-mypage-userinfo">
                  {memberType === "normal" && member.m_photo && (
                    <div className="menu-mypage-userinfo-img">
                      <img alt="" src={imageUrl} />
                    </div>
                  )}
                  <div
                    className="menu-mypage-userinfo-contents"
                    style={{ marginLeft: memberType === "company" ? "0" : "" }}
                  >
                    {memberType === "normal" ? (
                      <>
                        <div className="menu-mypage-userinfo-nickname">
                          {member.m_nickname}
                        </div>
                        <div className="menu-mypage-userinfo-email">
                          {member.m_email}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="menu-mypage-userinfo-nickname">
                          {companyMember.cm_name}
                        </div>
                        <div className="menu-mypage-userinfo-email">
                          {companyMember.cm_email}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <NavLink
                to={
                  memberType === "normal" && member.m_role === "GUEST"
                    ? "/userinfo"
                    : memberType === "company" &&
                      companyMember.cm_role === "GUEST"
                    ? "/compuserinfo"
                    : memberType === "normal" && member.m_role === "USER"
                    ? "/userinfo"
                    : memberType === "company" &&
                      companyMember.cm_role === "USER"
                    ? "/compuserinfo"
                    : memberType === "normal" && member.m_role === "ADMIN"
                    ? "/notice/admin"
                    : "/default"
                }
                onClick={closeMenuBar}
              >
                <b className="menu-modal-options_mypage">
                  <div style={{ marginTop: "2rem" }}>마이페이지</div>
                </b>
              </NavLink>
            </div>
          </div>
        ) : null}

        <div
          className="menu-account"
          style={{ top: isLoggedIn ? "45rem" : "30rem" }}
        >
          <div className="menu-account-box" />

          {
            isLoggedIn ? (
                <React.Fragment>
                <div className="menu-account-signin">
                  <button
                      className="menu-account-signin-box"
                      onClick={handleLogout}>로그아웃</button>
                </div>
                {/* navlink 에러뜸, 쪽지 이모티콘 (왔는지 안왔는지) */}
                <NavLink to={"/message"} onClick={closeMenuBar}>
                  <div className="menu-account-signup">
                    <div className="menu-account-signup-box" />
                    <img
                        className="menu-modal-mail-icon"
                        alt=""
                        src={require("../assets/Mail.svg").default}
                    />
                    <b className="menu-account-mail-text">쪽지</b>
                  </div>
                </NavLink>
                </React.Fragment>
          ) : (
                <React.Fragment>
                  <NavLink to={"/signin"} onClick={closeMenuBar}>
                    <div className="menu-account-signin">
                      <button className="menu-account-signin-box">로그인</button>
                    </div>
                  </NavLink>
                  <NavLink to={"/signup"} onClick={closeMenuBar}>
                    <div className="menu-account-signup">
                      <div className="menu-account-signup-box" />
                      <b className="menu-account-signup-text">회원가입</b>
                    </div>
                  </NavLink>
                </React.Fragment>
          )}


        </div>
      </div>
    </div>
  );
}

export default MenuModal;
