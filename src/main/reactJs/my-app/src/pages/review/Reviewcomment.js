import React, {useEffect, useState} from 'react';
import './style/Reviewdetail.css';
import axiosIns from "../../api/JwtConfig";
import {Reviewcommentform, Reviewcommentreply} from "./index";


function Reviewcomment(props) {

    const [reviewcommentlist,setReviewcommentlist] =useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchreviewcomment();
    }, []);

    const fetchreviewcomment = () => {
        axiosIns.get('/api/reviewcomment/D0', {
            params: {
                rb_idx: props.rb_idx // 이 부분에 필요한 값을 넣어주세요.
            }
        })
            .then(res => {
                setReviewcommentlist(res.data);
                console.log(reviewcommentlist)
            })
            .catch(err => console.log(err));
    }


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
        //console.log(betweenTime);

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
        <div>
            <Reviewcommentform  rb_idx={props.rb_idx}/>
            {reviewcommentlist.map((comment, index) => (
        <div key={index}>
                <div className="review-detail-comments-counts">{comment.totalCount}개의 댓글</div>
                <div className="review-detail-commnets">
                <div className="review-detail-comments-all">
                    <div className="review-detail-commnets-all-con">
                        {comment.rbc_content}
                    </div>
                    <div className="review-detail-commnets-detail-">
                        <div className="review-detail-recom-info-text">
                            <div className="review-detail-recom-info-count">{comment.nickname}</div>
                            <div className="review-detail-recom-info-date">
                                <span> {timeForToday(comment.rbc_writeday)}
                                  {/*{`· `}*/}
                                </span>
                                {/*<span className="span">{`수정됨 `}</span>*/}
                            </div>
                        </div>
                        <img
                            className="review-detail-commnets-detail-icon"
                            alt=""
                            src={comment.m_photo}
                        />
                    </div>
                    <div className="review-detail-commnets-all-lik">
                        <div className="review-detail-commnets-all-up">
                            <div className="review-detail-commnets-all-up-" />
                            <img
                                className="review-detail-commnets-all-up-icon"
                                alt=""
                                src="/review-detail-commnets-all-up-icon.svg"
                            />
                        </div>
                        <div className="review-detail-recom-likes-coun">
                            <div className="review-detail-commnets-all-box" />
                            <div className="review-detail-commnets-all-lik2">27</div>
                        </div>
                        <div className="review-detail-commnets-all-dow">
                            <div className="review-detail-recom-down-box" />
                            <img
                                className="review-detail-commnets-all-dow-icon"
                                alt=""
                                src="/review-detail-commnets-all-down-icon.svg"
                            />
                        </div>

                    </div>
                </div>
                </div>

                <div className="review-detail-commnets-hide">
                    <img
                        className="review-detail-commnets-hide-ic-icon"
                        alt=""
                        src="/review-detail-commnets-hide-icon.svg"
                    />
                </div>
                <div className="review-detail-recom">
                    <Reviewcommentreply/>
            <div className="review-line-box" />
            <div className="review-detail-headline">
                <div className="review-detail-headline-box" />
                <div className="review-detail-headline-text">리뷰게시판</div>
            </div>

            </div>
        </div>
       ))}
        </div>
    );
}

export default Reviewcomment;