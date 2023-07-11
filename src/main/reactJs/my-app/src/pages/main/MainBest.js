import React from 'react';

function MainBest(props) {
    return (
        <div className='main-best-preview'>
            <div className='main-best-box'/>
            <div className='main-best-profile-img'/>
            <div className='main-best-info'>
                <b className='main-best-info-type'>게시판명길이최대로</b>
                <div className='main-best-info-date'>작성시간</div>
            </div>
            <div className='main-best-id'>
                <div className='main-best-info-type'>ABCDEFGHIJ</div>
            </div>
            <b className='main-best-subject'>제목 일이삼사오육칠팔구...</b>
            <div className='main-best-content'>
                본문 일이삼사오육칠팔구십일이...
            </div>
            <div className='main-best-img'/>
            <div className='main-best-likes'>
                <div className='main-best-likes-text'>99.9k</div>
                <img
                    className='main-best-likes-icon'
                    alt=''
                    src={require('./assets/main_likes_icon.svg').default}
                />
            </div>
            <div className='main-best-coments'>
                <div className='main-best-likes-text'>99.9k</div>
                <img
                    className='main-best-coments-icon'
                    alt=''
                    src={require('./assets/main_coments_icon.svg').default}
                />
            </div>
            <div className='main-best-views'>
                <div className='main-best-views-text'>99.9k</div>
                <img
                    className='main-best-views-icon'
                    alt=''
                    src={require('./assets/main_views_icon.svg').default}
                />
            </div>
        </div>
    );
}

export default MainBest;