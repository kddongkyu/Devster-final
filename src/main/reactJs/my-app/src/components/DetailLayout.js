import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "./Header";

function DetailLayout(props) {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default DetailLayout;