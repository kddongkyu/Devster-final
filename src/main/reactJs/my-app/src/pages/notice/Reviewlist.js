import React from 'react';
import './style/Reviewlist.css';

function Reviewlist(props) {
    return (
        <div className="notice-list">
            <div className="notice-advertise-box">
                <div className="notice-advertise-main" />
                <b className="notice-advertise-text">광고</b>
            </div>
            <div className="notice-header">
                <div className="main-best" />
                <b className="notice-header-text">공지사항</b>
            </div>
            <div className="notice-option">
                <div className="notice-option-box" />
                <img className="notice-option-child" alt=""
                     src={require('./assets/Vector 176.svg').default}/>
                <div className="notice-list-all">전체</div>
                <img className="notice-list-icon" alt=""
                     src={require('./assets/notice-list-icon.svg').default}/>
            </div>
            <div className="notice-list-write">
                <button className="notice-list-write-box" >
                    <img
                        className="notice-list-write-icon"
                        alt=""
                        src={require('./assets/notice-list-write_icon.svg').default}
                    />  글 쓰기
                </button>
                {/*<div className="notice-list-write-text">글쓰기</div>*/}
            </div>
            <div className="notice-function-search-input">
                <div className="notice-function-search-input1" />
                <img
                    className="notice-function-search-icon"
                    alt=""
                    src={require('./assets/notice_function_search_icon.svg').default}
                />
            </div>
            <div className="notice-list-pages">
                <div className="notice-list-pages-current">12345 / 12345 페이지</div>
                <img
                    className="notice-list-pages-back-icon"
                    alt=""
                    src={require('./assets/notice-list-_pages_back.svg').default}
                />
                <img
                    className="notice-list-pages-forward-icon"
                    alt=""
                    src={require('./assets/notice-list-pages_forward.svg').default}
                />
            </div>
            <img
                className="notice-list-pages-reset-icon"
                alt=""
                src={require('./assets/notice-list-_pages_reset.svg').default}
            />
            <div className="notice-list-line" />
            <div className="notice-list1">
                {/*<img className="notice-list-child" alt=""*/}
                {/*     src="/vector-179.svg" />*/}
                <div className="notice-list-writer">
                    <img
                        className="notice-list-logo-icon"
                        alt=""
                        src={require('./assets/notice-list-logo.svg').default}
                    />
                    <div className="notice-list-writer-time">admin_01 · 약 4시간 전</div>
                </div>
                <div className="notice-list-tag">#공지사항 # Devster</div>
                <b className="notice-list-subject">DEVSTER 공지사항</b>
                <div className="notice-list-icons">
                    <div className="notice-list-like">
                        <div className="notice-list-like-text">9</div>
                        <img
                            className="notice-list-like-icon"
                            alt=""
                            src={require('./assets/notice-list-like-icon.svg').default}
                        />
                    </div>
                    <div className="notice-comments">
                        <div className="notice-comments-count">99</div>
                        <img
                            className="notice-comments-icon"
                            alt=""
                            src={require('./assets/notice-comments-icon.svg').default}
                        />
                    </div>
                    <div className="notice-list-readcount">
                        <div className="notice-list-readcount-text">800</div>
                        <img
                            className="notice-list-readcount-icon"
                            alt=""
                            src={require('./assets/notice-list-readcount-icon.svg').default}
                        />
                    </div>
                </div>
                <div className="notice-list-text-box" />
                <div className="notice-list-text">공지사항</div>
            </div>
        </div>
    );
}

export default Reviewlist;