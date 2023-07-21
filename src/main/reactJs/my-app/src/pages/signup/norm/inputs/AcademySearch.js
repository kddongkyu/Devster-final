import React, {useCallback, useEffect, useState} from 'react';
import '../../style/AcademySearch.css';
import {useDispatch} from "react-redux";
import axios from "axios";
import {setM_academy} from "../../../../redux/normMemberSlice";

function AcademySearch({isSearchOpen, setIsSearchOpen}) {
    const dispatch = useDispatch();

    const [academyList, setAcademyList] = useState([]);
    const [academyKeyWords, setAcademyKeyWords] = useState('');
    const [isAcademyTouched, setIsAcademyTouched] = useState(false);
    const [AcademyLoading, setAcademyLoading] = useState(false);

    const searchAcademy = useCallback(async () => {
        try {
            const res = await axios.get(`/api/member/D0/academy/${academyKeyWords}`);
            if (res?.status === 200) {
                setAcademyList(res.data);
                setAcademyLoading(false);
            }
        } catch (error) {
        }
    }, [academyKeyWords]);

    useEffect(() => {
        if (isAcademyTouched) {
            const timer = setTimeout(() => {
                if (!academyKeyWords.trim()) {
                    return;
                } else {
                    searchAcademy();
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [academyKeyWords, isAcademyTouched, AcademyLoading]);

    const handleAcademySearch = (e) => {
        if (!isAcademyTouched) {
            setIsAcademyTouched(true);
        }
        setAcademyKeyWords(e.target.value);
        setAcademyLoading(true);
    }

    const handleAcademyName = (ainame) => {
        setAcademyKeyWords(ainame);
    }

    const closeSearchModal = () => {
        setIsSearchOpen(false);
    }

    if (!isSearchOpen) {
        return null;
    }

    return (
        <div className='sigup-academy-modal-box'>
            <div className='sigup-academy-modal'>
                <div className='sigup-crop-modal'>
                    <div className='signup-guest-academy-modal-tex'>
                        기관 선택
                        <span className='signup-guest-academy-modal-tex-star'> *</span>
                    </div>
                    <div className='signup-guest-academy-modal-sea'>
                        <input
                            type='text'
                            className='signup-guest-academy-modal-input'
                            value={academyKeyWords}
                            onChange={handleAcademySearch}
                        />
                        <div className='signup-guest-academy-modal-sea2'>
                            <div className='signup-guest-academy-modal-sea3'/>
                            <div className='signup-guest-academy-modal-sea4'>확인</div>
                        </div>
                    </div>
                    <div className='signup-guest-academy-modal-res'/>
                    <div className='signup-guest-academy-modal-res-box'>
                        {
                            isAcademyTouched && !AcademyLoading && academyList.length > 0 &&
                            academyList?.map((item, idx) => {
                                return (
                                    <div
                                        className='signup-guest-academy-modal-res-text'
                                        onClick={()=>handleAcademyName(item.ainame)}
                                    >
                                        {item.ainame}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='signup-guest-academy-modal-res-none'>
                        {
                            !academyKeyWords.trim() &&
                            <span>
                                스타또
                            </span>
                        }
                        {
                            isAcademyTouched && !AcademyLoading && academyList.length <= 0 &&
                            <span>
                            찾으시는 기관이 없으면&nbsp;
                                <span
                                    className='sigup-guest-academy-modal-res-none-etc'
                                >
                                    “여기”
                                </span>
                                &nbsp;를 눌러주세요.
                            </span>
                        }
                        {
                            academyKeyWords.trim() && isAcademyTouched && AcademyLoading &&
                            <div className='signup-guest-academy-modal-inprogress'></div>
                        }
                    </div>
                    <div className="signup-academy-crop-modal-canc">
                        <div className="signup-academy-crop-modal-canc-box"/>
                        <div className="signup-academy-crop-modal-canc-text">취소</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AcademySearch;