import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Main} from '../pages/main';
import {DevChat, Lobby, Room} from '../pages/test';
import {Footer, Header, NotFound} from '../components';

function RouteMain(props) {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/home' element={<Main/>}/>
                <Route path='/devchat/:ai_idx' element={<DevChat/>}/>

                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default RouteMain;