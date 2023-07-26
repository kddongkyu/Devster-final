import React, {useCallback, useEffect, useState} from 'react';
import './style/QboardDetail.css';
import axiosIns from "../../api/JwtConfig";
import {useNavigate, useParams} from "react-router-dom";
import {checkToken} from "../../api/checkToken";
import ToastAlert from "../../api/ToastAlert";
import {useSnackbar} from "notistack";


function QboardDetail(props) {

    useEffect(()=> {
        getDetailData();
    },[])

    //에러 호출용 변수
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    //디코딩 함수
    const de = checkToken();

    const [qboardData, setQboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { qb_idx, currentPage } = useParams();
    const [arrayFromString, setArrayFromString] = useState([]);
    const [m_photo, setM_photo] = useState(null);
    const [m_nickname, setM_nickname] = useState(null);

    const navi = useNavigate();
    const photoUrl = process.env.REACT_APP_PHOTO+"qboard/";


    const getDetailData = () =>{
        axiosIns.get(`/api/qboard/D0/${qb_idx}`)
            .then(response => {
                console.log(response.data.qboardDto);
                setQboardData(response.data.qboardDto);
                setM_photo(response.data.photo);
                setM_nickname(response.data.nickname);
                if(qboardData && qboardData.qb_photo!=null){
                    setArrayFromString(qboardData.qb_photo.split(","));
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching qboard:', error);
            });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const deleteQboard = (qb_idx) => {
            if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
                axiosIns.delete(`/api/qboard/D1/${qb_idx}`)
                    .then(response => {
                        console.log('Qboard deleted successfully');
                        window.location.href="/qboard";
                    })
                    .catch(error => {
                        console.error('Error deleting qboard:', error);
                    });
            }
        };

    const qboardNavigation = () => {
        const url = "/qboard";
        window.location.href = url;
    };

    // const navigateToPurchase = useCallback(() => {
    //     const updateFormUrl = `/qboard/updateform/${qb_idx}/${currentPage}`;
    //     navi(updateFormUrl, {state: qboardData}); // fboardData를 state로 전달
    // }, [qb_idx, currentPage, qboardData, navi]);

    const handleNicknameClick = () => {
        // recv_nick은 이 컴포넌트에서 사용할 수 있는 형태로 가져옵니다.
        const recv_nick = m_nickname;
        navi(`/message/form/${recv_nick}`);
    };


    const timeForToday = (value) => {
        if (!value) {
            return '';
        }

        const valueConv = value.slice(0, -10);
        const today = new Date();
        const timeValue = new Date(valueConv);

        // timeValue를 한국 시간대로 변환
        const timeValueUTC = new Date(timeValue.toISOString());
        const offset = timeValue.getTimezoneOffset() * 60 * 1000; // 분 단위를 밀리초 단위로 변환
        const timeValueKST = new Date(timeValueUTC.getTime() - offset);


        const betweenTime = Math.floor((today.getTime() - timeValueKST.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금 전';
        if (betweenTime < 60) {
            return `${betweenTime}분 전`;
        }
        console.log(betweenTime);

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간 전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 8) {
            return `${betweenTimeDay}일 전`;
        }

        const year = String(timeValue.getFullYear()).slice(0, 4);
        const month = String(timeValue.getMonth() + 1).padStart(2, '0');
        const day = String(timeValue.getDate()).padStart(2, '0');

        const formattedDateWithoutTime = `${year}-${month}-${day}`;

        return formattedDateWithoutTime;
    };

    return (
        <div className="qboard-detail">
            <div className="qboard-advertise-box">
                <div className="qboard-advertise-main" />
                <b className="qboard-advertise-text">광고</b>
            </div>

            <div className="qboard-detail-type-text">Q&A 게시판</div>
            <div className="qboard-detail-info">
                <img
                    className="qboard-detail-info-profile-img-icon"
                    alt=""
                    src={m_photo}
                    onClick={handleNicknameClick}
                />
                <div className="qboard-detail-info-nickname" onClick={handleNicknameClick}>{m_nickname}</div>
                <div className="qboard-detail-info-status-text">
                    <span>{qboardData.qb_readcount}</span>
                </div>
                <div className="qboard-detail-info-status-text1">{timeForToday(qboardData.qb_writeday)}</div>
                <img
                    className="qboard-detail-info-status-view-icon"
                    alt=""
                    src={require("./assets/boarddetail/notice_detail_info_status_views.svg").default}
                />
            </div>

            <img className="qboard-url-icon" alt=""
                 src={require("./assets/boarddetail/notice_detail_header_function_url.svg").default}
            />

            { de && de.idx === qboardData.m_idx && (
                <>
                    <img
                        className="qboard-update-icon"
                        alt=""
                        src={require("./assets/boarddetail/edit.svg").default}
                        // onClick={navigateToPurchase}
                    />
                    <img
                        className="qboard-delete-icon"
                        alt=""
                        src={require("./assets/boarddetail/trash.svg").default}
                        onClick={() => deleteQboard(qb_idx)}
                    />
                </>
            )}

            <div className="qboard-detail-textarea">
                <div className="qboard-detail-textarea-subject">
                    {qboardData.qb_subject}
                </div>

                <div className="qboard-detail-textarea-contents">
                   <pre style={{marginBottom:"5rem"}}>
                       {qboardData.qb_content}
                   </pre>
                </div>

                <div className="qboard-detail-photo-list">
                    {arrayFromString.map((imageId, index) => (
                        <div>
                            <img
                                className="qboard-detail-photo" key={index}
                                src={`${photoUrl}${imageId}`}
                                alt={`Image ${index}`}
                            />
                        </div>
                    ))}

                    {/* 여기서부터 밑으로 정렬 */}
                    <div className="qboard-detail-listbackcounter">
                        <div className="qboard-detail-listback" onClick={qboardNavigation}>
                            <div className="qboard-detail-listback-rec" />
                            <div className="qboard-detail-listback-text">목록</div>
                            <img
                                className="qboard-detail-listback-icon"
                                alt=""
                                src={require("./assets/boarddetail/board_detail_listback_icon.svg").default}
                            />
                        </div>
                    </div>
                    <div className="qboard-advertise-box2">
                        <div className="qboard-advertise-main" />
                        <b className="qboard-advertise-text1">광고 2</b>
                    </div>
                </div>
            </div>

            {/*<div className="qboard-detail-comments-counts">nn개의 댓글</div>*/}
            {/*<div className="qboard-detail-commnets-form">*/}
            {/*    <div className="qboard-detail-commnets-form-box" />*/}
            {/*    <img*/}
            {/*        className="qboard-detail-commnets-form-img-icon"*/}
            {/*        alt=""*/}
            {/*        src={require("./assets/boarddetail/notice_detail_info_profile_img.png").default}*/}
            {/*    />*/}
            {/*    <div className="qboard-detail-commnets-form-tex" />*/}
            {/*</div>*/}
            {/*<div className="qboard-detail-commnets-submit-b">*/}
            {/*    <div className="qboard-detail-commnets-form-sub" />*/}
            {/*    <b className="qboard-detail-commnets-form-sub1">댓글 쓰기</b>*/}
            {/*</div>*/}
            {/*<div className="qboard-detail-commnets-detail-i">*/}
            {/*    <div className="qboard-detail-recom-info-text">*/}
            {/*        <div className="qboard-detail-recom-info-counts">댓글 1</div>*/}
            {/*        <div className="qboard-detail-recom-info-date">*/}
            {/*            <span>{`약  6시간 전 · `}</span>*/}
            {/*            <span className="span">{`수정됨 `}</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <img*/}
            {/*        className="qboard-detail-commnets-detail-i-icon"*/}
            {/*        alt=""*/}
            {/*        src={require("./assets/boarddetail/notice_detail_info_profile_img.png").default}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div className="qboard-detail-commnets-all-like">*/}
            {/*    <div className="qboard-detail-commnets-all-up">*/}
            {/*        <div className="qboard-detail-commnets-all-up-b" />*/}
            {/*        <img*/}
            {/*            className="qboard-detail-commnets-all-up-i-icon"*/}
            {/*            alt=""*/}
            {/*            src={require("./assets/boarddetail/board_detail_commnets_all_up.svg").default}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="qboard-detail-recom-likes-count">*/}
            {/*        <div className="qboard-detail-commnets-all-box" />*/}
            {/*        <div className="qboard-detail-commnets-all-like2">27</div>*/}
            {/*    </div>*/}
            {/*    <div className="qboard-detail-commnets-all-down">*/}
            {/*        <div className="qboard-detail-recom-down-box" />*/}
            {/*        <img*/}
            {/*            className="qboard-detail-commnets-all-down-icon"*/}
            {/*            alt=""*/}
            {/*            src={require("./assets/boarddetail/board_detail_commnets_all_down.svg").default}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="qboard-detail-commnets-all-cont">*/}
            {/*    <p className="p">*/}
            {/*        모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을*/}
            {/*        박탈당하지 아니한다. 공공필요에 의한 재산권의 수용·사용 또는*/}
            {/*    </p>*/}
            {/*    <p className="p">&nbsp;</p>*/}
            {/*    <p className="p">*/}
            {/*        {" "}*/}
            {/*        제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다.*/}
            {/*    </p>*/}
            {/*    <p className="p">선거에 관한 경비는 법률이 정하는 경우를 제외하고</p>*/}
            {/*    <p className="p">&nbsp;</p>*/}
            {/*    <p className="p">&nbsp;</p>*/}
            {/*    <p className="p">*/}
            {/*        는 정당 또는 후보자에게 부담시킬 수 없다. 행정각부의*/}
            {/*    </p>*/}
            {/*    <p className="p">&nbsp;</p>*/}
            {/*    <p className="p">*/}
            {/*        {" "}*/}
            {/*        설치·조직과 직무범위는 법률로 정한다. 대통령은 국가의 원수이며, 외국에*/}
            {/*        대하여 국가를 대표한다.*/}
            {/*    </p>*/}
            {/*</div>*/}
            {/*<div className="qboard-detail-commnets-hide">*/}
            {/*    <img*/}
            {/*        className="qboard-detail-commnets-hide-ico-icon"*/}
            {/*        alt=""*/}
            {/*        src={require("./assets/boarddetail/board_detail_commnets_hide_icon.svg").default}*/}
            {/*    />*/}
            {/*    <div className="qboard-detail-commnets-hide-tex">댓글 모두 숨기기</div>*/}
            {/*    <div className="qboard-detail-commnets-hide-com">댓글 쓰기</div>*/}
            {/*</div>*/}
            {/*<div className="qboard-detail-recom-box" />*/}
            {/*<div className="qboard-detail-recom-info">*/}
            {/*    <div className="qboard-detail-recom-info-text">*/}
            {/*        <div className="qboard-detail-recom-info-counts">대댓글 1</div>*/}
            {/*        <div className="qboard-detail-recom-info-date">*/}
            {/*            <span>{`약  1시간 전 · `}</span>*/}
            {/*            <span className="span">{`수정됨 `}</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <img*/}
            {/*        className="qboard-detail-commnets-detail-i-icon"*/}
            {/*        alt=""*/}
            {/*        src={require("./assets/boarddetail/notice_detail_info_profile_img.png").default}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div className="qboard-detail-recom-likes">*/}
            {/*    <div className="qboard-detail-commnets-all-up">*/}
            {/*        <div className="qboard-detail-commnets-all-up-b" />*/}
            {/*        <img*/}
            {/*            className="qboard-detail-commnets-all-up-i-icon"*/}
            {/*            alt=""*/}
            {/*            src={require("./assets/boarddetail/board_detail_commnets_all_up.svg").default}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*    <div className="qboard-detail-recom-likes-count">*/}
            {/*        <div className="qboard-detail-commnets-all-box" />*/}
            {/*        <div className="qboard-detail-commnets-all-like2">27</div>*/}
            {/*    </div>*/}
            {/*    <div className="qboard-detail-commnets-all-down">*/}
            {/*        <div className="qboard-detail-recom-down-box" />*/}
            {/*        <img*/}
            {/*            className="qboard-detail-commnets-all-down-icon"*/}
            {/*            alt=""*/}
            {/*            src={require("./assets/boarddetail/board_detail_commnets_all_down.svg").default}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="qboard-detail-recom-textarea">*/}
            {/*    <p className="p">*/}
            {/*        모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을*/}
            {/*        박탈당하지 아니한다. 공공필요에 의한 재산권의 수용·사용 또는*/}
            {/*    </p>*/}
            {/*    <p className="p">&nbsp;</p>*/}
            {/*    <p className="p">*/}
            {/*        {" "}*/}
            {/*        제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다.*/}
            {/*    </p>*/}
            {/*    <p className="p">선거에 관한 경비는 법률이 정하는 경우를</p>*/}
            {/*</div>*/}
            {/*<div className="qboard-detail-recom-recom-form">{`댓글 쓰기 `}</div>*/}
        </div>
    );
}

export default QboardDetail;