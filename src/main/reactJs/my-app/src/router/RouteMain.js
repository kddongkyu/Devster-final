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
import LoginForm from "../components/LoginForm";
import { SignIn } from "../pages/signin";

function RouteMain(props) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/fboard" element={<Fboard />} />
        <Route path="/qboard" element={<Qboard />} />

        <Route path="/hboard" element={<Hboard />} />
        <Route path="/hboard/list/:currentPage" element={<Hboard />} />

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
          <Route path="/notice" element={<Notice />} />
        </Route>
        <Route>
          <Route path="/myresume/form" element={<Resumeform />} />
        </Route>
      </Route>

      <Route path="/signin" element={<SignIn />} />

      <Route path="/devchat/:ai_idx" element={<DevChat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteMain;
