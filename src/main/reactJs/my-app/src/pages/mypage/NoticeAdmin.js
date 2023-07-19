import React from "react";

function NoticeAdmin(props) {
  return (
    <div className="notice">
      <div className="notice-content-box-admin">
        <div className="notice-header">
          <div className="notice-header-box" />
          <b className="text-content-notice">공지사항</b>
        </div>
        <div className="notice-options">
          <div className="search-icon-box" />
          <img
            className="icon-search-notice"
            alt=""
            // src="/icon-search-notice.svg"
            src={require("./assets/icon_search_notice.svg").default}
          />
          <img
            className="notice-cotent-shape-icon"
            alt=""
            src={require("./assets/notice_cotent_shape.svg").default}
          />
          <div className="text-all-notice">전체</div>
          <img
            className="icon-notice-list"
            alt=""
            // src="/icon-notice-list.svg"
            src={require("./assets/icon_notice_list.svg").default}
          />
        </div>
        <div className="content-notice">
          <div className="notice-content-box1" />
          <div className="notice-content-text-01">
            <img
              className="logo-content-notice-icon"
              alt=""
              //   src="/logo-content-notice.svg"
              src={require("./assets/logo_content_notice.svg").default}
            />
            <div className="text-notice-write-time">admin_01 · 약 4시간 전</div>
          </div>
          <b className="notice-content-title">DEVSTER 공지사항</b>
          <div className="notice-content-badge" />
          <div className="notice-content-hashtag">#공지사항 # Devster</div>
          <div className="content-notice-utils">
            <div className="content-notice-likes">
              <div className="number-likes">9</div>
              <img
                className="likes-icon"
                alt=""
                src={require("./assets/likes.svg").default}
              />
            </div>
            <div className="content-notice-commentcount">
              <div className="number-commentcount">99</div>
              <img
                className="coments-icon"
                alt=""
                src={require("./assets/coments.svg").default}
              />
            </div>
            <div className="content-notice-viewcount">
              <div className="number-viewcount">800</div>
              <img
                className="icon-view"
                alt=""
                //src="/icon-view.svg"
                src={require("./assets/icon_view.svg").default}
              />
            </div>
          </div>
          <div className="text-notice-content-badge">공지사항</div>
        </div>
      </div>
    </div>
  );
}

export default NoticeAdmin;
