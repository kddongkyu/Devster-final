import React from 'react';
import '../../style/AddrSearch.css';
import DaumPostcodeEmbed from "react-daum-postcode";
import {useDispatch} from "react-redux";
import {
    setCm_addrFirst,
    setCm_post,
    setFirstAddrValid,
    setIsSelectedTouched,
    setPostIsValid
} from "../../../../redux/compMemberSlice";

function AddrSearch({isAddrOpen, setIsAddrOpen, openPostCode, setOpenPostCode}) {
    const dispatch = useDispatch();

    const themeObj = {
        bgColor: "#F6EFFF",
        searchBgColor: "#FFFFFF",
        contentBgColor: "#FFFFFF",
        pageBgColor: "#FFFFFF",
        textColor: "#444444",
        queryTextColor: "#222222",
        postcodeTextColor: "#FF6FB5",
        emphTextColor: "#9853F0",
        outlineColor: "#F6EFFF",
    }

    const handle = {
        selectAddress: (data) => {
            const addr = `${data.address}${data.buildingName ? ' (' + data.buildingName + ')' : ''}`
            dispatch(setCm_post(data.zonecode));
            dispatch(setCm_addrFirst(addr));
            dispatch(setPostIsValid(true));
            dispatch(setFirstAddrValid(true));
            dispatch(setIsSelectedTouched(true));
            setIsAddrOpen(false);
            setOpenPostCode(false);
        },
    }

    const closeAddrModal = () => {
        dispatch(setIsSelectedTouched(true));
        setIsAddrOpen(false);
        setOpenPostCode(false);
    }

    if (!isAddrOpen) {
        return null;
    }

    return (
        <div
            className='modal-overlay'
            onClick={closeAddrModal}
        >
            <div
                className='signup-comp-addr-modal-box'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='signup-comp-addr-modal'>
                    {
                        openPostCode &&
                        <DaumPostcodeEmbed
                            onComplete={handle.selectAddress}
                            autoClose={false}
                            style={{
                                width: '95%',
                                height: '85%',
                            }}
                            animation={true}
                            theme={themeObj}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default AddrSearch;