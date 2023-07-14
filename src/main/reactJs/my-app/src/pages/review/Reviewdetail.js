import React from 'react';
import './style/Reviewdetail.css';
function Reviewdetail(props) {
    return (
        <div className="review-detail">
            <div className="advertise-box">
                <div className="advertise-main" />
                <b className="advertise-text">광고</b>
            </div>
            <div className="review-detail-comp">
                <div className="review-detail-comp-box" />
                <div className="review-detail-comp-info">
                    <img
                        className="review-detail-comp-info-img-icon"
                        alt=""
                        src={require('./assets/review_detail_commnets_detail_info_img.png').default}
                    />
                    <b className="b">삼성전자</b>
                    <img
                        className="review-detail-comp-info-stars-icon"
                        alt=""
                        src={require('./assets/review_detail_comp_info_stars.svg').default}
                    />
                </div>
                <div className="review-detail-comp-info-text">
                    <ul className="ul">
                        <li className="li">사원수 : 6명</li>
                        <li className="li">매출액 : 10원</li>
                        <li>평균연봉 : 5,000$</li>
                    </ul>
                </div>
            </div>
            <div className="review-detail-header">
                <div className="review-detail-info">
                    <img
                        className="review-detail-info-profile-img-icon"
                        alt=""
                        src={require('./assets/review_detail_info_profile_img.png').default}
                    />
                    <div className="review-detail-info-nickname">닉네임</div>
                    <div className="review-detail-info-status">
                        <div className="review-detail-info-status-text">{`2일 전 ·        `}</div>
                        <img
                            className="review-detail-info-status-view-icon"
                            alt=""
                            src={require('./assets/review_detail_info_status_views.svg').default}
                        />
                        <div className="review-detail-info-status-text1">
                            <span>{` 400 · `}</span>
                            <span className="span">{`수정됨 `}</span>
                        </div>
                    </div>
                </div>
                <img
                    className="review-detail-header-function-icon"
                    src={require('./assets/review_detail_header_function.svg').default}
                />
            </div>
            <div className="review-detail-body">
                <div className="review-detail-body-text">
                    <p className="p">{`▶ 별점 : 4.0 `}</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">{`▶ 지원 시기 : `}</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">{`▶ 지원 회사와 부서 : `}</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">{`▶ 나의 합격 스펙 : `}</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">▶ 면접 일자 :</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">{`▶ 면접 형태 :  `}</p>
                </div>
                <b className="review-detail-body-subject">삼성전자 합격 후기</b>
            </div>
            <div className="review-detail-counter">
                <div className="review-detail-counter-like">
                    <div className="review-detail-counter-like-box" />
                    <img
                        className="review-detail-counter-like-ico-icon"
                        alt=""
                        src={require('./assets/review_detail_counter_like_icon.svg').default}
                    />
                </div>
                <div className="review-detail-counter-num">
                    <div className="review-detail-counter-num-box" />
                    <div className="review-detail-counter-num-text">565</div>
                </div>
                <div className="review-detail-counter-dislike">
                    <div className="review-detail-counter-dislike-" />
                    <img
                        className="review-detail-counter-like-ico-icon"
                        alt=""
                        src={require('./assets/review_detail_counter_dislike_icon.svg').default}
                    />
                </div>
            </div>
            <div className="advertise-box1">
                <div className="advertise-main" />
                <b className="advertise-text1">광고 2</b>
            </div>
            <img
                className="review-detail-hr-icon"
                alt=""
                src="/review-detail-hr.svg"
            />
            <div className="review-detail-comments-counts">nn개의 댓글</div>
            <div className="review-detail-commnets-form">
                <div className="review-detail-commnets-form-bo" />
                <img
                    className="review-detail-commnets-form-im-icon"
                    alt=""
                    src="/review-detail-commnets-form-img@2x.png"
                />
                <div className="review-detail-commnets-form-te" />
                <div className="review-detail-commnets-form-su">
                    <div className="review-detail-commnets-form-su1" />
                    <b className="review-detail-commnets-form-su2">댓글 쓰기</b>
                </div>
            </div>
            <div className="review-detail-commnets">
                <div className="review-detail-comments-all">
                    <div className="review-detail-commnets-detail-">
                        <div className="review-detail-recom-info-text">
                            <div className="review-detail-recom-info-count">댓글 1</div>
                            <div className="review-detail-recom-info-date">
                                <span>{`약  6시간 전 · `}</span>
                                <span className="span">{`수정됨 `}</span>
                            </div>
                        </div>
                        <img
                            className="review-detail-commnets-detail-icon"
                            alt=""
                            src="/review-detail-commnets-detail-info-img@2x.png"
                        />
                    </div>
                    <div className="review-detail-commnets-all-lik">
                        <div className="review-detail-commnets-all-up">
                            <div className="review-detail-commnets-all-up-" />
                            <img
                                className="review-detail-commnets-all-up-icon"
                                alt=""
                                src="/review-detail-commnets-all-up-icon.svg"
                            />
                        </div>
                        <div className="review-detail-recom-likes-coun">
                            <div className="review-detail-commnets-all-box" />
                            <div className="review-detail-commnets-all-lik2">27</div>
                        </div>
                        <div className="review-detail-commnets-all-dow">
                            <div className="review-detail-recom-down-box" />
                            <img
                                className="review-detail-commnets-all-dow-icon"
                                alt=""
                                src="/review-detail-commnets-all-down-icon.svg"
                            />
                        </div>
                    </div>
                    <div className="review-detail-commnets-all-con">
                        <p className="p">
                            모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을
                            박탈당하지 아니한다. 공공필요에 의한 재산권의 수용·사용 또는
                        </p>
                        <p className="p">&nbsp;</p>
                        <p className="p">
                            {" "}
                            제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야
                            한다.
                        </p>
                        <p className="p">
                            선거에 관한 경비는 법률이 정하는 경우를 제외하고
                        </p>
                        <p className="p">&nbsp;</p>
                        <p className="p">&nbsp;</p>
                        <p className="p">
                            는 정당 또는 후보자에게 부담시킬 수 없다. 행정각부의
                        </p>
                        <p className="p">&nbsp;</p>
                        <p className="p">
                            {" "}
                            설치·조직과 직무범위는 법률로 정한다. 대통령은 국가의 원수이며,
                            외국에 대하여 국가를 대표한다.
                        </p>
                    </div>
                </div>
                <div className="review-detail-commnets-hide">
                    <img
                        className="review-detail-commnets-hide-ic-icon"
                        alt=""
                        src="/review-detail-commnets-hide-icon.svg"
                    />
                    <div className="review-detail-commnets-hide-te">댓글 모두 숨기기</div>
                    <div className="review-detail-commnets-hide-co">댓글 쓰기</div>
                </div>
            </div>
            <div className="review-detail-recom">
                <div className="review-detail-recom-box" />
                <div className="review-detail-recom-info">
                    <div className="review-detail-recom-info-text">
                        <div className="review-detail-recom-info-count">대댓글 1</div>
                        <div className="review-detail-recom-info-date">
                            <span>{`약  1시간 전 · `}</span>
                            <span className="span">{`수정됨 `}</span>
                        </div>
                    </div>
                    <img
                        className="review-detail-commnets-detail-icon"
                        alt=""
                        src="/review-detail-recom-info-img@2x.png"
                    />
                </div>
                <div className="review-detail-recom-likes">
                    <div className="review-detail-commnets-all-up">
                        <div className="review-detail-commnets-all-up-" />
                        <img
                            className="review-detail-commnets-all-up-icon"
                            alt=""
                            src="/review-detail-recom-up-icon.svg"
                        />
                    </div>
                    <div className="review-detail-recom-likes-coun">
                        <div className="review-detail-commnets-all-box" />
                        <div className="review-detail-commnets-all-lik2">27</div>
                    </div>
                    <div className="review-detail-commnets-all-dow">
                        <div className="review-detail-recom-down-box" />
                        <img
                            className="review-detail-commnets-all-dow-icon"
                            alt=""
                            src="/review-detail-recom-down-icon.svg"
                        />
                    </div>
                </div>
                <div className="review-detail-recom-textarea">
                    <p className="p">
                        모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을
                        박탈당하지 아니한다. 공공필요에 의한 재산권의 수용·사용 또는
                    </p>
                    <p className="p">&nbsp;</p>
                    <p className="p">
                        {" "}
                        제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야
                        한다.
                    </p>
                    <p className="p">선거에 관한 경비는 법률이 정하는 경우를</p>
                </div>
                <div className="review-detail-recom-recom-form">{`댓글 쓰기 `}</div>
            </div>
            <div className="review-line-box" />
            <div className="review-detail-headline">
                <div className="review-detail-headline-box" />
                <div className="review-detail-headline-text">리뷰게시판</div>
            </div>
        </div>
    );
}

export default Reviewdetail;