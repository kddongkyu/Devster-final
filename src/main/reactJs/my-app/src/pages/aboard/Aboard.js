// import { NavLink } from "react-router-dom";
// import "./style/Aboard.css";
// import {useEffect, useState} from "react";
// import axiosIns from "../../api/JwtConfig";
// const Aboard = () => {
//
//   const [acacemyBoardList, setAcacemyBoardList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   //정렬
//   const [sortProperty, setSortProperty] = useState('');
//   const [sortDirection, setSortDirection] = useState('');
//   //검색
//   const [inputKeyword, setInputKeyword] = useState(''); // 사용자가 입력하는 검색어
//   const [finalKeyword, setFinalKeyword] = useState(''); // 최종 검색어 (검색 버튼
//
//
//   const handleRefresh = () => {
//     window.location.reload();
//   };
//
//   const handleSearchButtonClick = () => {
//     // 검색 버튼을 눌렀을 때 '최종 검색어'를 업데이트합니다.
//     const searchKeyword = inputKeyword;
//     setFinalKeyword(searchKeyword);
//     // 첫 페이지의 검색 결과를 가져옵니다.
//     setCurrentPage(1);
//   };
//
//
//
//   const fetchacdemy = async (page, keyword, sortProperty, sortDirection) => {
//     const searchKeyword = keyword && keyword.trim() !== '' ? keyword.trim() : null;
//     console.log(sortDirection, sortProperty)
//     try {
//       const response = await axiosIns.get('/api/academyboard/D0', {
//         params: {
//           page: page - 1, // Use the page parameter
//           keyword: searchKeyword,
//           sortProperty,
//           sortDirection
//         }
//       });
//
//       setAcacemyBoardList(response.data.academyBoardList); // Typo 수정 (acacemy -> academy)
//       setTotalPages(response.data.totalPages);
//
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };
//
//     useEffect(() => {
//     // Ensure currentPage is at least 1
//       const page = Math.max(1, currentPage);
//     fetchacdemy(page, finalKeyword, sortProperty, sortDirection);
//   }, [currentPage, finalKeyword, sortProperty, sortDirection]);
//
//
//   const onClickLatest = () => {
//     // fetchReviews(currentPage, finalKeyword, 'RBwriteday', 'DESC');
//     setSortProperty('ABwriteday');
//     setSortDirection('DESC');
//   };
//
//   const onClickLikes = () => {
//
//     setSortProperty('ABlike');
//     setSortDirection('DESC');
//     //  fetchReviews(currentPage, finalKeyword, 'RBlike', 'DESC');
//   };
//
//   const onClickViews = () => {
//     // fetchReviews(currentPage, finalKeyword, 'RBreadcount', 'DESC');
//     setSortProperty('ABreadcount');
//     setSortDirection('DESC');
//   };
//
//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       const newPage = currentPage - 1;
//       fetchacdemy(newPage, finalKeyword, sortProperty, sortDirection);
//       setCurrentPage(newPage);
//     }
//   };
//
//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       const newPage = currentPage + 1;
//       fetchacdemy(newPage, finalKeyword, sortProperty, sortDirection);
//       setCurrentPage(newPage);
//     }
//   };
//
//
//   const timeForToday = (value) => {
//     if (!value) {
//       return '';
//     }
//
//     const valueConv = value.slice(0, -10);
//     const today = new Date();
//     const timeValue = new Date(valueConv);
//
//     // timeValue를 한국 시간대로 변환
//     const timeValueUTC = new Date(timeValue.toISOString());
//     const offset = timeValue.getTimezoneOffset() * 60 * 1000; // 분 단위를 밀리초 단위로 변환
//     const timeValueKST = new Date(timeValueUTC.getTime() - offset);
//
//
//     const betweenTime = Math.floor((today.getTime() - timeValueKST.getTime()) / 1000 / 60);
//     if (betweenTime < 1) return '방금 전';
//     if (betweenTime < 60) {
//       return `${betweenTime}분 전`;
//     }
//     //console.log(betweenTime);
//
//     const betweenTimeHour = Math.floor(betweenTime / 60);
//     if (betweenTimeHour < 24) {
//       return `${betweenTimeHour}시간 전`;
//     }
//
//     const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
//     if (betweenTimeDay < 8) {
//       return `${betweenTimeDay}일 전`;
//     }
//
//     const year = String(timeValue.getFullYear()).slice(0, 4);
//     const month = String(timeValue.getMonth() + 1).padStart(2, '0');
//     const day = String(timeValue.getDate()).padStart(2, '0');
//
//     const formattedDateWithoutTime = `${year}-${month}-${day}`;
//
//     return formattedDateWithoutTime;
//   };
//
//   const setPhotoUrl = (value) => {
//     if (value == null) {
//       return require("./assets/logo-img.svg").default;
//     }
//     const photoUrl = process.env.REACT_APP_PHOTO+"fboard/";
//     const firstCommaIndex = value.indexOf(",");
//     const parsedPhoto = value.substring(0, firstCommaIndex);
//     const srcUrl = photoUrl + parsedPhoto;
//
//     return srcUrl;
//   }
//
//
//
//
//
//   return (
//     <div className="aboard">
//       <div className="advertise-box">
//         <div className="advertise-main" />
//         <b className="advertise-text">광고</b>
//       </div>
//       <div className="aboard-name">
//         <div className="aboard-name-box" />
//         <div className="aboard-name-text">
//           <b className="board-name-text-type">학원별 게시판</b>
//           <div className="board-name-text-detail">
//             인증이 완료된 사용자만 열람할 수 있는 게시판입니다.
//           </div>
//         </div>
//       </div>
//       <div className="aboard-selection">
//         <NavLink to="/fboard" activeClassName="active" className="aboard-selection-freeboard">
//           <div className="aboard-selection-freeboard-box" />
//           <div className="aboard-selection-freeboard-tex">자유</div>
//         </NavLink>
//         <NavLink to="/qboard" activeClassName="active" className="aboard-selection-qna">
//           <div className="aboard-selection-qna-box" />
//           <div className="aboard-selection-qna-text">{`Q&A`}</div>
//         </NavLink>
//         <NavLink to="/hboard" activeClassName="active" className="aboard-selection-hire">
//           <div className="aboard-selection-hire-box" />
//           <div className="aboard-selection-hire-text">채용정보</div>
//         </NavLink>
//
//         <div className="aboard-selection-academy">
//           <div className="aboard-selection-academy-box" />
//           <div className="aboard-selection-academy-text">학원별</div>
//         </div>
//       </div>
//       <NavLink to="/aboard/form" activeClassName="active" className="aboard-write">
//       <div className="aboard-write-box" />
//         <img
//           className="aboard-write-icon"
//           alt=""
//           src={require("./assets/board_write_icon.svg").default}
//
//         />
//         <div className="aboard-write-text">글쓰기</div>
//       </NavLink>
//       <div className="aboard-function-sort">
//         <div className="aboard-function-sort-box" />
//         <button className="aboard-function-sort-time" onClick={onClickLatest}>최신순</button>
//         <button className="aboard-function-sort-view" onClick={onClickViews}>조회순</button>
//         <button className="aboard-function-sort-like" onClick={onClickLikes}>인기순</button>
//         <img
//             className="aboard-function-sort-bar2-icon"
//             alt=""
//             src={require("./assets/aboard_function_sort_bar2.svg").default}
//         />
//         <img
//             className="aboard-function-sort-bar-icon"
//             alt=""
//             src={require("./assets/aboard_function_sort_bar.svg").default}
//         />
//       </div>
//
//       <div className="aboard-function-search-input">
//         <input type="text" className="aboard-function-search-input1"
//                value={inputKeyword}
//                placeholder='검색어를 입력해주세요'
//                onChange={(e) => setInputKeyword(e.target.value)}
//         />
//         <img
//           className="aboard-function-search-icon"
//           alt=""
//           src={require("./assets/board_function_search_icon2.svg").default}
//           onClick={handleSearchButtonClick}
//         />
//       </div>
//       <img className="aboard-hr-icon" alt="" src="/aboard-hr.svg" />
//       <img
//         className="aboard-pages-reset-icon"
//         alt=""
//         src={require("./assets/board_pages_reset.svg").default}
//         onClick={handleRefresh}
//       />
//       <div className="aboard-pages">
//         <div className="aboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
//         <img
//           className="aboard-pages-back-icon"
//           alt=""
//           src={require("./assets/aboard_pages_back.svg").default}
//           onClick={() => goToPreviousPage(finalKeyword,sortProperty,sortDirection)}
//           style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
//         />
//         <img
//           className="aboard-pages-forward-icon"
//           alt=""
//           src={require("./assets/board_pages_forward.svg").default}
//           onClick={() => goToNextPage(finalKeyword,sortProperty,sortDirection)}
//           style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
//         />
//       </div>
//       <div className="aboard-bottom-pages">
//         <div className="aboard-pages-current">{`${currentPage} / ${totalPages} 페이지`}</div>
//         <img
//             className="aboard-pages-forward-icon"
//             alt=""
//             src={require("./assets/board_pages_forward.svg").default}
//              onClick={() => goToNextPage(finalKeyword,sortProperty,sortDirection)}
//              style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
//         />
//         <img
//             className="aboard-pages-back-icon"
//             alt=""
//             src={require("./assets/aboard_pages_back.svg").default}
//              onClick={() => goToPreviousPage(finalKeyword,sortProperty,sortDirection)}
//             style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
//         />
//       </div>
//       <img className="aboard-hr-icon1" alt="" src="/aboard-hr1.svg" />
//       <div className="aboard-notice">
//         <div className="aboard-notice-box" />
//         <div className="aboard-notice-preview">
//           <div className="aboard-notice-preview-info">
//             <img
//               className="aboard-notice-preview-info-log-icon"
//               alt=""
//               src={require("./assets/board_notice_preview_info_logo.svg").default}
//             />
//             <div className="aboard-notice-preview-info-tex">
//               admin_01 · 약 4시간 전
//             </div>
//           </div>
//           <b className="aboard-notice-preview-subject">DEVSTER 공지사항</b>
//           <div className="aboard-notice-preview-notice">
//             <div className="aboard-notice-preview-notice-b" />
//             <div className="aboard-notice-preview-notice-t">공지사항</div>
//           </div>
//           <div className="aboard-notice-preview-hash">#공지사항 # Devster</div>
//           <div className="aboard-notice-preview-icons">
//             <div className="aboard-notice-preview-views">
//               <div className="aboard-notice-preview-views-te">800</div>
//               <img
//                 className="aboard-notice-preview-views-ic-icon"
//                 alt=""
//                 src={require("./assets/board_preview_views_icon.svg").default}
//               />
//             </div>
//             <div className="aboard-notice-preview-icons-co">
//               <div className="aboard-notice-preview-views-te">99</div>
//               <img
//                 className="aboard-notice-preview-icons-co2"
//                 alt=""
//                 src={require("./assets/board_preview_comments_icon.svg").default}
//               />
//             </div>
//             <div className="aboard-notice-preview-icons-li">
//               <div className="aboard-notice-preview-icons-li1">9</div>
//               <img
//                 className="aboard-notice-preview-icons-li2"
//                 alt=""
//                 src={require("./assets/board_preview_likes_icon.svg").default}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       {acacemyBoardList && acacemyBoardList.map((aboard)=>{
//         return(
//       <div className="aboard-preview" key={aboard.academyboard.ab_idx}>
//         <NavLink to={`/aboard/detail/${aboard.academyboard.ab_idx}/${currentPage}`}>
//         <div className="aboard-preview-box" />
//         <img className="aboard-preview-img-profile"
//         alt=""
//         src={setPhotoUrl(aboard.mPhoto)}
//         />
//         <div className="aboard-preview-type">
//           <b className="aboard-preview-type-text">{aboard.AIname} 게시판</b>
//           <div className="aboard-preview-type-date">{timeForToday(aboard.academyboard.ab_writeday)}</div>
//         </div>
//         <div className="aboard-preview-id">
//           <div className="aboard-preview-type-text">{aboard.mNicname}</div>
//         </div>
//         <b className="aboard-preview-subject">{aboard.academyboard.ab_subject}</b>
//         <div className="aboard-preview-contents">
//           {aboard.academyboard.ab_content}
//         </div>
//         <div className="aboard-preview-img-preview" />
//         <div className="aboard-preview-likes">
//
//
//           <div className="aboard-preview-likes-text">{aboard.academyboard.ab_like < aboard.academyboard.ab_dislike ? -aboard.academyboard.ab_dislike  : aboard.academyboard.ab_like}</div>
//           <img
//             className="aboard-preview-likes-icon"
//             alt=""
//             src={require("./assets/board_preview_likes_icon.svg").default}
//           />
//         </div>
//         <div className="aboard-preview-comments">
//           <div className="aboard-preview-likes-text">99.9k</div>
//           <img
//             className="aboard-preview-comments-icon"
//             alt=""
//             src={require("./assets/board_preview_comments_icon.svg").default}
//           />
//         </div>
//         <div className="aboard-preview-views">
//           <div className="aboard-preview-views-text">{aboard.academyboard.ab_readcount}</div>
//           <img
//             className="aboard-preview-views-icon"
//             alt=""
//             src={require("./assets/board_preview_views_icon.svg").default}
//
//           />
//         </div>
//         </NavLink>
//       </div>
//         )
//       })}
//     </div>
//   );
// };
//
// export default Aboard;
