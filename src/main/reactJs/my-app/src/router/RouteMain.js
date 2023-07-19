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
    ResumeUpdateform, Withdrawal, NoticeAdmin, MemberSignupApproval,
} from "../pages/mypage";
import { SignIn } from "../pages/signin";
import { SignUpNorm } from "../pages/signup";
import {Fboard, FboardDetail, FboardForm, FboardUpdateForm} from "../pages/fboard";
import {Qboard, QboardForm} from "../pages/qboard";
import {Hboard, HboardForm} from "../pages/hboard";
import {Aboard, AboardForm} from "../pages/aboard";
import {Reviewform, Reviewlist, Reviewupdate,Reviewdetail} from "../pages/review";
import JwtTest from "../pages/test/JwtTest";

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


                <Route path='/fboard/form' element={<FboardForm/>}/>
                <Route path='/qboard/form' element={<QboardForm/>}/>
                <Route path='/hboard/form' element={<HboardForm/>}/>
                <Route path='/aboard/form' element={<AboardForm/>}/>
                <Route path='/review/form' element={<Reviewform/>}/>

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
