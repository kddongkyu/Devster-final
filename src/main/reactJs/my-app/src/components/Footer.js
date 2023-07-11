import React from 'react';
import './style/Footer.css';

function Footer(props) {
    return (
        <div className="footer-box">
            <div className="line03"/>
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                }}
            >
                <div className="footer-logo">
                    <img
                        className="footer-logo-icon"
                        alt=""
                        src={require("../assets/footer-logo-icon.svg").default}
                    />
                    <div className="footer-logo-text">Devster</div>
                </div>
                <img
                    className="footer-icons"
                    alt=""
                    src={require("../assets/footer-icons.svg").default}
                />
            </div>
            <div className="footer-info-contact">
                <div className="footer-info-service-intro">사이트소개</div>
                <div className="footer-info-service-notice">공지사항</div>
                <div className="footer-info-service-contact">연락처</div>
                <div className="footer-info-service-adv">광고문의</div>
                <div className="footer-info-service-hire">채용</div>
            </div>
            <div className="footer-info-service">
                <div className="footer-info-service-personal">개인정보 처리방침</div>
                <div style={{display: "flex", gap: "1.2rem"}}>
                    <div className="footer-info-service-terms">서비스 이용약관</div>
                    <img
                        className="footer-info-service-bar-icon"
                        alt=""
                        src={require("../assets/footer-info-service-bar.svg").default}
                    />
                    <div className="footer-info-service-report">버그제보</div>
                </div>
            </div>
            <div className="footer-comp-info">
                <p className="devster-kdk">
          <span>
            <span className="span">{`상호명 : `}</span>
            <span className="devster">Devster</span>
          </span>
                    <span>
            <span> | 대표명 : KDK</span>
          </span>
                </p>
                <p className="devster-kdk">
          <span>
            <span>사업자등록번호 : 111-22-3333333</span>
          </span>
                </p>
                <p className="devster-kdk">
          <span>
            <span>통신판매업신고번호 : 제 2022-비트캠프</span>
          </span>
                </p>
                <p className="devster-kdk">
          <span>
            <span>{`직업정보 제공사업 신고번호 : J123435549 `}</span>
          </span>
                </p>
                <p className="devster-kdk">
          <span>
            <span>&nbsp;</span>
          </span>
                </p>
                <p className="p2">
          <span>
            <span>주소 : 서울 강남구 비트캠프 7층</span>
          </span>
                </p>
                <p className="devster-kdk">
          <span>
            <span>문의 : 김동규씨에게로</span>
          </span>
                </p>
                <p className="devster-kdk">
          <span>
            <span>&nbsp;</span>
          </span>
                </p>
                <p className="devster-kdk">
          <span>
            <span>@2023 ~~~~~~~~~~</span>
          </span>
                </p>
            </div>
        </div>

    );
}

export default Footer;