import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './style/Main.css';
import {MainBest, MainFreeboard, MainHire, MainQnA, MainReview} from './index';


function Main(props) {
    const navi = useNavigate();

    return (
        <div className='moblie-main'>
            <div className='main-advertise'>
                <div className='main-advertise-box'/>
                <b className='main-advertise-text'>광고1</b>
            </div>
            <div className='main-preview-name'>
                <div className='main-preview-name-box'/>
                <b className='main-preview-name-text'>실시간 인기글</b>
            </div>
            <MainBest/>
            <div className='main-best-more'>
                <div className='main-best-more-text'>더보기</div>
                <img
                    className='main-best-more-icon'
                    alt=''
                    src={require('./assets/main_more_icon.svg').default}
                />
            </div>
            <div className='main-advertise1'>
                <div className='main-advertise-box'/>
                <b className='main-advertise-text'>광고2</b>
            </div>
            <div className='main-preview-name1'>
                <div className='main-preview-name-box'/>
                <b className='main-preview-name-text'>자유게시판 (최신순)</b>
            </div>
            <MainFreeboard/>
            <div className='main-freeboard-more'>
                <div className='main-best-more-text'>더보기</div>
                <img
                    className='main-best-more-icon'
                    alt=''
                    src={require('./assets/main_more_icon.svg').default}
                />
            </div>
            <div className='main-preview-name2'>
                <div className='main-preview-name-box'/>
                <b className='main-preview-name-text'>질문게시판 (최신순)</b>
            </div>
            <MainQnA/>
            <div className='main-qna-more'>
                <div className='main-best-more-text'>더보기</div>
                <img
                    className='main-best-more-icon'
                    alt=''
                    src={require('./assets/main_more_icon.svg').default}
                />
            </div>
            <div className='main-advertise2'>
                <div className='main-advertise-box'/>
                <b className='main-advertise-text'>광고3</b>
            </div>
            <div className='main-preview-name3'>
                <div className='main-preview-name-box'/>
                <b className='main-preview-name-text'>채용게시판 (최신순)</b>
            </div>
           <MainHire/>
            <div className='main-hire-more'>
                <div className='main-best-more-text'>더보기</div>
                <img
                    className='main-best-more-icon'
                    alt=''
                    src={require('./assets/main_more_icon.svg').default}
                />
            </div>
            <div className='main-preview-name4'>
                <div className='main-preview-name-box'/>
                <b className='main-preview-name-text'>리뷰게시판 (최신순)</b>
            </div>
            <MainReview/>
            <div className='main-review-more'>
                <div className='main-best-more-text'>더보기</div>
                <img
                    className='main-best-more-icon'
                    alt=''
                    src={require('./assets/main_more_icon.svg').default}
                />
            </div>
            <div className='main-advertise3'>
                <div className='main-advertise-box'/>
                <b className='main-advertise-text'>광고4</b>
            </div>
        </div>
    );
}

export default Main;