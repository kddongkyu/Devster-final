import React, { useCallback, useEffect, useState } from 'react';
import './style/Reviewupdate.css';
import axiosIns from "../../api/JwtConfig";
import { useParams } from "react-router-dom";
import { ReviewModal } from "./index";

function Reviewupdate(props) {
    const { rb_idx } = useParams();
    const [rating, setRating] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [updatedate, setUpdatedate] = useState({
        review: {
            rb_subject: "",
            rb_content: "",
            rb_star: "",
            rb_type: "",
        },
        ci_idx: "",
        ci_name: ""
    });

    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const openReviewModal = () => {
        setIsReviewOpen(true);
    };
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedCompanyIdx, setSelectedCompanyIdx] = useState("");

    useEffect(() => {
        setUpdatedate(() => ({
            ...updatedate,
            ci_idx: selectedCompanyIdx,
        }));
    }, [selectedCompanyIdx]);

    useEffect(() => {
        setUpdatedate(() => ({
            ...updatedate,
            rb_star: rating,
        }));
    }, [rating]);




    useEffect(() => {
        setRating(updatedate.review.rb_star);
    }, [updatedate.review.rb_star]);

    const UpStar = ({ filled }) => (
        <span className={filled ? "star-filled" : "star-empty"}>{filled ? "★" : "☆"}&nbsp;</span>
    );

    const upstars = [];
    for (let i = 0; i < 5; i++) {
        upstars.push(<UpStar key={i} filled={i < rating} />);
    }

    const fetchReview = useCallback((rb_idx) => {
        const url = `api/review/D1/${rb_idx}`;
        axiosIns.get(url)
            .then(response => {
                console.log(response.data);
                setUpdatedate(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching review:', error);
            });
    }, [rb_idx]);

    useEffect(() => {
        fetchReview(rb_idx);
    }, [rb_idx, fetchReview]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleUpdateSubmit = async () => {
        const apiUrl = `/api/review/D1/${rb_idx}`;
        console.dir(updatedate, "들어가?");
        try {
            const response = await axiosIns.put(apiUrl, updatedate);
            if (response && response.data) {
                console.log(response.data);


                // 서버의 응답을 처리합니다.
                window.location.replace(`api/D1/review/${rb_idx}`);
            } else {
                console.error("Invalid response:", response);
                // 응답이 유효하지 않은 경우에 대한 처리
            }
        } catch (error) {
            console.error("reviewforminsertreact", error);
            // 에러 처리
        }
    };

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
    const Star = ({ filled }) => (
        <span className={filled ? "star-filled" : "star-empty"}>{filled ? "★" : "☆"}&nbsp;</span>
    );

    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(<Star key={i} filled={i < (rating || 0)} />);  // Star 컴포넌트를 사용합니다.
    }

    return (
        <div className="review-update-form">
            <div className="advertise-box">
                <div className="advertise-main" />
                <b className="advertise-text">광고</b>
            </div>
            <div className="reviewupdate-write">
                <div className="reviewupdate-write-scolum-box" />
                <b className="reviewupdate-write-lcolumn">Review</b>
                <div className="reviewupdate-write-scolumn">
                    코딩테스트 / 면접 / 합격 후기 게시판
                </div>
            </div>

            <div className="reviewupdate-write-subject">
                <div className="reviewupdate-write-subject-tex">제목</div>
                <input
                    className="reviewupdate-write-subject-box-icon"
                    name="rb_subject"
                    required
                    value={updatedate.review.rb_subject}
                    onChange={(e)=>{
                        setUpdatedate({
                            ...updatedate,
                            review: {
                                ...updatedate.review,
                                rb_subject: e.target.value
                            }
                        })
                    }}
                />
                <select
                    className="reviewupdate-write-select-box-icon"
                    name="rb_type"
                    value={updatedate.review.rb_type}
                    required
                    onChange={(e)=>{
                        setUpdatedate({
                            ...updatedate,
                            review: {
                                ...updatedate.review,
                                rb_type: e.target.value
                            }
                        })
                    }}
                >
                    <option value="" disabled hidden>선택하세요</option>
                    <option value="1">면접</option>
                    <option value="2">코딩</option>
                    <option value="3">합격</option>
                </select>
            </div>
            <div className="reviewupdate-write-company">
                <div className="reviewupdate-write-company-tex">회사선택</div>
                <input
                    className="reviewupdate-write-company-box-icon"
                    readOnly
                    value={`${selectedCompany===""?updatedate.ciName:selectedCompany}`}
                    name="ci_idx"
                />

            </div>
            <img
                className="reviewupdate-search-icon"
                alt=""
                src={require('./assets/reviewupdate-search-icon.svg').default}
                onClick={openReviewModal}
            />
            <div className="reviewupdate-content">
                <div className="reviewupdate-stars-icons">{upstars}</div>
                <textarea
                    className="reviewupdate-content-box-icon"
                    placeholder="내용을 입력해주세요"
                    value={updatedate.review.rb_content}
                    onChange={(e)=>{
                        setUpdatedate({
                            ...updatedate,
                            review: {
                                ...updatedate.review,
                                rb_content: e.target.value
                            }
                        })
                    }}
                />

            </div>
            <div className="reviewupdate-stars">
                <div className="reviewupdate-like">
                    <div className="notice-like-countbox">
                        <div className="notice-like-countbox-child" />
                    </div>
                    <div className="reviewupdate-like">
                        <div className="reviewupdate-like">
                            <div className="rectangle-wrapper">
                                <div className="group-child" />
                            </div>
                            <div className="rectangle-container">
                                <div className="group-item" />
                            </div>
                        </div>
                        <div
                            className="notice-like-count-input"
                            name="rb_star"
                            value={updatedate.review.rb_star}
                            // onChange={handleupdateChange}
                        >
                            {rating}
                        </div>
                    </div>
                </div>
                <img
                    className="review-update-add-icon"
                    alt=""
                    src={require('./assets/review-update-add.svg').default}
                    onClick={increaserating}
                />
                <img
                    className="review-update-minus-icon"
                    alt=""
                    src={require('./assets/review-update-minus.svg').default}
                    onClick={decreaserating}
                />
            </div>
            <button className="reviewupdate-form-btn" onClick={handleUpdateSubmit}>
                <div className="reviewupdate-form-btn-text">리뷰등록</div>
                <img
                    className="reviewupdate-vecter-icon"
                    alt=""
                    src={require('./assets/reviewupdate-vecter.svg').default}
                />
            </button>
            <ReviewModal  isReviewOpen={isReviewOpen}
                          setIsReviewOpen={setIsReviewOpen}
                          setSelectedCompany={setSelectedCompany}
                          setSelectedCompanyIdx={setSelectedCompanyIdx}/>
        </div>
    );
}

export default Reviewupdate;
