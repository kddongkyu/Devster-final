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
  ResumeUpdateform,
} from "../pages/mypage";

import Fboard from "../pages/fboard/Fboard";
import Qboard from "../pages/qboard/Board";
import Hboard from "../pages/hboard/Hboard";
import Aboard from "../pages/aboard/Aboard";
import FboardForm from "../pages/fboard/FboardForm";
import QboardForm from "../pages/qboard/QboardForm";
import HboardForm from "../pages/hboard/HboardForm";
import AboardForm from "../pages/aboard/AboardForm";

import Withdrawal from "../pages/mypage/Withdrawal";
import { SignIn } from "../pages/signin";
import { SignUpNorm } from "../pages/signup";
import JwtTest from "../pages/test/JwtTest";


import {Noticeform, Noticelist} from "../pages/notice";
import {Reviewform, Reviewlist, Reviewupdate,Reviewdetail} from "../pages/review";

import {FboardDetail, FboardUpdateForm} from "../pages/fboard";

import NoticeAdmin from "../pages/mypage/NoticeAdmin";
import MemberSignupApproval from "../pages/mypage/MemberSignupApproval";



function RouteMain(props) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />

        <Route path='/fboard' element={<Fboard/>}/>
        <Route path='/qboard' element={<Qboard/>}/>
        <Route path='/hboard' element={<Hboard/>}/>
        <Route path='/aboard' element={<Aboard/>}/>
        <Route path='/review' element={<Reviewlist/>}/>
        <Route path='/notice' element={<Noticelist/>}/>


        <Route path='/fboard/form' element={<FboardForm/>}/>
        <Route path='/qboard/form' element={<QboardForm/>}/>
        <Route path='/hboard/form' element={<HboardForm/>}/>
        <Route path='/aboard/form' element={<AboardForm/>}/>
        <Route path='/review/form' element={<Reviewform/>}/>
       <Route path='/notice/form' element={<Noticeform/>}/>

        <Route path='/review/detail/:rb_idx/:currentPage' element={<Reviewdetail/>}/>
        <Route path='/fboard/detail/:fb_idx/:currentPage' element={<FboardDetail/>}/>

        <Route path='/review/update/:rb_idx' element={<Reviewupdate/>}/>
        <Route path='/fboard/updateform/:fb_idx/:currentPage' element={<FboardUpdateForm/>}/>


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

        <Route path="/jwttest" element={<JwtTest />} />
      </Route>


      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUpNorm />} />
      <Route path="/devchat/:ai_idx" element={<DevChat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteMain;
