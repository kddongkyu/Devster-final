
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
} from "../pages/mypage";
import Withdrawal from "../pages/mypage/Withdrawal";
import Notice from "../pages/mypage/Notice";
import LoginForm from "../components/LoginForm";

function RouteMain(props) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<LoginForm />} />

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

        <Route path="/devchat/:ai_idx" element={<DevChat />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );

}

export default RouteMain;
