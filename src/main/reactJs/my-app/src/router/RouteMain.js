import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../pages/main';
import { Lobby, Room } from '../pages/test';
import { NotFound } from '../components';

function RouteMain(props) {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/home' element={<Main />} />
            <Route path='/lobby' element={<Lobby />} />
            <Route path='/room/:roomId' element={<Room />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default RouteMain;