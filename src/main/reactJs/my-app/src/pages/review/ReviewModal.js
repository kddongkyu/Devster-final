import React, { useState } from 'react';
import './style/ReviewModal.css';
import axios from "axios";
import jwt_decode from "jwt-decode";
import axiosIns from "../../api/JwtConfig";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";

const Star = ({ filled }) => <span>{filled ? "★" : "☆"}&nbsp;</span>;
function ReviewModal({ isReviewOpen, setIsReviewOpen ,setSelectedCompany, setSelectedCompanyIdx}) {

    const [keyword, setKeyword] = useState('');
    const [companies, setCompanies] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);


    const closeFindCo = () => {
        setIsReviewOpen(false);
    };

    if (!isReviewOpen) {
        return null;
    }

    const handleSearch = async () => {
        const listUrl = "/api/review/D1/search"; // Adjust this if your server runs on a different port or URL
      //  let de = jwt_decode(localStorage.getItem('accessToken'));
        try {
            const response = await axiosIns.get(listUrl, {
                params: { keyword: keyword }
            });
            setCompanies(response.data); // Set the data to your state variable
        } catch (error) {
            toastAlert('검색 처리 중 에러 발생', 'warning');
        }
    };

    // 엔터로 검색
    const handleEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <div className="modal-backdrop" onClick={closeFindCo}>
            <div className="reviewmodal" onClick={e => e.stopPropagation()}>
                <div className="review-modal-logo">
                    <img
                        className="review-modal-img-icon"
                        alt=""
                        src={require('./assets/Review_modal_img.svg').default}
                    />
                    <div className="review-modal-text">Devster</div>
                </div>
                <img
                    className="review-modal-close-icon"
                    alt=""
                    src={require('./assets/Review_modal_close.svg').default}
                    onClick={closeFindCo}
                />

                <b className="review-modal-text1">회사 검색</b>
                <div className="review-modal-search-input">
                    <input className="review-modal-search-input1"
                           value={keyword}
                           onChange={handleInputChange}
                           onKeyDown={handleEnterKeyPress}
                    />
                    <img
                        className="review-modal-search-icon"
                        alt=""
                        src={require('./assets/Review_modal_search_icon.svg').default}
                        onClick={handleSearch}
                    />
                </div>
                <div className="review-select-company-list">
                    {companies.map((company) => (
                        <div className="review-modal-list">
                        <div key={company.ci_id} onClick={() => {setSelectedCompany(company.ci_name); setSelectedCompanyIdx(company.ci_idx);
                            setIsReviewOpen(false);}}>
                        <img
                                className="review-modal-photo-icon"
                                alt=""
                                src={company.ci_photo} // Make sure the company photo URL is correct
                            />
                            <b className="review-modal-coname">{company.ci_name}</b>
                            <div className="review-modal-star-icon">
                                {Array.from(Array(5), (_, index) => (
                                    <Star key={index} filled={index < (company.ci_star || 0)}/>
                                ))}
                            </div>
                            {/*<div className="notice-line-box" />*/}
                        </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewModal;
