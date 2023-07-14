import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from './router/Root';
import setAuthorizationToken from "./setAuthorizationToken";
import jwt_Decode from "jwt-decode";

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsIm1faWR4Ijo2OSwiZXhwIjoxNjg5MzQxNzg1fQ.YaEy466b_d-B6Qt-_KpsJgicHgT_4t-BhrJhSCa-56ONVtGq7g3LYJfzk55iMw0nX1xDWGaw6TXutgNheFP9ng';
localStorage.setItem("jwtToken", token);
setAuthorizationToken(localStorage.jwtToken);
console.log(jwt_Decode(token));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Root/>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
