import React, {useCallback, useEffect, useState} from 'react';
import '../../style/AcademySearch.css';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
    setAcademyIsValid,
    setAi_idx,
    setAi_name,
    setIsSelectedTouched,
} from '../../../../redux/normMemberSlice';
import {useSnackbar} from "notistack";
import ToastAlert from "../../../../api/ToastAlert";
import {jwtHandleError} from "../../../../api/JwtHandleError";

function AcademySearch({isSearchOpen, setIsSearchOpen}) {
    const dispatch = useDispatch();
    const ai_name = useSelector(state => state.norm.ai_name);
    const [academyList, setAcademyList] = useState([]);
    const [academyKeyWords, setAcademyKeyWords] = useState('');
    const [isAcademyTouched, setIsAcademyTouched] = useState(false);
    const [AcademyLoading, setAcademyLoading] = useState(false);
    const [isAcademySelected, setIsAcademySelected] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    const searchAcademy = useCallback(async () => {
        try {
            const res = await axios({
                method:'post',
                url:'/api/member/D0/academy',
                data:JSON.stringify({'name':academyKeyWords}),
                headers:{'Content-Type':'application/json'}
            });
            if (res?.status === 200) {
                if(res.data.some(item=>item.aiidx === 0)) {
                    const filterEtc = res.data.filter(item=>item.aiidx !== 0);
                    setAcademyList(filterEtc);
                    setAcademyLoading(false);
                } else {
                    setAcademyList(res.data);
                    setAcademyLoading(false);
                }
            } else {
                dispatch(setAcademyIsValid(false));
                toastAlert(<>기관명 검색에 실패했습니다.<br/>잠시후 다시 시도해주세요.</>,'warning');
                setAcademyLoading(false);
            }
        } catch (error) {
            dispatch(setAcademyIsValid(false));
            jwtHandleError(error,toastAlert);
            setAcademyLoading(false);
        }
    }, [academyKeyWords, dispatch]);

    useEffect(() => {
        if (isAcademyTouched) {
            const timer = setTimeout(() => {
                if (!academyKeyWords.trim()) {
                    setAcademyLoading(false);
                } else {
                    if (!isAcademySelected) {
                        searchAcademy();
                    }
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [academyKeyWords, isAcademyTouched, isAcademySelected, searchAcademy]);

    const handleAcademySearch = (e) => {
        if (!isAcademyTouched) {
            setIsAcademyTouched(true);
        }
        setAcademyKeyWords(e.target.value);
        setAcademyLoading(true);
        setIsAcademySelected(false);
    }

    const handleAcademyName = (ainame, aiidx) => {
        setAcademyKeyWords(ainame);
        dispatch(setAi_idx(aiidx));
        dispatch(setAi_name(ainame));
        dispatch(setAcademyIsValid(true));
        dispatch(setIsSelectedTouched(true));
        setIsAcademySelected(true);
    }

    const handleAcademyNone = () => {
        dispatch(setAi_idx(0));
        dispatch(setAi_name('기타'));
        dispatch(setAcademyIsValid(true));
        dispatch(setIsSelectedTouched(true));
        setIsSearchOpen(false);
    }

    const confirmSearchModal = () => {
        dispatch(setIsSelectedTouched(true));
        setIsSearchOpen(false);
    }

    const closeSearchModal = () => {
        if (ai_name !== null || ai_name !== '') {
            dispatch(setIsSelectedTouched(true));
            setIsSearchOpen(false);
        } else {
            dispatch(setAi_idx(''));
            dispatch(setAi_name(''));
            dispatch(setIsSelectedTouched(true));
            setIsSearchOpen(false);
        }
    }

    if (!isSearchOpen) {
        return null;
    }

    return (
        <div
            className='modal-overlay'
            onClick={closeSearchModal}
        >
            <div
                className='signup-academy-modal-box'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='signup-academy-modal'>
                    <div className='signup-crop-modal'>
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
                            <div
                                className='signup-guest-academy-modal-sea2'
                                onClick={confirmSearchModal}
                            >
                                <div className='signup-guest-academy-modal-sea3'/>
                                <div className='signup-guest-academy-modal-sea4'>등록</div>
                            </div>
                        </div>
                        <div className='signup-guest-academy-modal-res'/>
                        <div className='signup-guest-academy-modal-res-box'>
                            {
                                academyKeyWords.trim() && isAcademyTouched && !AcademyLoading && academyList.length > 0 &&
                                academyList?.map((item, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className='signup-guest-academy-modal-res-text'
                                            onClick={() => handleAcademyName(item.ainame, item.aiidx)}
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
                                찾으시는 기관명을 검색창에 입력해주세요.
                            </span>
                            }
                            {
                                academyKeyWords.trim() && isAcademyTouched && !AcademyLoading && (academyList.length <= 0 || academyKeyWords === '기타') &&
                                <span>
                            찾으시는 기관이 없으면&nbsp;
                                    <span
                                        className='signup-guest-academy-modal-res-none-etc'
                                        onClick={handleAcademyNone}
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
                        <div
                            className={`signup-academy-crop-modal-canc`}
                            onClick={closeSearchModal}
                        >
                            <div className='signup-academy-crop-modal-canc-box'/>
                            <div className='signup-academy-crop-modal-canc-text'>취소</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AcademySearch;