import React from 'react';
import './style/FboardDetail.css';

function FboardDetail(props) {
    return (
        <div className="fboard-detail">
            <div className="advertise-box">
                <div className="advertise-main" />
                <b className="advertise-text">광고</b>
            </div>
            {/*<img*/}
            {/*    className="board-detail-type-hr-icon"*/}
            {/*    alt=""*/}
            {/*    src={require("./assets/boarddetail/board_detail_type_hr.svg").default}*/}
            {/*/>*/}
            <div className="board-detail-type-text">자유게시판</div>
            <div className="notice-detail-info">
                <img
                    className="notice-detail-info-profile-img-icon"
                    alt=""
                    src={require("./assets/boarddetail/notice_detail_info_profile_img.png").default}
                />
                <div className="notice-detail-info-nickname">닉네임</div>
                <div className="notice-detail-info-status-text">
                    <span>{`  400 · `}</span>
                    <span className="span">{`수정됨 `}</span>
                </div>
                <div className="notice-detail-info-status-text1">{`2일 전 ·         `}</div>
                <img
                    className="notice-detail-info-status-view-icon"
                    alt=""
                    src={require("./assets/boarddetail/notice_detail_info_status_views.svg").default}
                />
            </div>

            <img className="fboard-url-icon" alt=""
                 src={require("./assets/boarddetail/notice_detail_header_function_url.svg").default}
            />
            <img
                className="fboard-update-icon"
                alt=""
                src={require("./assets/boarddetail/edit.svg").default}
            />
            <img
                className="fboard-delete-icon"
                alt=""
                src={require("./assets/boarddetail/trash.svg").default}
            />
            <div className="notice-detail-header-btn">
                <div className="notice-detail-header-btn-like">
                    <img
                        className="board-detail-header-btn-like-i-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_header_btn_like_icon.svg").default}
                    />
                    <div className="board-detail-header-btn-like-t">180</div>
                </div>
                <div className="notice-detail-header-btn-disli">
                    <img
                        className="board-detail-header-btn-dislik-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_header_btn_dislike_icon.svg").default}
                    />
                    <div className="board-detail-header-btn-like-t">20</div>
                </div>
            </div>
            <div className="board-detail-textarea">
                <div className="board-detail-textarea-contents">
                    <p className="p">
                        지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며,
                        법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 국회에 제출된
                        법률
                    </p>
                    <p className="p">&nbsp;</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">
                        안 기타의 의안은 회기중에 의결되지 못한 이유로 폐기되지 아니한다.
                        다만, 국회의원의 임기가 만료된 때에는 그러하지 아니하다. 사법권은
                        법관으로 구
                    </p>
                    <p className="p">&nbsp;</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">성된 법원에 속한다.</p>
                    <p className="p">헌법재판소에서 법률의 위헌결정</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">&nbsp;</p>
                    <p className="p">
                        , 탄핵의 결정, 정당해산의 결정 또는 헌법소원에 관한 인용결정을 할
                        때에는 재판관 6인 이상의 찬성이 있어야 한다. 탄핵결정은 공직으로부터
                        파면함에 그친다. 그러나, 이에 의하여 민사상이나 형사상의 책임이
                        면제되지는 아니한다. 국회의원의 수는 법률로 정하되, 200인 이상으로
                        한다.
                    </p>
                </div>
                <b className="board-detail-textarea-subject">
                    지방자치단체는 주민의 복리
                </b>
            </div>
            <div className="board-detail-counter">
                <div className="board-detail-counter-like">
                    <div className="board-detail-counter-like-box" />
                    <img
                        className="board-detail-counter-like-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_commnets_all_up.svg").default}
                    />
                </div>
                <div className="board-detail-counter-num">
                    <div className="board-detail-counter-num-box" />
                    <div className="board-detail-counter-num-text">565</div>
                </div>
                <div className="board-detail-counter-dislike">
                    <div className="board-detail-counter-dislike-b" />
                    <img
                        className="board-detail-counter-like-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_commnets_all_down.svg").default}
                    />
                </div>
            </div>
            <div className="advertise-box1">
                <div className="advertise-main" />
                <b className="advertise-text1">광고 2</b>
            </div>
            {/*<img className="board-detail-hr-icon" alt="" src="/board-detail-hr.svg" />*/}
            <div className="board-detail-comments-counts">nn개의 댓글</div>
            <div className="board-detail-commnets-form">
                <div className="board-detail-commnets-form-box" />
                <img
                    className="board-detail-commnets-form-img-icon"
                    alt=""
                    src={require("./assets/boarddetail/notice_detail_info_profile_img.png").default}
                />
                <div className="board-detail-commnets-form-tex" />
            </div>
            <div className="board-detail-commnets-submit-b">
                <div className="board-detail-commnets-form-sub" />
                <b className="board-detail-commnets-form-sub1">댓글 쓰기</b>
            </div>
            <div className="board-detail-commnets-detail-i">
                <div className="board-detail-recom-info-text">
                    <div className="board-detail-recom-info-counts">댓글 1</div>
                    <div className="board-detail-recom-info-date">
                        <span>{`약  6시간 전 · `}</span>
                        <span className="span">{`수정됨 `}</span>
                    </div>
                </div>
                <img
                    className="board-detail-commnets-detail-i-icon"
                    alt=""
                    src={require("./assets/boarddetail/notice_detail_info_profile_img.png").default}
                />
            </div>
            <div className="board-detail-commnets-all-like">
                <div className="board-detail-commnets-all-up">
                    <div className="board-detail-commnets-all-up-b" />
                    <img
                        className="board-detail-commnets-all-up-i-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_commnets_all_up.svg").default}
                    />
                </div>
                <div className="board-detail-recom-likes-count">
                    <div className="board-detail-commnets-all-box" />
                    <div className="board-detail-commnets-all-like2">27</div>
                </div>
                <div className="board-detail-commnets-all-down">
                    <div className="board-detail-recom-down-box" />
                    <img
                        className="board-detail-commnets-all-down-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_commnets_all_down.svg").default}
                    />
                </div>
            </div>
            <div className="board-detail-commnets-all-cont">
                <p className="p">
                    모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을
                    박탈당하지 아니한다. 공공필요에 의한 재산권의 수용·사용 또는
                </p>
                <p className="p">&nbsp;</p>
                <p className="p">
                    {" "}
                    제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다.
                </p>
                <p className="p">선거에 관한 경비는 법률이 정하는 경우를 제외하고</p>
                <p className="p">&nbsp;</p>
                <p className="p">&nbsp;</p>
                <p className="p">
                    는 정당 또는 후보자에게 부담시킬 수 없다. 행정각부의
                </p>
                <p className="p">&nbsp;</p>
                <p className="p">
                    {" "}
                    설치·조직과 직무범위는 법률로 정한다. 대통령은 국가의 원수이며, 외국에
                    대하여 국가를 대표한다.
                </p>
            </div>
            <div className="board-detail-commnets-hide">
                <img
                    className="board-detail-commnets-hide-ico-icon"
                    alt=""
                    src={require("./assets/boarddetail/board_detail_commnets_hide_icon.svg").default}
                />
                <div className="board-detail-commnets-hide-tex">댓글 모두 숨기기</div>
                <div className="board-detail-commnets-hide-com">댓글 쓰기</div>
            </div>
            <div className="board-detail-recom-box" />
            <div className="board-detail-recom-info">
                <div className="board-detail-recom-info-text">
                    <div className="board-detail-recom-info-counts">대댓글 1</div>
                    <div className="board-detail-recom-info-date">
                        <span>{`약  1시간 전 · `}</span>
                        <span className="span">{`수정됨 `}</span>
                    </div>
                </div>
                <img
                    className="board-detail-commnets-detail-i-icon"
                    alt=""
                    src={require("./assets/boarddetail/notice_detail_info_profile_img.png").default}
                />
            </div>
            <div className="board-detail-recom-likes">
                <div className="board-detail-commnets-all-up">
                    <div className="board-detail-commnets-all-up-b" />
                    <img
                        className="board-detail-commnets-all-up-i-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_commnets_all_up.svg").default}
                    />
                </div>
                <div className="board-detail-recom-likes-count">
                    <div className="board-detail-commnets-all-box" />
                    <div className="board-detail-commnets-all-like2">27</div>
                </div>
                <div className="board-detail-commnets-all-down">
                    <div className="board-detail-recom-down-box" />
                    <img
                        className="board-detail-commnets-all-down-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_commnets_all_down.svg").default}
                    />
                </div>
            </div>
            <div className="board-detail-recom-textarea">
                <p className="p">
                    모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을
                    박탈당하지 아니한다. 공공필요에 의한 재산권의 수용·사용 또는
                </p>
                <p className="p">&nbsp;</p>
                <p className="p">
                    {" "}
                    제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다.
                </p>
                <p className="p">선거에 관한 경비는 법률이 정하는 경우를</p>
            </div>
            <div className="board-detail-recom-recom-form">{`댓글 쓰기 `}</div>
        </div>
    );
}

export default FboardDetail;