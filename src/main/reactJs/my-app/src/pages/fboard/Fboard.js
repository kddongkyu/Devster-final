import "./style/Fboard.css";
import {NavLink} from 'react-router-dom';
import {useEffect, useState} from "react";
import Axios from "axios";
import axiosIns from "../../api/JwtConfig";

function Fboard(props) {

    const handleRefresh = () => {
        window.location.reload();
    };

    const [freeBoardList, setFreeBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [contentCount, setContentCount] = useState(15); // 텍스트의 초기 개수

    const handleResize = () => {
        // 화면 너비에 따라 텍스트 개수를 업데이트
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1000) {
            setContentCount(80);
        } else if (screenWidth >= 768) {
            setContentCount(45);
        } else if (screenWidth >= 600) {
            setContentCount(35);
        } else if (screenWidth >= 480) {
            setContentCount(25);
        } else {
            setContentCount(15);
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트되거나 화면 크기가 변경될 때 리사이즈 이벤트 핸들러 등록
        window.addEventListener('resize', handleResize);
        handleResize(); // 초기 렌더링 시 텍스트 개수 설정

        return () => {
            // 컴포넌트가 언마운트될 때 리사이즈 이벤트 핸들러 제거
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        fetchFboards(currentPage);
    }, [currentPage]);

    const fetchFboards = (page) => {
        axiosIns.get('/fboard', {params: {page: page-1}})
            .then(response => {
                setFreeBoardList(response.data.freeBoardList);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching fboards:', error);
            });
    };

    useEffect(() => {
        // JPA로부터 데이터 가져오는 API 호출
        axiosIns.get('/fboard')
            .then(response => {
                setFreeBoardList(response.data.freeBoardList);
            })
            .catch(error => {
                console.error('Error fetching fboards:', error);
            });
    }, []);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
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
        <div className="fboard">
            <div className="advertise-box">
                <div className="advertise-main"/>
                <b className="advertise-text">광고</b>
            </div>
            <div className="fboard-name">
                <div className="board-name-box"/>
                <div className="fboard-name-text">
                    <b className="fboard-name-text-type">자유게시판</b>
                    <div className="fboard-name-text-detail">
                        다양한 주제의 자유로운 대화를 나누는 게시판
                    </div>
                </div>
            </div>

            <div className="fboard-selection">
                <div className="fboard-selection-freeboard">
                    <div className="fboard-selection-freeboard-box"/>
                    <div className="fboard-selection-freeboard-tex">자유</div>
                </div>
                <NavLink to="/qboard" activeClassName="active" className="fboard-selection-qna">
                    <div className="fboard-selection-qna-box"/>
                    <div className="fboard-selection-qna-text">{`Q&A`}</div>
                </NavLink>
                <NavLink to="/hboard" activeClassName="active" className="fboard-selection-hire">
                    <div className="fboard-selection-hire-box"/>
                    <div className="fboard-selection-hire-text">채용정보</div>
                </NavLink>
                <NavLink to="/aboard" activeClassName="active" className="fboard-selection-academy">
                    <div className="fboard-selection-qna-box"/>
                    <div className="fboard-selection-academy-text">학원별</div>
                </NavLink>
            </div>


            <NavLink to="/fboard/form" activeClassName="active" className="fboard-write">
                <div className="fboard-write-box"/>
                <img
                    className="fboard-write-icon"
                    alt=""
                    src={require("./assets/board_write_icon.svg").default}
                />
                <div className="fboard-write-text">글쓰기</div>
            </NavLink>
            <div className="fboard-function-sort">
                <div className="fboard-function-sort-box"/>
                <div className="fboard-function-sort-reset">전체</div>
                <img
                    className="fboard-function-sort-bar-icon"
                    alt=""
                    src={require("./assets/board_function_sort_bar.svg").default}
                />
                <img
                    className="fboard-function-sort-by-icon"
                    alt=""
                    src={require("./assets/board_function_sort_by.svg").default}
                />
            </div>


            <div className="fboard-function-search-input">
                <input type="text" className="fboard-function-search-input1"/>
                <img
                    className="fboard-function-search-icon"
                    alt=""
                    src={require("./assets/board_function_search_icon2.svg").default}
                />
            </div>
            {/* <img className="board-hr-icon" alt="" src="/board-hr.svg" /> */}
            <img
                className="fboard-pages-reset-icon"
                alt=""
                src={require("./assets/board_pages_reset.svg").default}
                onClick={handleRefresh}
            />
            <div className="fboard-pages">
                <div className="fboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
                <img
                    className="fboard-pages-back-icon"
                    alt=""
                    src={require("./assets/board_pages_back.svg").default}
                    onClick={goToPreviousPage}
                    style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                />
                <img
                    className="fboard-pages-forward-icon"
                    alt=""
                    src={require("./assets/board_pages_forward.svg").default}
                    onClick={goToNextPage}
                    style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                />
            </div>

            {/* <img className="board-hr-icon1" alt="" src="/board-hr1.svg" /> */}
            <div className="fboard-notice">
                <div className="fboard-notice-box"/>
                <div className="fboard-notice-preview">
                    <div className="fboard-notice-preview-info">
                        <img
                            className="fboard-notice-preview-info-logo-icon"
                            alt=""
                            src={require("./assets/board_notice_preview_info_logo.svg").default}
                        />
                        <div className="fboard-notice-preview-info-text">
                            admin_01 · 약 4시간 전
                        </div>
                    </div>
                    <b className="fboard-notice-preview-subject">DEVSTER 공지사항</b>
                    <div className="fboard-notice-preview-notice">
                        <div className="fboard-notice-preview-notice-bo"/>
                        <div className="fboard-notice-preview-notice-te">공지사항</div>
                    </div>
                    <div className="fboard-notice-preview-hash">#공지사항 # Devster</div>
                    <div className="fboard-notice-preview-icons">
                        <div className="fboard-notice-preview-views">
                            <div className="fboard-notice-preview-views-tex">800</div>
                            <img
                                className="fboard-notice-preview-views-ico-icon"
                                alt=""
                                src={require("./assets/board_preview_views_icon.svg").default}
                            />
                        </div>
                        <div className="fboard-notice-preview-icons-com">
                            <div className="fboard-notice-preview-views-tex">99</div>
                            <img
                                className="fboard-notice-preview-icons-com2"
                                alt=""
                                src={require("./assets/board_preview_comments_icon.svg").default}
                            />
                        </div>
                        <div className="fboard-notice-preview-icons-lik">
                            <div className="fboard-notice-preview-icons-lik1">9</div>
                            <img
                                className="fboard-notice-preview-icons-lik2"
                                alt=""
                                src={require("./assets/board_preview_likes_icon.svg").default}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="fboard_list">
                {freeBoardList && freeBoardList.map((fboard) => (
                    <div key={fboard.fb_idx} className="fboard-preview">
                        <div className="fboard-preview-box"/>
                        <div className="fboard-preview-img-profile"/>
                        <div className="fboard-preview-type">
                            <b className="fboard-preview-type-text">자유게시판</b>
                            <div className="fboard-preview-type-date">{timeForToday(fboard.fb_writeday)}</div>
                        </div>
                        <div className="fboard-preview-id">
                            <div className="fboard-preview-type-text">{fboard.m_idx}</div>
                        </div>
                        <b className="fboard-preview-subject">{fboard.fb_subject}</b>
                        <div className="fboard-preview-contents">
                            {(fboard.fb_content).slice(0, contentCount)}
                        </div>
                        <div className="fboard-preview-img-preview"/>
                        <div className="fboard-preview-likes">
                            <div className="fboard-preview-likes-text">99.9k</div>
                            <img
                                className="fboard-preview-likes-icon"
                                alt=""
                                src={require("./assets/board_preview_likes_icon.svg").default}
                            />
                        </div>
                        <div className="fboard-preview-comments">
                            <div className="fboard-preview-likes-text">99.9k</div>
                            <img
                                className="fboard-preview-comments-icon"
                                alt=""
                                src={require("./assets/board_preview_comments_icon.svg").default}
                            />
                        </div>
                        <div className="fboard-preview-views">
                            <div className="fboard-preview-views-text">99.9k</div>
                            <img
                                className="fboard-preview-views-icon"
                                alt=""
                                src={require("./assets/board_preview_views_icon.svg").default}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="fboard-pages2">
                <div className="fboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
                <img
                    className="fboard-pages-back-icon"
                    alt=""
                    src={require("./assets/board_pages_back.svg").default}
                    onClick={goToPreviousPage}
                    style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                />
                <img
                    className="fboard-pages-forward-icon"
                    alt=""
                    src={require("./assets/board_pages_forward.svg").default}
                    onClick={goToNextPage}
                    style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                />
            </div>


        </div>
    );
};

export default Fboard;
