import "./style/NotFound.css";
import {NavLink} from "react-router-dom";

const NotFound = () => {


    const handleGoBack = () => {
        window.history.back();
    };


    return (
        <div className="notfound">
            <img className="page-404-logo-icon" alt=""
                 src={require("../assets/logo_404.svg").default}/>
            <div className="page-404-test">
                <p className="p">죄송합니다. 페이지를 찾을 수 없습니다.</p>
                <p className="p">&nbsp;</p>
                <p className="blank-line1">&nbsp;</p>
                <p className="blank-line1">존재하지 않는 주소를 입력하셨거나</p>
                <p className="blank-line1">요청하신 페이지의 주소가 변경, 삭제되어</p>
                <p className="blank-line1">찾을 수 없습니다.</p>
            </div>

            <div className="page-404-back" onClick={handleGoBack} style={{cursor: "pointer"}}>
                <div className="page-404-back-rec"/>
                <div className="page-404-back-text">이전 페이지로</div>
            </div>
            <NavLink to={'/'}>
                <div className="page-404-home">
                    <div className="page-404-home-rec"/>
                    <div className="page-404-home-text">홈으로</div>
                </div>
            </NavLink>
        </div>
    );
};

export default NotFound;
