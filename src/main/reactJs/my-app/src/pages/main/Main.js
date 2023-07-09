import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './Main.css';
function Main(props) {
    const navi=useNavigate();

    return (
        <div className="signup-guest">
            <h1>
                <NavLink to={'/lobby'}>
                    테스트
                </NavLink>
            </h1>
        </div>
    );
}

export default Main;