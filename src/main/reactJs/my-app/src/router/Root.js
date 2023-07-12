import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteMain from "./RouteMain";
import { ScrollTop } from "../components";

function root(props) {
  return (
    <BrowserRouter>
      <RouteMain />
    </BrowserRouter>
  );
}

export default root;
