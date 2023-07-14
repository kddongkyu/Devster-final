import React from 'react';
import './style/Reviewlist.css';
function Reviewlist(props) {
    return (
        <div className="review">
            <div className="review-advertise">
                <div className="review-advertise-main" />
                <b className="review-advertise-text">광고</b>
            </div>
            <div className="review-name">
                <div className="review-name-rec" />
                <div className="review-name-text">
                    <b className="goat">Review</b>
                    <div className="div">코딩테스트 / 면접 / 합격 후기 게시판</div>
                </div>
            </div>
            <div className="review-headerbar">
                <button className="review-headerbar-btn">
                    <div className="review-headerbar-rec" />
                    <div className="div1">{`후기작성 `}</div>
                    <img
                        className="review-headerbar-btn-icon"
                        src={require('./assets/review_headerbar_btn_icon.svg').default}
                    />
                </button>
                <div className="review-headerbar-function">
                    <div className="review-headerbar-function-sort">
                        <div className="review-headerbar-function-sort1" />
                        <img
                            className="review-headerbar-function-sort-child"
                            alt=""
                            src={require('./assets/Vector 176.svg').default}
                        />
                        <div className="div2">전체</div>
                        <img
                            className="review-headerbar-function-sort-icon"
                            src={require('./assets/review_headerbar_function_sort_icon.svg').default}
                        />
                    </div>
                </div>
            </div>
            <div className="review-function-search-input">
                <div className="review-function-search-input1" />
                <img
                    className="review-function-search-icon"
                    src={require('./assets/review-function_search_icon.svg').default}
                />
            </div>
            <div className="review-pages">

                <img className="review-pages-child" alt=""
                     src="/vector-175.svg" />
                <img className="review-pages-item" alt="" src="/vector-1761.svg" />
                <img
                    className="review-pages-reload-icon"
                    alt=""
                    src="/review-pages-reload-icon.svg"
                />
                <div className="review-pages-paging">
                    <div className="div3">1 / 12345 페이지</div>
                    <img
                        className="review-pages-paging-backwardic-icon"
                        alt=""
                        src="/review-pages-paging-backwardicon.svg"
                    />
                    <img
                        className="review-pages-paging-forwardico-icon"
                        alt=""
                        src="/review-pages-paging-forwardicon.svg"
                    />
                </div>
            </div>
            <div className="review-list">
                <div className="review-list-box">
                    <img className="review-list-box-child" alt="" src="/vector-179.svg" />
                    <div className="review-list-box-rec" />
                    <img
                        className="review-list-box-img-icon"
                        alt=""
                        src="/review-list-box-img@2x.png"
                    />
                    <div className="div4">
                        <p className="p">{`▶ 지원 시기 : `}</p>
                        <p className="p">{`▶ 지원 회사와 부서 : `}</p>
                        <p className="p">{`▶ 나의 합격 스펙 : `}</p>
                        <p className="p">▶ 면접 일자 :</p>
                        <p className="p4">{`▶ 면접 형태 :  `}</p>
                    </div>
                    <div className="review-list-box-title">
                        <div className="review-list-box-title-user">
                            <img className="logo-icon" alt="" src="/logo.svg" />
                            <div className="user-01234">User_01234 · 약 4시간 전</div>
                        </div>
                        <div className="div5">
                            <p className="p4">{`리뷰 종류 : 면접 `}</p>
                        </div>
                        <b className="b">삼성전자</b>
                    </div>
                    <div className="review-list-box-star">
                        <div className="div6">3.0</div>
                        <img
                            className="review-list-box-star-icons"
                            alt=""
                            src="/review-list-box-star-icons.svg"
                        />
                    </div>
                    <div className="review-list-box-header">
                        <div className="review-list-box-header-likes">
                            <div className="review-list-box-header-likes-t">9</div>
                            <img
                                className="review-list-box-header-likes-i-icon"
                                alt=""
                                src="/review-list-box-header-likes-icon.svg"
                            />
                        </div>
                        <div className="review-list-box-header-comment">
                            <div className="review-list-box-header-views-t">99</div>
                            <img
                                className="review-list-box-header-comment-icon"
                                alt=""
                                src="/review-list-box-header-comments-icon.svg"
                            />
                        </div>
                        <div className="review-list-box-header-views">
                            <div className="review-list-box-header-views-t">800</div>
                            <img
                                className="review-list-box-header-views-i-icon"
                                alt=""
                                src="/review-list-box-header-views-icon.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reviewlist;