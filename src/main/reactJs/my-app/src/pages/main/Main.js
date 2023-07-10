import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './style/Main.css';

function Main(props) {
    const navi=useNavigate();
    const [ai_idx,setAi_idx]=useState(3); //dummy
    
    return (
        <div>
            {/*<h1>*/}
            {/*    <button onClick={()=>{navi(`/devchat/${ai_idx}`)}}>ㄹㅇ테스트</button>*/}
            {/*</h1>*/}
            <div className="moblie-main">
                <div className="main-advertise">
                    <div className="main-advertise-box" />
                    <b className="main-advertise-text">광고1</b>
                </div>
                <div className="main-preview-name">
                    <div className="main-preview-name-box" />
                    <b className="main-preview-name-text">실시간 인기글</b>
                </div>
                <div className="main-best-preview">
                    <div className="main-best-box" />
                    <div className="main-best-profile-img" />
                    <div className="main-best-info">
                        <b className="main-best-info-type">게시판명길이최대로</b>
                        <div className="main-best-info-date">작성시간</div>
                    </div>
                    <div className="main-best-id">
                        <div className="main-best-info-type">ABCDEFGHIJ</div>
                    </div>
                    <b className="main-best-subject">제목 일이삼사오육칠팔구...</b>
                    <div className="main-best-content">
                        본문 일이삼사오육칠팔구십일이...
                    </div>
                    <div className="main-best-img" />
                    <div className="main-best-likes">
                        <div className="main-best-likes-text">99.9k</div>
                        <img
                            className="main-best-likes-icon"
                            alt=""
                            src="/main-best-likes-icon.svg"
                        />
                    </div>
                    <div className="main-best-coments">
                        <div className="main-best-likes-text">99.9k</div>
                        <img
                            className="main-best-coments-icon"
                            alt=""
                            src="/main-best-coments-icon.svg"
                        />
                    </div>
                    <div className="main-best-views">
                        <div className="main-best-views-text">99.9k</div>
                        <img
                            className="main-best-views-icon"
                            alt=""
                            src="/main-best-views-icon.svg"
                        />
                    </div>
                </div>
                <div className="main-more">
                    <div className="main-more-text">더보기</div>
                    <img className="main-more-icon" alt="" src="/main-more-icon.svg" />
                </div>
                <div className="main-advertise1">
                    <div className="main-advertise-box" />
                    <b className="main-advertise-text">광고2</b>
                </div>
                <div className="main-preview-name1">
                    <div className="main-preview-name-box" />
                    <b className="main-preview-name-text">자유게시판 (최신순)</b>
                </div>
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
                <div className="main-more1">
                    <div className="main-more-text">더보기</div>
                    <img className="main-more-icon" alt="" src="/main-more-icon1.svg" />
                </div>
                <div className="main-preview-name2">
                    <div className="main-preview-name-box" />
                    <b className="main-preview-name-text">질문게시판 (최신순)</b>
                </div>
                <div className="main-qna-preview">
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
                    <div className="main-freeboard-coments">
                        <div className="main-freeboard-likes-text">99.9k</div>
                        <img
                            className="main-freeboard-coments-icon"
                            alt=""
                            src="/main-qna-coments-icon.svg"
                        />
                    </div>
                    <img
                        className="main-freeboard-img-icon"
                        alt=""
                        src="/main-qna-img-icon.svg"
                    />
                </div>
                <div className="main-more2">
                    <div className="main-more-text">더보기</div>
                    <img className="main-more-icon" alt="" src="/main-more-icon2.svg" />
                </div>
                <div className="main-advertise2">
                    <div className="main-advertise-box" />
                    <b className="main-advertise-text">광고3</b>
                </div>
                <div className="main-preview-name3">
                    <div className="main-preview-name-box" />
                    <b className="main-preview-name-text">채용게시판 (최신순)</b>
                </div>
                <div className="main-hire-preview">
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
                            src="/main-hire-likes-icon.svg"
                        />
                    </div>
                    <div className="main-freeboard-coments">
                        <div className="main-freeboard-likes-text">99.9k</div>
                        <img
                            className="main-freeboard-coments-icon"
                            alt=""
                            src="/main-hire-coments-icon.svg"
                        />
                    </div>
                    <img
                        className="main-freeboard-img-icon"
                        alt=""
                        src="/main-hire-img-icon.svg"
                    />
                </div>
                <div className="main-more3">
                    <div className="main-more-text">더보기</div>
                    <img className="main-more-icon" alt="" src="/main-more-icon3.svg" />
                </div>
                <div className="main-preview-name4">
                    <div className="main-preview-name-box" />
                    <b className="main-preview-name-text">리뷰게시판 (최신순)</b>
                </div>
                <div className="main-review-preview">
                    <div className="main-best-box" />
                    <div className="main-best-profile-img" />
                    <div className="main-review-info">
                        <b className="main-best-info-type">코딩테스트 후기</b>
                        <div className="main-best-info-date">작성시간</div>
                    </div>
                    <b className="main-review-subject">회사명 일이삼사오육칠팔구</b>
                    <div className="main-review-content">
                        본문 일이삼사오육칠팔구십일이...
                    </div>
                    <div className="main-best-img" />
                    <div className="main-review-stars">
                        <img
                            className="main-review-stars-icon"
                            alt=""
                            src="/main-review-stars-icon.svg"
                        />
                        <div className="main-freeboard-likes-text">4.0</div>
                    </div>
                    <div className="main-review-id">
                        <div className="main-best-info-type">비트캠프701호</div>
                        <div className="main-freeboard-info-spacing" />
                        <div className="main-best-info-type">아이디명최대로</div>
                    </div>
                </div>
                <div className="main-more4">
                    <div className="main-more-text">더보기</div>
                    <img className="main-more-icon" alt="" src="/main-more-icon4.svg" />
                </div>
                <div className="main-advertise3">
                    <div className="main-advertise-box" />
                    <b className="main-advertise-text">광고4</b>
                </div>
            </div>
        </div>
    );
}

export default Main;