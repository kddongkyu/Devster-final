import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import ToastAlert from "../../api/ToastAlert";
import {jwtHandleError} from "../../api/JwtHandleError";
import {checkToken} from "../../api/checkToken";
import {useSnackbar} from "notistack";


function AboardDetail(props) {

    //에러 호출용 변수
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    //디코딩 함수
    const de = checkToken();
    const [m_idx, setM_idx] = useState();
    const [aboardData, setAboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {ab_idx, currentPage} = useParams();
    const [isGood, setIsGood] = useState(false);
    const [isBad, setIsBad] = useState(false);
    const [arrayFromString, setArrayFromString] = useState([]);
    const navi = useNavigate();
    const photoUrl = process.env.REACT_APP_PHOTO + "aboard/";

    const fetchAboard = useCallback((ab_idx, currentPage = null) => {
        const url = `/api/academyboard/D1/${ab_idx}`;
        axiosIns.get(url)
            .then(response =>{
                setAboardData(response.data);
                if(response.data.aboard.ab_photo != null) {
                    setArrayFromString(response.data.aboard.ab_photo.split(","));
                }
                setIsLoading(false);
                setM_idx(de.idx);

                if(m_idx && ab_idx) {
                    axiosIns.get(`/api/aboard/D1/${m_idx}/checkGood/${ab_idx}`)
                        .then(response => {
                            setIsGood(response.data); // 좋아요 상태를 받아서 상태 변수에 저장
                        })
                        .catch(error => {
                            jwtHandleError(error, toastAlert);
                        });

                    axiosIns.get(`/api/aboard/D1/${m_idx}/checkBad/${ab_idx}`)
                        .then(response => {
                            setIsBad(response.data); // 싫어요 상태를 받아서 상태 변수에 저장
                        })
                        .catch(error => {
                            jwtHandleError(error, toastAlert);
                        });
                }
            })
            .catch(error => {
                jwtHandleError(error, toastAlert);
            });
    },[ab_idx, currentPage]);


    // 업데이트 폼으로 이동하는 변수
    const navigateToPurchase = useCallback(() => {
        const updateFormUrl = `/aboard/updateform/${ab_idx}/${currentPage}`;
        navi(updateFormUrl, {state: aboardData});
    }, [ab_idx, currentPage, aboardData, navi]);

    useEffect(()=>{
        fetchAboard(ab_idx, currentPage);
    },[ab_idx, currentPage, fetchAboard]);


    // 좋아요 싫어요
    const handlelike = (m_idx, ab_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/api/aboard/D1/${m_idx}/checkBad/${ab_idx}`)
            .then(response => {
                if (response.data === 2) {
                    // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                    alert("이미 싫어요가 눌려 있습니다");
                    window.location.reload();
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/api/aboard/D1/${m_idx}/checkGood/${ab_idx}`)
                        .then(response => {
                            if (response.data === 1) {
                                // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                                alert("이미 좋아요가 눌려 있습니다");
                                axiosIns.post(`/api/aboard/D1/${m_idx}/like/${ab_idx}`)
                                    .then(response => {
                                        fetchAboard(ab_idx, currentPage);
                                    })
                                    .catch(error => {
                                        alert("좋아요 요청 실패");
                                        jwtHandleError(error, toastAlert);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/aboard/D1/${m_idx}/like/${ab_idx}`)
                                    .then(response => {
                                        alert("좋아요를 눌렀습니다");
                                        console.log('좋아요 요청 성공:', response.data);
                                        fetchAboard(ab_idx, currentPage);
                                    })
                                    .catch(error => {
                                        alert("좋아요 요청 실패");
                                        jwtHandleError(error, toastAlert);
                                    });
                            }
                        })
                        .catch(error => {
                            jwtHandleError(error, toastAlert);
                        });
                }
            })
            .catch(error => {
                jwtHandleError(error, toastAlert);
            });
    };

    const handleDislike = (m_idx, ab_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/api/aboard/D1/${m_idx}/checkGood/${ab_idx}`)
            .then(response => {
                if (response.data === 1) {
                    // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                    alert("이미 좋아요가 눌려 있습니다");
                    fetchAboard(ab_idx, currentPage);
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/api/aboard/D1/${m_idx}/checkBad/${ab_idx}`)
                        .then(response => {
                            if (response.data === 2) {
                                // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                                alert("이미 싫어요가 눌려 있습니다");
                                axiosIns.post(`/api/aboard/D1/${m_idx}/dislike/${ab_idx}`)
                                    .then(response => {
                                        fetchAboard(ab_idx, currentPage);
                                    })
                                    .catch(error => {
                                        alert("싫어요 요청 실패");
                                        jwtHandleError(error, toastAlert);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/aboard/D1/${m_idx}/dislike/${ab_idx}`)
                                    .then(response => {
                                        alert("싫어요를 눌렀습니다");
                                        console.log('싫어요 요청 성공:', response.data);
                                        fetchAboard(ab_idx, currentPage);
                                    })
                                    .catch(error => {
                                        alert("싫어요 요청 실패");
                                        jwtHandleError(error, toastAlert);
                                    });
                            }
                        })
                        .catch(error => {
                            jwtHandleError(error, toastAlert);
                        });
                }
            })
            .catch(error => {
                jwtHandleError(error, toastAlert);
            });
    };

    // 삭제
    const deleteAboard = (ab_idx) => {
        if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
            axiosIns.delete(`/api/aboard/D1/${ab_idx}`)
                .then(response => {
                    console.log('aboard deleted successfully');
                    window.location.href = "/aboard";
                })
                .catch(error => {
                    jwtHandleError(error, toastAlert);
                });
        }
    };

    // 목록 돌아가기
    const aboardNavigation = () => {
        const url = "/aboard";
        window.location.href = url;
    };

    const handleNicknameClick = () => {
        // recv_nick은 이 컴포넌트에서 사용할 수 있는 형태로 가져옵니다.
        const recv_nick = aboardData.mNicname;
        navi(`/message/form/${recv_nick}`);
    };

    // 시간 변환
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
        <div className="aboard-detail">
            <div className="aboard-advertise-box">
                <div className="aboard-advertise-main"/>
                <b className="aboard-advertise-text">광고</b>
            </div>

            <div className="board-detail-type-text">자유게시판</div>
            <div className="aboard-detail-info">
                <img
                    className="aboard-detail-info-profile-img-icon"
                    alt=""
                    src={aboardData.mPhoto}
                    onClick={handleNicknameClick}
                />
                <div className="aboard-detail-info-nickname"
                     onClick={handleNicknameClick}>{aboardData.mNicname}</div>

                <div className="aboard-detail-info-status-text">
                    <span>{aboardData.aboard.ab_readcount}</span>
                </div>
                <div className="aboard-detail-info-status-text1">{timeForToday(aboardData.aboard.ab_writeday)}</div>
                <img
                    className="aboard-detail-info-status-view-icon"
                    alt=""
                    src={require("./assets/aboarddetail/aboard_detail_info_status_views.svg").default}
                />
            </div>

            <img className="aboard-url-icon" alt=""
                 src={require("./assets/aboarddetail/aboard_url_icon.svg").default}
            />

            {m_idx === aboardData.aboard.m_idx && (
                <>
                    <img
                        className="aboard-update-icon"
                        alt=""
                        src={require("./assets/aboarddetail/aboard_update_icon.svg").default}
                        onClick={navigateToPurchase}
                    />
                    <img
                        className="aboard-delete-icon"
                        alt=""
                        src={require("./assets/aboarddetail/aboard_delete_icon.svg").default}
                        onClick={() => deleteAboard(ab_idx)}
                    />
                </>
            )}
            <div className="aboard-detail-header-btn">
                <div className="aboard-detail-header-btn-like">
                    <img
                        className="board-detail-header-btn-like-i-icon"
                        alt=""
                        src={require("./assets/aboarddetail/board_detail_header_btn_like_icon.svg").default}
                    />
                    <div className="board-detail-header-btn-like-t">{aboardData.aboard.ab_like}</div>
                </div>
                <div className="aboard-detail-header-btn-disli">
                    <img
                        className="board-detail-header-btn-dislik-icon"
                        alt=""
                        src={require("./assets/aboarddetail/board_detail_header_btn_dislike_icon.svg").default}
                    />
                    <div className="board-detail-header-btn-like-t">{aboardData.aboard.ab_dislike}</div>
                </div>
            </div>


            <div className="aboard-detail-textarea">
                <div className="aboard-detail-textarea-subject">
                    {aboardData.aboard.ab_subject}
                </div>

                <div className="aboard-detail-textarea-contents">
                   <pre style={{marginBottom: "5rem"}}>
                       {aboardData.aboard.ab_content}
                   </pre>
                </div>

                <div className="aboard-detail-photo-list">
                    {arrayFromString.map((imageId, index) => (
                        <div>
                            <img
                                className="board-detail-photo" key={index}
                                src={`${photoUrl}${imageId}`}
                                alt={`Image ${index}`}
                            />
                        </div>
                    ))}

                    {/* 여기서부터 밑으로 정렬 */}
                    <div className="aboard-detail-listbackcounter">
                        <div className="aboard-detail-listback" onClick={aboardNavigation}>
                            <div className="aboard-detail-listback-rec"/>
                            <div className="aboard-detail-listback-text">목록</div>
                            <img
                                className="aboard-detail-listback-icon"
                                alt=""
                                src={require("./assets/aboarddetail/aboard_detail_listback_icon.svg").default}
                            />
                        </div>
                        <div className="aboard-detail-counter">
                            <div className="aboard-detail-counter-like">
                                <div className="aboard-detail-counter-like-box"
                                     style={isGood ? {backgroundColor: '#F5EFF9'} : {}}
                                     onClick={() => handlelike(m_idx, ab_idx)}/>
                                <img
                                    className="aboard-detail-counter-like-icon"
                                    alt=""
                                    src={require("./assets/aboarddetail/aboard_detail_counter_like_icon.svg").default}
                                />
                            </div>
                            <div className="aboard-detail-counter-num">
                                <div className="aboard-detail-counter-num-box"/>
                                <div className="aboard-detail-counter-num-text">
                                    {aboardData.aboard.ab_like - aboardData.aboard.ab_dislike}
                                </div>
                            </div>
                            <div className="aboard-detail-counter-dislike">
                                <div className="aboard-detail-counter-dislike-b"
                                     style={isBad ? {backgroundColor: '#F5EFF9'} : {}}
                                     onClick={() => handleDislike(m_idx, ab_idx)}/>
                                <img
                                    className="aboard-detail-counter-like-icon"
                                    alt=""
                                    src={require("./assets/aboarddetail/aboard_detail_counter_dislike_icon.svg").default}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="aboard-advertise-box2">
                        <div className="aboard-advertise-main"/>
                        <b className="aboard-advertise-text1">광고 2</b>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AboardDetail;