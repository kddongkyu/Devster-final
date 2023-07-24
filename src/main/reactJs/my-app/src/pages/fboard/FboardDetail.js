import React, {useCallback, useEffect, useState} from 'react';
import './style/FboardDetail.css';
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";
import {useNavigate, useParams} from "react-router-dom";


function FboardDetail(props) {

    let de = jwt_decode(localStorage.getItem('accessToken'));
    const m_idx = de.idx;
    const [fboardData, setFboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { fb_idx, currentPage } = useParams();
    const [isGood, setIsGood] = useState(false);
    const [isBad, setIsBad] = useState(false);
    const [arrayFromString, setArrayFromString] = useState([]);

    const navi = useNavigate();
    const photoUrl = process.env.REACT_APP_PHOTO+"fboard/";

    const fetchFboard = useCallback((fb_idx, currentPage = null) => {
        const url=`/api/fboard/D0/${fb_idx}`;
        axiosIns.get(url)
            .then(response => {
                console.log(response.data);
                setFboardData(response.data);
                if(response.data.fboard.fb_photo!=null){
                    setArrayFromString(response.data.fboard.fb_photo.split(","));
                }

                // const originUrl = fboardData.fboard.fb_photo;
                // if(originUrl != null) {
                //     setArrayFromString(originUrl.split(","));
                // }
                // console.log(arrayFromString);
                setIsLoading(false);

                if (m_idx && fb_idx) {
                    axiosIns.get(`/api/fboard/D1/${m_idx}/checkGood/${fb_idx}`)
                        .then(response => {
                            setIsGood(response.data); // 좋아요 상태를 받아서 상태 변수에 저장
                        })
                        .catch(error => {
                            console.error('Error checking good status:', error);
                        });

                    axiosIns.get(`/api/fboard/D1/${m_idx}/checkBad/${fb_idx}`)
                        .then(response => {
                            setIsBad(response.data); // 싫어요 상태를 받아서 상태 변수에 저장
                        })
                        .catch(error => {
                            console.error('Error checking bad status:', error);
                        });
                }

            })
            .catch(error => {
                console.error('Error fetching fboard:', error);
            });
    }, []);

    // 업데이트 폼으로 이동하는 변수
    const navigateToPurchase = useCallback(() => {
        const updateFormUrl = `/fboard/updateform/${fb_idx}/${currentPage}`;
        navi(updateFormUrl, { state: fboardData }); // fboardData를 state로 전달
    }, [fb_idx, currentPage, fboardData, navi]);


    useEffect(() => {
        fetchFboard(fb_idx, currentPage);
    }, [fb_idx, currentPage, fetchFboard()]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 사진 출력
    // const photoUrl = process.env.REACT_APP_PHOTO+"fboard/";
    // const originUrl = fboardData.fboard.fb_photo;
    // if(originUrl != null) {
    //     setArrayFromString(originUrl.split(","));
    // }
    // console.log(arrayFromString);

    // 좋아요 싫어요
    const handlelike = (m_idx, fb_idx) => {
            // 먼저 좋아요 상태를 체크합니다.
            axiosIns.get(`/api/fboard/D1/${m_idx}/checkBad/${fb_idx}`)
                .then(response => {
                    if (response.data === 2) {
                        // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                        alert("이미 싫어요가 눌려 있습니다");
                        window.location.reload();
                    } else {
                        // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                        axiosIns.get(`/api/fboard/D1/${m_idx}/checkGood/${fb_idx}`)
                            .then(response => {
                                if (response.data === 1) {
                                    // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                                    alert("이미 좋아요가 눌려 있습니다");
                                    axiosIns.post(`/api/fboard/D1/${m_idx}/like/${fb_idx}`)
                                        .then(response => {
                                            fetchFboard(fb_idx, currentPage);
                                        })
                                        .catch(error => {
                                            alert("좋아요 요청 실패");
                                            console.error('좋아요 요청 실패:', error);
                                        });
                                } else {
                                    // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                    axiosIns.post(`/api/fboard/D1/${m_idx}/like/${fb_idx}`)
                                        .then(response => {
                                            alert("좋아요를 눌렀습니다");
                                            console.log('좋아요 요청 성공:', response.data);
                                            fetchFboard(fb_idx, currentPage);
                                        })
                                        .catch(error => {
                                            alert("좋아요 요청 실패");
                                            console.error('좋아요 요청 실패:', error);
                                        });
                                }
                            })
                            .catch(error => {
                                console.error('좋아요 상태 체크 실패:', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('싫어요 상태 체크 실패:', error);
                });
        };


        const handleDislike = (m_idx, fb_idx) => {
            // 먼저 좋아요 상태를 체크합니다.
            axiosIns.get(`/api/fboard/D1/${m_idx}/checkGood/${fb_idx}`)
                .then(response => {
                    if (response.data === 1) {
                        // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                        alert("이미 좋아요가 눌려 있습니다");
                        fetchFboard(fb_idx, currentPage);
                    } else {
                        // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                        axiosIns.get(`/api/fboard/D1/${m_idx}/checkBad/${fb_idx}`)
                            .then(response => {
                                if (response.data === 2) {
                                    // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                                    alert("이미 싫어요가 눌려 있습니다");
                                    axiosIns.post(`/api/fboard/D1/${m_idx}/dislike/${fb_idx}`)
                                        .then(response => {
                                            fetchFboard(fb_idx, currentPage);
                                        })
                                        .catch(error => {
                                            alert("싫어요 요청 실패");
                                            console.error('싫어요 요청 실패:', error);
                                        });
                                } else {
                                    // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                    axiosIns.post(`/api/fboard/D1/${m_idx}/dislike/${fb_idx}`)
                                        .then(response => {
                                            alert("싫어요를 눌렀습니다");
                                            console.log('싫어요 요청 성공:', response.data);
                                            fetchFboard(fb_idx, currentPage);
                                        })
                                        .catch(error => {
                                            alert("싫어요 요청 실패");
                                            console.error('싫어요 요청 실패:', error);
                                        });
                                }
                            })
                            .catch(error => {
                                console.error('싫어요 상태 체크 실패:', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('좋아요 상태 체크 실패:', error);
                });
        };


        let result = fboardData.fboard.rb_like - fboardData.fboard.rb_dislike;

        if (fboardData.fboard.rb_like <= fboardData.fboard.rb_dislike) {
            result = - result;
        }

    const deleteFboard = (fb_idx) => {
            if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
                axiosIns.delete(`/api/fboard/D1/${fb_idx}`)
                    .then(response => {
                        console.log('FreeBoard deleted successfully');
                        window.location.href="/fboard";
                    })
                    .catch(error => {
                        console.error('Error deleting fboard:', error);
                    });
            }
        };

    const fboardNavigation = () => {
        const url = "/fboard";
        window.location.href = url;
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
            <div className="fboard-detail-info">
                <img
                    className="fboard-detail-info-profile-img-icon"
                    alt=""
                    src={fboardData.mPhoto}
                />
                <div className="fboard-detail-info-nickname" >{fboardData.mNicname}</div>
                <div className="fboard-detail-info-status-text">
                    <span>{fboardData.fboard.fb_readcount}</span>
                    {/*<span className="span">{`수정됨 `}</span>*/}
                </div>
                <div className="fboard-detail-info-status-text1">{timeForToday(fboardData.fboard.fb_writeday)}</div>
                <img
                    className="fboard-detail-info-status-view-icon"
                    alt=""
                    src={require("./assets/boarddetail/notice_detail_info_status_views.svg").default}
                />
            </div>

            <img className="fboard-url-icon" alt=""
                 src={require("./assets/boarddetail/notice_detail_header_function_url.svg").default}
            />

            {m_idx === fboardData.fboard.m_idx && (
                <>
                    <img
                        className="fboard-update-icon"
                        alt=""
                        src={require("./assets/boarddetail/edit.svg").default}
                        onClick={navigateToPurchase}
                    />
                    <img
                        className="fboard-delete-icon"
                        alt=""
                        src={require("./assets/boarddetail/trash.svg").default}
                        onClick={() => deleteFboard(fb_idx)}
                    />
                </>
            )}
            <div className="fboard-detail-header-btn">
                <div className="fboard-detail-header-btn-like">
                    <img
                        className="board-detail-header-btn-like-i-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_header_btn_like_icon.svg").default}
                    />
                    <div className="board-detail-header-btn-like-t">{fboardData.fboard.fb_like}</div>
                </div>
                <div className="fboard-detail-header-btn-disli">
                    <img
                        className="board-detail-header-btn-dislik-icon"
                        alt=""
                        src={require("./assets/boarddetail/board_detail_header_btn_dislike_icon.svg").default}
                    />
                    <div className="board-detail-header-btn-like-t">{fboardData.fboard.fb_dislike}</div>
                </div>
            </div>


            <div className="board-detail-textarea">
                <div className="board-detail-textarea-subject">
                    {fboardData.fboard.fb_subject}
                </div>

                <div className="board-detail-textarea-contents">
                   <pre style={{marginBottom:"5rem"}}>
                       {fboardData.fboard.fb_content}
                   </pre>
                </div>

                <div className="fboard-detail-photo-list">
                    {arrayFromString.map((imageId, index) => (
                        <div>
                            <img
                                className="board-detail-photo" key={index}
                                src={`${photoUrl}${imageId}`}
                                alt={`Image ${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 여기서부터 밑으로 정렬 */}
            <div className="board-detail-listbackcounter">
            <div className="board-detail-listback" onClick={fboardNavigation}>
                <div className="board-detail-listback-rec" />
                <div className="board-detail-listback-text">목록</div>
                <img
                    className="board-detail-listback-icon"
                    alt=""
                    src={require("./assets/boarddetail/board_detail_listback_icon.svg").default}
                />
            </div>
            <div className="board-detail-counter">
                <div className="board-detail-counter-like">
                    <div className="board-detail-counter-like-box"
                         style={isGood ? { backgroundColor: '#F5EFF9' } : {}}
                         onClick={()=>handlelike(m_idx,fb_idx)}/>
                    <img
                        className="board-detail-counter-like-icon"
                        alt=""
                        src={require("./assets/boarddetail/review_detail_counter_like_icon.svg").default}
                    />
                </div>
                <div className="board-detail-counter-num">
                    <div className="board-detail-counter-num-box" />
                    <div className="board-detail-counter-num-text">
                        {fboardData.fboard.fb_like - fboardData.fboard.fb_dislike}
                    </div>
                </div>
                <div className="board-detail-counter-dislike">
                    <div className="board-detail-counter-dislike-b"
                         style={isBad ? { backgroundColor: '#F5EFF9' } : {}}
                         onClick={()=>handleDislike(m_idx,fb_idx)}/>
                    <img
                        className="board-detail-counter-like-icon"
                        alt=""
                        src={require("./assets/boarddetail/review_detail_counter_dislike_icon.svg").default}
                    />
                </div>
            </div>
            </div>
            <div className="advertise-box2">
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