import React from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "../pages/main";
import { DevChat } from "../pages/test";
import { Layout, NotFound } from "../components";
import {
  Bookmarks,
  MyResume,
  MypageList,
  Resumeform,
  UserInfo,
  Notice,
<<<<<<< HEAD
} from "../pages/mypage";
<<<<<<< HEAD
=======
  ResumeUpdateform,
} from "../pages/mypage";
>>>>>>> a5b8dd57d05ab43c0dbad67e9314cac840d9062f
import Fboard from "../pages/fboard/Fboard";
import Qboard from "../pages/qboard/Board";
import Hboard from "../pages/hboard/Hboard";
import Aboard from "../pages/aboard/Aboard";
import FboardForm from "../pages/fboard/FboardForm";
import QboardForm from "../pages/qboard/QboardForm";
import HboardForm from "../pages/hboard/HboardForm";
import AboardForm from "../pages/aboard/AboardForm";
<<<<<<< HEAD
=======
import Fboard from "../pages/fboard/Fboard"
import Qboard from "../pages/qboard/Board"
import Hboard from "../pages/hboard/Hboard"
import Aboard from "../pages/aboard/Aboard"
import FboardForm from "../pages/fboard/FboardForm"
import QboardForm from "../pages/qboard/QboardForm"
import HboardForm from "../pages/hboard/HboardForm"
import AboardForm from "../pages/aboard/AboardForm"
import FboardDetail from "../pages/fboard/FboardDetail"
>>>>>>> 5d8fde681ddff91b994e919ff0ca10d66c3e3867
import Withdrawal from "../pages/mypage/Withdrawal";
import LoginForm from "../components/LoginForm";

import { SignIn } from "../pages/signin";
import { SignUpNorm } from "../pages/signup";
import JwtTest from "../pages/test/JwtTest";
// import { Noticedetail, Noticeform, Noticelist } from "../pages/notice";

function RouteMain(props) {
<<<<<<< HEAD
=======
import FboardDetail from "../pages/fboard/FboardDetail";
import Withdrawal from "../pages/mypage/Withdrawal";
import { SignIn } from "../pages/signin";
import { SignUpNorm } from "../pages/signup";
import JwtTest from "../pages/test/JwtTest";
import NoticeAdmin from "../pages/mypage/NoticeAdmin";
import MemberSignupApproval from "../pages/mypage/MemberSignupApproval";
import Noticelist from "../pages/notice/Noticelist";
import Noticeform from "../pages/notice/Noticeform";
import Noticedetail from "../pages/notice/Noticedetail";

function RouteMain(props) {
>>>>>>> a5b8dd57d05ab43c0dbad67e9314cac840d9062f
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
<<<<<<< HEAD
        <Route path="/login" element={<LoginForm />} />
        <Route path="/fboard" element={<Fboard />} />
        <Route path="/qboard" element={<Qboard />} />
        <Route path="/hboard" element={<Hboard />} />
        <Route path="/aboard" element={<Aboard />} />
        {/* <Route path="/notice" element={<Noticelist />} /> */}
        <Route path="/fboard/form" element={<FboardForm />} />
        <Route path="/qboard/form" element={<QboardForm />} />ㄱ
        <Route path="/hboard/form" element={<HboardForm />} />
        <Route path="/aboard/form" element={<AboardForm />} />
        {/* <Route path="/notice/form" element={<Noticeform />} />
        <Route path="/notice/detail" element={<Noticedetail />} /> */}
        <Route path="/aboard" element={<Aboard />} />
        <Route path="/fboard/form" element={<FboardForm />} />
        <Route path="/qboard/form" element={<QboardForm />} />
        <Route path="/hboard/form" element={<HboardForm />} />
        <Route path="/aboard/form" element={<AboardForm />} />
        <Route element={<MypageList />}>
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/myresume" element={<MyResume />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          {/* <Route path="/notice" element={<Notice />} /> */}
        </Route>
        <Route>
          <Route path="/myresume/form" element={<Resumeform />} />
        </Route>
        <Route path="/jwttest" element={<JwtTest />} />
      </Route>
=======
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Main/>}/>
                <Route path="/home" element={<Main/>}/>
                <Route path="/login" element={<LoginForm/>}/>
=======
>>>>>>> a5b8dd57d05ab43c0dbad67e9314cac840d9062f

        <Route path="/fboard" element={<Fboard />} />
        <Route path="/qboard" element={<Qboard />} />
        <Route path="/hboard" element={<Hboard />} />
        <Route path="/aboard" element={<Aboard />} />
        <Route path="/notice" element={<Noticelist />} />

        <Route path="/fboard/form" element={<FboardForm />} />
        <Route path="/qboard/form" element={<QboardForm />} />
        <Route path="/hboard/form" element={<HboardForm />} />
        <Route path="/aboard/form" element={<AboardForm />} />
        <Route path="/notice/form" element={<Noticeform />} />

        <Route path="/fboard/detail" element={<FboardDetail />} />
        <Route path="/notice/detail" element={<Noticedetail />} />

        <Route element={<MypageList />}>
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/myresume" element={<MyResume />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/admin" element={<NoticeAdmin />} />
          <Route path="/member/approval" element={<MemberSignupApproval />} />
        </Route>

        <Route>
          <Route path="/myresume/form" element={<Resumeform />} />
          <Route path="/updateresume" element={<ResumeUpdateform />} />
        </Route>

<<<<<<< HEAD
                <Route element={<MypageList/>}>
                    <Route path="/userinfo" element={<UserInfo/>}/>
                    <Route path="/bookmarks" element={<Bookmarks/>}/>
                    <Route path="/myresume" element={<MyResume/>}/>
                    <Route path="/withdrawal" element={<Withdrawal/>}/>
                    <Route path="/notice" element={<Notice/>}/>
                </Route>s

                <Route>
                    <Route path="/myresume/form" element={<Resumeform/>}/>
                </Route>

                <Route path='/jwttest' element={<JwtTest/>}/>
            </Route>

            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUpNorm/>}/>
            <Route path='/devchat/:ai_idx' element={<DevChat/>}/>
            <Route path="*" element={<NotFound/>}/>

        </Routes>
    );
>>>>>>> 5d8fde681ddff91b994e919ff0ca10d66c3e3867
=======
        <Route path="/jwttest" element={<JwtTest />} />
      </Route>
>>>>>>> a5b8dd57d05ab43c0dbad67e9314cac840d9062f

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUpNorm />} />
      <Route path="/devchat/:ai_idx" element={<DevChat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteMain;
