import React from 'react';

function MainFreeboard(props) {
    return (
        <div className="main-freeboard-preview">
            <div className="main-freeboard-box" />
            <div className="main-best-profile-img" />
            <div className="main-freeboard-info">
                <div className="main-best-info-type">아이디명최대로ㅇㅇㅇ</div>
                <div className="main-freeboard-info-spacing" />
                <div className="main-best-info-date">작성시간</div>
            </div>
            <b className="main-freeboard-subject">
                제목 일이삼사오육칠팔구십일이삼사...
            </b>
            <div className="main-freeboard-likes">
                <div className="main-freeboard-likes-text">99.9k</div>
                <img
                    className="main-freeboard-likes-icon"
                    alt=""
                    src="/main-freeboard-likes-icon.svg"
                />
            </div>
            <div className="main-freeboard-coments">
                <div className="main-freeboard-likes-text">99.9k</div>
                <img
                    className="main-freeboard-coments-icon"
                    alt=""
                    src="/main-freeboard-coments-icon.svg"
                />
            </div>
            <img
                className="main-freeboard-img-icon"
                alt=""
                src="/main-freeboard-img-icon.svg"
            />
        </div>
    );
}

export default MainFreeboard;