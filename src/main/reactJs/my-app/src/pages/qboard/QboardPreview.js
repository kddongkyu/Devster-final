// BoardPreview.js
import React, {useEffect, useState} from 'react';
import "./style/Board.css";

const QboardPreview = (props) => {

    const photoUrl = process.env.REACT_APP_MEMBERURL;
    const [contentCount, setContentCount] = useState(15);
    const [subjectCount, setsubjectCount] = useState(10);

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
    const handleSubjectResize = () => {
        // 화면 너비에 따라 텍스트 개수를 업데이트
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1000) {
            setsubjectCount(50);
        } else if (screenWidth >= 768) {
            setsubjectCount(35);
        } else if (screenWidth >= 600) {
            setsubjectCount(25);
        } else if (screenWidth >= 480) {
            setsubjectCount(20);
        } else {
            setsubjectCount(10);
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
        // 컴포넌트가 마운트되거나 화면 크기가 변경될 때 리사이즈 이벤트 핸들러 등록
        window.addEventListener('resize', handleSubjectResize);
        handleSubjectResize(); // 초기 렌더링 시 텍스트 개수 설정

        return () => {
            // 컴포넌트가 언마운트될 때 리사이즈 이벤트 핸들러 제거
            window.removeEventListener('resize', handleSubjectResize);
        };
    }, []);

    const compareValues = (value1, value2) => {
        return value1.length > value2;
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

    const setPhotoUrl = (value) => {
        if (value == null) {
            return require("./assets/logo-img.svg").default;
        }
        const photoUrl = process.env.REACT_APP_PHOTO+"qboard/";
        const firstCommaIndex = value.indexOf(",");
        const parsedPhoto = value.substring(0, firstCommaIndex);
        const srcUrl = photoUrl + parsedPhoto;

        return srcUrl;
    }

    return (
        <div className="board-preview">
            <div className="board-preview-box" />
            <img className="board-preview-img-profile" src={`${photoUrl}${props.data.photo}`}/>
            <div className="board-preview-type">
                <b className="board-preview-type-text">Q&A 게시판</b>
                <div className="board-preview-type-date">{timeForToday(props.data.qboardDto.qb_writeday)}</div>
            </div>
            <div className="board-preview-id">
                <div className="board-preview-type-text">{props.data.nickname}</div>
            </div>
            <b className="board-preview-subject">{compareValues(String(props.data.qboardDto.qb_subject), subjectCount)
                ? props.data.qboardDto.qb_subject.slice(0, subjectCount) + "···"
                : props.data.qboardDto.qb_subject}</b>
            <div className="board-preview-contents">
                {compareValues(String(props.data.qboardDto.qb_content), contentCount)
                    ? props.data.qboardDto.qb_content.slice(0, contentCount) + "···"
                    : props.data.qboardDto.qb_content}
            </div>
            <img className="board-preview-img-preview" src={setPhotoUrl(props.data.qboardDto.qb_photo)}/>
            <div className="board-preview-comments">
                <div className="board-preview-likes-text">{props.data.totalcommentCount}</div>
                <img
                    className="board-preview-comments-icon"
                    alt=""
                    src={require("./assets/board_preview_comments_icon.svg").default}

                />
            </div>
            <div className="board-preview-views">
                <div className="board-preview-views-text">{props.data.qboardDto.qb_readcount}</div>
                <img
                    className="board-preview-views-icon"
                    alt=""
                    src={require("./assets/board_preview_views_icon.svg").default}
                />
            </div>
        </div>
    );
};

export default QboardPreview;
