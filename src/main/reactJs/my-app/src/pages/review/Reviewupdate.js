import React, { useCallback, useEffect, useState } from 'react';
import './style/Reviewupdate.css';
import axiosIns from "../../api/JwtConfig";
import {useNavigate, useParams} from "react-router-dom";
import { ReviewModal } from "./index";
import jwt_decode from "jwt-decode";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";

function Reviewupdate({reviewData}) {
    const [rbSubject, setRbsubject] = useState("");
    const [rbContent, setRbcontent] = useState("");
    const [rbType, setRbtype] = useState("");
    const [rbStar, setRbstar] = useState("");
    const [ciName, setCiname] = useState("");
    const [ciIdx, setCiidx] = useState("");
    const navi = useNavigate();
    const { rb_idx, currentPage } = useParams();
    const [rating, setRating] = useState("");
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedCompanyIdx, setSelectedCompanyIdx] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    let de = jwt_decode(localStorage.getItem("accessToken"));
    const m_idx = de.idx;

    const openReviewModal = () => {
        setIsReviewOpen(true);
    };

    useEffect(() => {
        setCiidx(selectedCompanyIdx);
    }, [selectedCompanyIdx]);

    useEffect(() => {
        setRbstar(rating);
    }, [rating]);

    useEffect(() => {
        setRating(rbStar);
    }, [rbStar]);


    const UpStar = ({ filled }) => (
        <span className={filled ? "star-filled" : "star-empty"}>{filled ? "★" : "☆"}&nbsp;</span>
    );

    const upstars = [];
    for (let i = 0; i < 5; i++) {
        upstars.push(<UpStar key={i} filled={i < rating} />);
    }

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



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosIns.get(`/api/review/D0/${rb_idx}`);
                if (response.data && response.data.review) {
                    setRbsubject(response.data.review.rb_subject);
                    setRbcontent(response.data.review.rb_content);
                    setRbtype(response.data.review.rb_type);
                    setRbstar(response.data.review.rb_star);
                    setCiname(response.data.ciName);
                    setCiidx(response.data.review.ci_idx);
                    setIsLoading(false);  // 추가: 데이터를 불러오는데 성공하면 로딩 상태를 종료합니다.
                }
            } catch (error) {
               toastAlert('로딩 처리 중 에러 발생','warning');
            }
        };

        fetchData();
    }, [rb_idx]);


    const handleUpdateSubmit = (e)=>{
        e.preventDefault();

        const dto={
            rb_subject : rbSubject,
            rb_content: rbContent,
            rb_star:rbStar,
            rb_type:rbType,
            ci_idx:ciIdx,
            ci_name:ciName,
            m_idx:m_idx,
        }
        axiosIns
            .put(`/api/review/D1/${rb_idx}`,dto)
            .then((res)=>{
                navi(`/review/detail/${rb_idx}/${currentPage}`);
            })
            .catch((error)=>{
                toastAlert('업데이트 처리 중 에러 발생','warning');
            });
    };


    if (isLoading) {
        return <div>Loading...</div>;
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
                    value={rbSubject}
                   onChange={(e)=>setRbsubject(e.target.value)}
                />
                <select
                    className="reviewupdate-write-select-box-icon"
                    name="rb_type"
                    value={rbType}
                    required
                    onChange={(e)=>setRbtype(e.target.value)}
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
                    value={`${selectedCompany===""?ciName:selectedCompany}`}
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
                    value={rbContent}
                    onChange={(e)=>setRbcontent(e.target.value)}
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
                            value={rbStar}
                             //onChange={handleupdateChange}
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