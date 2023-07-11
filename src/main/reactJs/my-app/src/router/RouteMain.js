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
}

export default RouteMain;