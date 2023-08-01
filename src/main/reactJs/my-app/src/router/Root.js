import React from "react";
import {BrowserRouter} from "react-router-dom";
import RouteMain from "./RouteMain";
import {DevChatModal} from "../pages/devchat";

function root(props) {
    return (
        <BrowserRouter>
            <DevChatModal/>
            <RouteMain/>
        </BrowserRouter>
    );
}

export default root;
