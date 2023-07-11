<<<<<<< HEAD
import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {Main} from '../pages/main';
import {DevChat, Lobby, Room} from '../pages/test';
import {Footer, Header, NotFound} from '../components';
import {SignIn} from "../pages/signin";

function RouteMain(props) {
    const location = useLocation();
    const noHeaderFooterRoutes = ['/signin',
        path => path.startsWith('/devchat')
    ];

    const showHeaderFooter = !noHeaderFooterRoutes.some(route=>
    typeof route === 'function'? route(location.pathname) : route === location.pathname);

    return (
        <>
            {showHeaderFooter && <Header/>}
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/home' element={<Main/>}/>
                <Route path={'/signin'} element={<SignIn/>}/>

                <Route path='/devchat' element={<DevChat/>}>
                    <Route path={':ai_idx'} element={<DevChat/>}/>
                </Route>

                <Route path='*' element={<NotFound/>}/>
            </Routes>
            {showHeaderFooter && <Footer/>}
        </>
    );
=======
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
>>>>>>> 650d23de1d2d797c299ab3a7572dbb4fb347635a
}

export default RouteMain;
