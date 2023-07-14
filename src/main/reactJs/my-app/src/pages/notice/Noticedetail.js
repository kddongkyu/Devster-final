import React from 'react';
import './style/Noticedetail.css';
function Noticedetail(props) {
    return (
        <div className="notice-detail">
            <div className="advertise-box">
                <div className="advertise-main" />
                <b className="advertise-text">광고</b>
            </div>
            <div className="notice-line-box" />
            <div className="notice-detail-headline">
                <div className="notice-detail-headline-box" />
                <div className="notice-detail-headline-text">공지사항</div>
            </div>
            <div className="notice-detail-info">
                <img
                    className="notice-detail-info-profile-img-icon"
                    alt=""
                    src={require('./assets/notice_detail_info_profile_img.png').default}
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
                    src={require('./assets/notice_detail_info_status_views.svg').default}

                />
            </div>
            <div className="notice-detail-header-btn">
                <div className="notice-detail-header-btn-like">
                    <img
                        className="board-detail-header-btn-like-i-icon"
                        alt=""
                        src={require('./assets/board_detail_header_btn_like_icon.svg').default}
                    />
                    <div className="board-detail-header-btn-like-t">180</div>
                </div>
                <div className="notice-detail-header-btn-disli">
                    <img
                        className="board-detail-header-btn-dislik-icon"
                        alt=""
                        src={require('./assets/board_detail_header_btn_dislike_icon.svg').default}
                    />
                    <div className="board-detail-header-btn-like-t">20</div>
                </div>
            </div>
            <div className="notice-detail-box">
                <div className="notice-detail-content">
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
                <b className="notice-detail-subject">지방자치단체는 주민의 복리</b>
            </div>
            <div className="notice-like">
                <div className="notice-like-countbox">
                    <div className="notice-like-countbox-child">555 </div>
                </div>
                <div className="notice-like-count">
                    <div className="notice-like-count">
                        <div className="rectangle-wrapper">
                            <div className="group-child" />
                        </div>
                        <div className="rectangle-container">
                            <div className="group-item" />
                        </div>
                    </div>
                </div>
                <img className="notice-like-icon" alt=""
                     src={require('./assets/notice-like-icon.svg').default}/>
                <img
                    className="notice-dislike-icon"
                    alt=""
                    src={require('./assets/notice-dislike-icon.svg').default}
                />
            </div>
            <div className="advertise-box1">
                <div className="advertise-main" />
                <b className="advertise-text1">광고 2</b>
            </div>
        </div>
    );
}

export default Noticedetail;