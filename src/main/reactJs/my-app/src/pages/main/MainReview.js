import React from 'react';

function MainReview(props) {
    return (
        <div className='main-review-preview'>
            <div className='main-best-box'/>
            <div className='main-best-profile-img'/>
            <div className='main-review-info'>
                <b className='main-best-info-type'>코딩테스트 후기</b>
                <div className='main-best-info-date'>작성시간</div>
            </div>
            <b className='main-review-subject'>회사명 일이삼사오육칠팔구</b>
            <div className='main-review-content'>
                본문 일이삼사오육칠팔구십일이...
            </div>
            <div className='main-best-img'/>
            <div className='main-review-stars'>
                <img
                    className='main-review-stars-icon'
                    alt=''
                    src={require('./assets/main_review_stars_icon.svg').default}
                />
                <div className='main-freeboard-likes-text'>4.0</div>
            </div>
            <div className='main-review-id'>
                <div className='main-best-info-type'>비트캠프701호</div>
                <div className='main-freeboard-info-spacing'/>
                <div className='main-best-info-type'>아이디명최대로</div>
            </div>
        </div>
    );
}

export default MainReview;