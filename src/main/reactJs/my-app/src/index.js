import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Root from "./router/Root";
import setAuthorizationToken from "./components/setAuthorizationToken";
import jwt_decode from "jwt-decode";

const root = ReactDOM.createRoot(document.getElementById("root"));

const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsIm1faWR4Ijo2OSwiZXhwIjoxNjg5MzM4NDc0fQ.AFTzPoG-JukXPFwvupM1A09jYq5eEjYj-vaLn_dIZZVW7O7Trpn_aqP26fyiJ17iCxIEbstec_gDdprbWQ0VPg`;
localStorage.setItem("jwtToken", token);
setAuthorizationToken(localStorage.jwtToken);
console.log(jwt_decode(token));
root.render(
  // <React.StrictMode>
  <Root />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
