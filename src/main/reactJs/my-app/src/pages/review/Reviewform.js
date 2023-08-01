import React, {useEffect, useState} from 'react';
import './style/Reviewform.css';
import {ReviewModal} from "./index";
import axiosIns from "../../api/JwtConfig";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {checkToken} from "../../api/checkToken";


function Reviewform(props) {
    let de = checkToken();
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const openReviewModal = () => {
        setIsReviewOpen(true);
    };


    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedCompanyIdx, setSelectedCompanyIdx] = useState("");
    const [rating, setRating] = useState(0);  // useState는 컴포넌트의 최상위 범위에서 호출합니다.
    const [formData, setFormData] = useState({
        rb_subject: '',
        rb_content: '',
        rb_star: '',
        rb_type: '',
        m_idx: de.idx,
    });
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            ci_idx: selectedCompanyIdx,
        }));
    }, [selectedCompanyIdx]);

    // rating 상태가 변화할 때마다 formData의 rb_star를 업데이트합니다.
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            rb_star: rating,
        }));
    }, [rating]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const apiUrl = '/api/review/D1';
        try {
            const response = await axiosIns.post(apiUrl, formData);
            window.location.replace('/review');
        } catch (error) {
            toastAlert('댓글 작성에 에러가 발생했습니다.','warning');
        }
    };


    //별 표시를 위한 에제 컴포넌트

    const increaserating = () => {
        if (rating < 5) {
            setRating(rating + 1);
        }
    };
    const decreaserating = () => {
        if (rating > 0) {
            setRating(rating - 1);
        }
    };

    const Star = ({filled}) => (
        <span className={filled ? "star-filled" : "star-empty"}>{filled ? "★" : "☆"}&nbsp;</span>
    );

    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<Star key={i} filled={i < rating}/>);  // Star 컴포넌트를 사용합니다.
    }


    return (
        <div className="review-write-form">
            <div className="advertise-box">
                <div className="advertise-main"/>
                <b className="advertise-text">광고</b>
            </div>
            <div className="review-write">
                <div className="review-write-scolum-box"/>
                <b className="review-write-lcolumn">Review</b>
                <div className="review-write-scolumn">
                    코딩테스트 / 면접 / 합격 후기 게시판
                </div>
            </div>
            <div className="review-write-subject">
                <div className="review-write-subject-text">제목</div>
                <input
                    className="review-write-subject-box-icon"
                    name="rb_subject"
                    value={formData.rb_subject}
                    onChange={handleInputChange}
                />
                <select
                    className="review-write-select-box-icon"
                    name="rb_type"
                    value={formData.rb_type}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled hidden>선택하세요</option>
                    <option value="1">면접</option>
                    <option value="2">코딩</option>
                    <option value="3">합격</option>
                </select>

            </div>

            <div className="review-write-company">
                <div className="review-write-company-text">회사선택</div>
                <input className="review-write-search-box-icon"
                       value={selectedCompany} readOnly/>
            </div>

            <img className="review-search-icon" alt=""
                 src={require('./assets/review-search-icon.svg').default}
                 onClick={openReviewModal}
            />

            <div className="review-content">

                <div className="review-stars-icons">{stars}</div>

                <textarea placeholder="내용을 입력해주세요"
                          className="review-content-box-icon"
                          name="rb_content"
                          value={formData.rb_content}
                          onChange={handleInputChange}
                />

            </div>
            <div className="review-stars">
                <div className="notice-like">
                    <div className="notice-like-countbox">
                        <div className="notice-like-countbox-child"/>
                    </div>
                    <div className="notice-like">
                        <div className="notice-like">
                            <div className="rectangle-wrapper">
                                <div className="group-child"/>
                            </div>
                            <div className="rectangle-container">
                                <div className="group-item"/>
                            </div>
                        </div>
                        <div className="notice-like-count-input"
                             value={formData.rb_star}
                             onChange={handleInputChange}
                        >{rating}</div>
                    </div>
                </div>
                <button onClick={decreaserating}>
                    <img
                        className="notice-dislike-icon"
                        alt=""
                        src={require('./assets/star-dislike-icon.svg').default}
                    /></button>
                <button onClick={increaserating}>
                    <img className="notice-like-icon" alt=""
                         src={require('./assets/star-like-icon.svg').default}
                    /></button>
            </div>
            <button className="review-form-btn" onClick={handleSubmit}>
                <img
                    className="review-form-btn-icon"
                    alt=""
                    src={require('./assets/review_form_btn_icon.svg').default}
                />  &nbsp;&nbsp; 리뷰등록
            </button>
            <ReviewModal isReviewOpen={isReviewOpen}
                         setIsReviewOpen={setIsReviewOpen}
                         setSelectedCompany={setSelectedCompany}
                         setSelectedCompanyIdx={setSelectedCompanyIdx}/>
        </div>
    );
}

export default Reviewform;