import React, {useCallback, useEffect, useState} from 'react';
import './style//AboardDetail.css';
import jwt_decode from "jwt-decode";
import {useNavigate, useParams} from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
function AboardDetail(props) {

    let de = jwt_decode(localStorage.getItem('accessToken'));
    const m_idx = de.idx;

    const [aboardDate,setAboardData]=useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {ab_idx,currentPage}=useParams();
    const [isGood, setIsGood] = useState(false);
   const [isBad, setIsBad] = useState(false);
   const [arrayFromString, setArrayFromString] = useState([]);

   const navi = useNavigate();
   const photoUrl = process.env.REACT_APP_PHOTO+"aboard/";

    const fetchAboard = useCallback((ab_idx) => {
        console.log(ab_idx);
        const url = `/api/academyboard/D0/${ab_idx}`;
        axiosIns.get(url)
            .then(response => {
                console.log(response.data);
                setAboardData(response.data);
                console.log(response.data);
                if(response.data.aboard.ab_photo != null){
                     setArrayFromString(response.data.ab_photo.split(","));
                }
                setIsLoading(false);

                if (m_idx && ab_idx) {
                    axiosIns.get(`/api/academyboard/D1/${m_idx}/checkGood/${ab_idx}`)
                        .then(response => {
                            setIsGood(response.data); // 좋아요 상태를 받아서 상태 변수에 저장
                        })
                        .catch(error => {
                            console.error('Error checking good status:', error);
                        });

                    axiosIns.get(`/api/academyboard/D1/${m_idx}/checkBad/${ab_idx}`)
                        .then(response => {
                            setIsBad(response.data); // 싫어요 상태를 받아서 상태 변수에 저장
                        })

                        .catch(error => {
                            console.error('Error checking bad status:', error);
                        });
                }

            })
            .catch(error => {
                console.error('Error fetching aboard:', error);
            });
    }, []);

    // 업데이트 폼으로 이동하는 변수
    const navigateToPurchase = useCallback(() => {
        const updateFormUrl = `/aboard/update/${ab_idx}/${currentPage}`;
        navi(updateFormUrl, { state: aboardDate }); // fboardData를 state로 전달
    }, [ab_idx, currentPage, aboardDate, navi]);


    useEffect(() => {
        fetchAboard(ab_idx, currentPage);
    }, [ab_idx, currentPage, fetchAboard]);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 좋아요 싫어요
    const handlelike = (m_idx, ab_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/api/academyboard/D1/${m_idx}/checkBad/${ab_idx}`)
            .then(response => {
                if (response.data === 2) {
                    // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                    fetchAboard(ab_idx, currentPage);
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/api/academyboard/D1/${m_idx}/checkGood/${ab_idx}`)
                        .then(response => {
                            if (response.data === 1) {
                                // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                                alert("이미 좋아요가 눌려 있습니다");
                                axiosIns.post(`/api/academyboard/D1/${m_idx}/like/${ab_idx}`)
                                    .then(response => {
                                        fetchAboard(ab_idx, currentPage);
                                    })
                                    .catch(error => {
                                        alert("좋아요 요청 실패");
                                        console.error('좋아요 요청 실패:', error);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/academyboard/D1/${m_idx}/like/${ab_idx}`)
                                    .then(response => {
                                        console.log('좋아요 요청 성공:', response.data);
                                        fetchAboard(ab_idx, currentPage);
                                    })
                                    .catch(error => {
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


    const handleDislike = (m_idx, ab_idx) => {
        // 먼저 좋아요 상태를 체크합니다.
        axiosIns.get(`/api/academyboard/D1/${m_idx}/checkGood/${ab_idx}`)
            .then(response => {
                if (response.data === 1) {
                    // 이미 좋아요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                    fetchAboard(ab_idx, currentPage);
                } else {
                    // 좋아요가 눌러져 있지 않으면, 싫어요 상태를 체크합니다.
                    axiosIns.get(`/api/academyboard/D1/${m_idx}/checkBad/${ab_idx}`)
                        .then(response => {
                            if (response.data === 2) {
                                // 이미 싫어요가 눌러져 있으면, 경고 메시지를 표시하고 작업을 중단합니다.
                                alert("이미 싫어요가 눌려 있습니다");
                                axiosIns.post(`/api/academyboard/D1/${m_idx}/dislike/${ab_idx}`)
                                    .then(response => {
                                        fetchAboard(ab_idx, currentPage);
                                    })
                                    .catch(error => {
                                        alert("싫어요 요청 실패");
                                        console.error('싫어요 요청 실패:', error);
                                    });
                            } else {
                                // 좋아요와 싫어요 둘 다 눌러져 있지 않으면, 싫어요 작업을 수행합니다.
                                axiosIns.post(`/api/academyboard/D1/${m_idx}/dislike/${ab_idx}`)
                                    .then(response => {
                                        console.log('싫어요 요청 성공:', response.data);
                                        fetchAboard(ab_idx, currentPage);
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


    let result = aboardDate.aboard.ab_like - aboardDate.aboard.ab_dislike;

    if (aboardDate.aboard.ab_like <= aboardDate.aboard.ab_dislike) {
        result = - result;
    }

    const deleteAboard = (ab_idx) => {
        if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
            axiosIns.delete(`/api/academyboard/D1/${ab_idx}`)
                .then(response => {
                    console.log('AcademyBoard deleted successfully');
                    window.location.href="/aboard";
                })
                .catch(error => {
                    console.error('Error deleting fboard:', error);
                });
        }
    };

    const aboardNavigation = () => {
        const url = "/aboard";
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
        <div className="aboard-detail">
          <div className="advertise-box">
            <div className="advertise-main" />
            <b className="advertise-text">광고</b>
          </div>
          <img
              className="aboard-detail-type-hr-icon"
              alt=""
              src="/aboard-detail-type-hr.svg"
          />
          <div className="aboard-detail-type-text">{aboardDate.ciNamge}게시판</div>
          <div className="aboard-detail-info">
            <img
                className="aboard-detail-info-profile-img-icon"
                alt=""
                src={aboardDate.mPhoto}
            />
            <div className="aboard-detail-info-nickname">{aboardDate.mNicname}</div>
            <div className="aboard-detail-info-status-text">
              <span className="aboard-datail-readcount-text">{aboardDate.aboard.ab_readcount}{` · `}</span>
              <span className="span">{`수정됨 `}</span>
            </div>
            <div className="aboard-detail-info-status-text1">
                {timeForToday(aboardDate.aboard.ab_writeday)}</div>
            <img
                className="aboard-detail-info-status-view-icon"
                alt=""
                src={require("./assets/aboarddetail/aboard_detail_info_status_views.svg").default}
            />
          </div>
          <img className="aboard-url-icon" alt=""
               src={require("./assets/aboarddetail/aboard_url_icon.svg").default}/>
            {m_idx === aboardDate.aboard.m_idx && (
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
              onClick={()=>deleteAboard(ab_idx)}
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
              <div className="board-detail-header-btn-like-t">{aboardDate.aboard.ab_like}</div>
            </div>
            <div className="aboard-detail-header-btn-disli">
              <img
                  className="board-detail-header-btn-dislik-icon"
                  alt=""
                  src={require("./assets/aboarddetail/board_detail_header_btn_dislike_icon.svg").default}
              />
              <div className="board-detail-header-btn-like-t">{aboardDate.aboard.ab_dislike}</div>
            </div>
          </div>
          <div className="aboard-detail-textarea">
            <div className="aboard-detail-textarea-content">
                {aboardDate.aboard.ab_content}
            </div>
            <b className="aboard-detail-textarea-subject">
                {aboardDate.aboard.ab_subject}
            </b>
          </div>
          <div className="aboard-detail-photo" />
          <div className="aboard-detail-listback">
            <div className="aboard-detail-listback-rec" onClick={aboardNavigation} />
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
                   style={isGood ? { backgroundColor: '#F5EFF9' } : {}}/>
              <img
                  className="aboard-detail-counter-like-ico-icon"
                  alt=""
                  src={require("./assets/aboarddetail/aboard_detail_counter_like_icon.svg").default}

                  onClick={()=>handlelike(m_idx,ab_idx)}/>
              />
            </div>
            <div className="aboard-detail-counter-num">
              <div className="aboard-detail-counter-num-box" />
              <div className="aboard-detail-counter-num-text">{result}</div>
            </div>
            <div className="aboard-detail-counter-dislike">
              <div className="aboard-detail-counter-dislike-"
                   style={isBad ? { backgroundColor: '#F5EFF9' } : {}}/>
              <img
                  className="aboard-detail-counter-like-ico-icon"
                  alt=""
                  src={require("./assets/aboarddetail/aboard_detail_counter_dislike_icon.svg").default}

                  onClick={()=>handleDislike(m_idx,ab_idx)}/>
              />
            </div>
          </div>
            <div className="aboard-datail-advertise-box">
                <div className="advertise-main" />
                <b className="aboard-datail-advertise-text">광고 2</b>
            </div>
          <img
              className="aboard-detail-hr-icon"
              alt=""
              src="/aboard-detail-hr.svg"
          />
          <div className="aboard-detail-comments-counts">nn개의 댓글</div>
          <div className="aboard-detail-commnets-form">
            <div className="aboard-detail-commnets-form-bo" />
            <img
                className="aboard-detail-commnets-form-im-icon"
                alt=""
                src="/aboard-detail-commnets-form-img@2x.png"
            />
            <div className="aboard-detail-commnets-form-te" />
          </div>
          <div className="aboard-detail-commnets-submit-">
            <div className="aboard-detail-commnets-form-su" />
            <b className="aboard-detail-commnets-form-su1">댓글 쓰기</b>
          </div>
          <div className="aboard-detail-commnets-detail-">
            <div className="aboard-detail-recom-info-text">
              <div className="aboard-detail-recom-info-count">댓글 1</div>
              <div className="aboard-detail-recom-info-date">
                <span>{`약  6시간 전 · `}</span>
                <span className="span">{`수정됨 `}</span>
              </div>
            </div>
            <img
                className="aboard-detail-commnets-detail-icon"
                alt=""
                src="/aboard-detail-commnets-detail-info-img@2x.png"
            />
          </div>
          <div className="aboard-detail-commnets-all-lik">
            <div className="aboard-detail-commnets-all-up">
              <div className="aboard-detail-commnets-all-up-" />
              <img
                  className="aboard-detail-commnets-all-up-icon"
                  alt=""
                  src="/aboard-detail-commnets-all-up-icon.svg"
              />
            </div>
            <div className="aboard-detail-recom-likes-coun">
              <div className="aboard-detail-commnets-all-box" />
              <div className="aboard-detail-commnets-all-lik2">27</div>
            </div>
            <div className="aboard-detail-commnets-all-dow">
              <div className="aboard-detail-recom-down-box" />
              <img
                  className="aboard-detail-commnets-all-dow-icon"
                  alt=""
                  src="/aboard-detail-commnets-all-down-icon.svg"
              />
            </div>
          </div>
          <div className="aboard-detail-commnets-all-con">
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
          <div className="aboard-detail-commnets-hide">
            <img
                className="aboard-detail-commnets-hide-ic-icon"
                alt=""
                src="/aboard-detail-commnets-hide-icon.svg"
            />
            <div className="aboard-detail-commnets-hide-te">댓글 모두 숨기기</div>
            <div className="aboard-detail-commnets-hide-co">댓글 쓰기</div>
          </div>
          <div className="aboard-detail-recom-box" />
          <div className="aboard-detail-recom-info">
            <div className="aboard-detail-recom-info-text">
              <div className="aboard-detail-recom-info-count">대댓글 1</div>
              <div className="aboard-detail-recom-info-date">
                <span>{`약  1시간 전 · `}</span>
                <span className="span">{`수정됨 `}</span>
              </div>
            </div>
            <img
                className="aboard-detail-commnets-detail-icon"
                alt=""
                src="/aboard-detail-recom-info-img@2x.png"
            />
          </div>
          <div className="aboard-detail-recom-likes">
            <div className="aboard-detail-commnets-all-up">
              <div className="aboard-detail-commnets-all-up-" />
              <img
                  className="aboard-detail-commnets-all-up-icon"
                  alt=""
                  src="/aboard-detail-recom-up-icon.svg"
              />
            </div>
            <div className="aboard-detail-recom-likes-coun">
              <div className="aboard-detail-commnets-all-box" />
              <div className="aboard-detail-commnets-all-lik2">27</div>
            </div>
            <div className="aboard-detail-commnets-all-dow">
              <div className="aboard-detail-recom-down-box" />
              <img
                  className="aboard-detail-commnets-all-dow-icon"
                  alt=""
                  src="/aboard-detail-recom-down-icon.svg"
              />
            </div>
          </div>
          <div className="aboard-detail-recom-textarea">
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
          <div className="aboard-detail-recom-recom-form">{`댓글 쓰기 `}</div>
        </div>
    );
}

export default AboardDetail;