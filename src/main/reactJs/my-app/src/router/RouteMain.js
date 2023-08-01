<<<<<<< HEAD
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Main } from "../pages/main";
import { DevChat } from "../pages/test";
import { Layout, NotFound } from "../components";
=======
import React, {useEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {Main} from "../pages/main";
import {Layout, NotFound} from "../components";
>>>>>>> JK
import {
  Bookmarks,
  MyResume,
  MypageList,
  Resumeform,
  UserInfo,
  Notice,
  ResumeUpdateform,
  Withdrawal,
  NoticeAdmin,
  MemberSignupApproval,
  NBoardDetail,
  NboardForm,
  NboardUpdateForm,
  CompanySignupApproval,
  CompUserInfo,
  CompanyApprovalApply,
  WithdrawalCompany,
  ResumeList,
  ResumeDetail,
} from "../pages/mypage";
<<<<<<< HEAD
import { SignIn } from "../pages/signin";
import { Grats, SignUpCompForm, SignUpNorm } from "../pages/signup";
=======
import {SignIn} from "../pages/signin";
import {Grats, SignUpCompForm, SignUpNorm, SocialForm} from "../pages/signup";
>>>>>>> JK
import {
  Fboard,
  FboardDetail,
  FboardForm,
  FboardUpdateForm,
} from "../pages/fboard";
import { Qboard, QboardForm } from "../pages/qboard";
import { Aboard, Aboarddtail, AboardForm, Aboardupdate } from "../pages/aboard";
import {
  Hboard,
  HboardForm,
  HboardDetail,
  HboardUpdateForm,
} from "../pages/hboard";
import {
  Reviewform,
  Reviewlist,
  Reviewupdate,
  Reviewdetail,
} from "../pages/review";
import MessageList from "../pages/message/MessageList";
import MessageDetail from "../pages/message/MessageDetail";
import MessageForm from "../pages/message/MessageForm";
import QboardDetail from "../pages/qboard/QboardDetail";
<<<<<<< HEAD
import Translate from "../pages/test/translate";
import FindID from "../pages/signin/find/FindID";
=======
import KakaoRedirect from "../api/social/KakaoRedirect";
import NaverRedirect from "../api/social/NaverRedirect";
import {DevChat} from "../pages/devchat";

>>>>>>> JK

function RouteMain(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />

        <Route path="/fboard" element={<Fboard />} />
        <Route path="/qboard" element={<Qboard />} />
        <Route path="/hboard" element={<Hboard />} />
        <Route path="/aboard" element={<Aboard />} />
        <Route path="/review" element={<Reviewlist />} />

        <Route path="/fboard/form" element={<FboardForm />} />
        <Route path="/qboard/form" element={<QboardForm />}>
          <Route path=":qb_idx/:currentPage" element={<QboardForm />} />
        </Route>
        <Route path="/hboard/form" element={<HboardForm />} />
        <Route path="/aboard/form" element={<AboardForm />} />
        <Route path="/review/form" element={<Reviewform />} />

        <Route
          path="/review/detail/:rb_idx/:currentPage"
          element={<Reviewdetail />}
        />
        <Route
          path="/fboard/detail/:fb_idx/:currentPage"
          element={<FboardDetail />}
        />

        <Route path="/review/update/:rb_idx" element={<Reviewupdate />} />
        <Route
          path="/fboard/updateform/:fb_idx/:currentPage"
          element={<FboardUpdateForm />}
        />

        <Route
          path="/hboard/detail/:hb_idx/:currentPage"
          element={<HboardDetail />}
        />

<<<<<<< HEAD
        <Route
          path="hboard/updateform/:hb_idx/:currentPage"
          element={<HboardUpdateForm />}
        />

        <Route
          path="/aboard/detail/:ab_idx/:currentPage"
          element={<Aboarddtail />}
        />

        <Route
          path="/qboard/detail/:qb_idx/:currentPage"
          element={<QboardDetail />}
        />

        <Route
          path="/fboard/detail/:fb_idx/:currentPage"
          element={<FboardDetail />}
        />

        <Route
          path="/review/detail/:rb_idx/:currentPage"
          element={<Reviewdetail />}
        />

        <Route path="/review/update/:rb_idx" element={<Reviewupdate />} />
        <Route
          path="/fboard/updateform/:fb_idx/:currentPage"
          element={<FboardUpdateForm />}
        />
        <Route
          path="/aboard/update/:ab_idx/:currentPage"
          element={<Aboardupdate />}
        />

        <Route element={<MypageList />}>
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/compuserinfo" element={<CompUserInfo />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/myresume" element={<MyResume />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/mypage/notice" element={<Notice />} />
          <Route path="/notice/admin" element={<NoticeAdmin />} />
          <Route path="/member/approval" element={<MemberSignupApproval />} />
          <Route path="/company/approval" element={<CompanySignupApproval />} />
          <Route path="/company/apply" element={<CompanyApprovalApply />} />
          <Route path="/company/withdrawal" element={<WithdrawalCompany />} />
          <Route path="/resumelist" element={<ResumeList />} />
        </Route>

        <Route>
          <Route path="/message" element={<MessageList />} />
        </Route>
        <Route path="/message/detail/:mes_idx" element={<MessageDetail />} />
        <Route path="/message/form/:recv_nick" element={<MessageForm />} />
        <Route>
          <Route path="/myresume/form" element={<Resumeform />} />
          <Route path="/updateresume" element={<ResumeUpdateform />} />
        </Route>

        <Route
          path="/nboard/detail/:nb_idx/:currentPage"
          element={<NBoardDetail />}
        />
        <Route path="/nboard/form" element={<NboardForm />} />
        <Route
          path="/nboard/updateform/:nb_idx/:currentPage"
          element={<NboardUpdateForm />}
        />

        <Route
          path="/resume/detail/:m_idx/:currentPage"
          element={<ResumeDetail />}
        />

        <Route path="/jwttest" element={<JwtTest />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUpNorm />} />
      <Route path="/findID" element={<FindID />} />
      <Route path="/csignup" element={<SignUpCompForm />} />
      <Route path="/grats" element={<Grats />} />
      <Route path="/devchat/:ai_idx" element={<DevChat />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/translate" element={<Translate />} />
    </Routes>
  );
=======
                <Route>
                    <Route path="/message" element={<MessageList/>}/>
                </Route>
                <Route
                    path="/message/detail/:mes_idx"
                    element={<MessageDetail/>}
                />
                <Route path="/message/form/:recv_nick" element={<MessageForm/>}/>
                <Route>
                    <Route path="/myresume/form" element={<Resumeform/>}/>
                    <Route path="/updateresume" element={<ResumeUpdateform/>}/>
                </Route>
            </Route>

            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUpNorm/>}/>
            <Route path="/csignup" element={<SignUpCompForm/>}/>
            <Route path="/social" element={<SocialForm/>}/>
            <Route path="/grats" element={<Grats/>}/>
            <Route path="/oauth2/authorization/kakao" element={<KakaoRedirect/>}/>
            <Route path="/oauth2/authorization/naver" element={<NaverRedirect/>}/>
            <Route path="/devchat/:ai_idx" element={<DevChat/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
>>>>>>> JK
}

export default RouteMain;
