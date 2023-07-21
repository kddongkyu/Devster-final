import React, {useRef, useState} from 'react';
import AcademySearch from "./AcademySearch";

function InputAcademy(props) {
    const [isSearchOpen,setIsSearchOpen] = useState(false);
    const searchIconRef = useRef();

    const openSearchModal=()=>{
        setIsSearchOpen(true);
    }

    const handleSearchInput=() =>{
        searchIconRef.current.focus();
        searchIconRef.current.click();
    }

    return (
        <div>
            <div className='signup-guest-academy-text'>
                <span>기관 선택</span>
                <span className='signup-guest-input-name'> *</span>
            </div>
            <input
                type='text'
                className='signup-guest-academy-inputbox'
                ref={searchIconRef}
                readOnly
                onClick={openSearchModal}
            />
            <img
                className='signup-guest-academy-search-ic-icon'
                alt=''
                src={require('../../assets/signup_guest_academy_search_icon.svg').default}
                onClick={handleSearchInput}
            />
            <AcademySearch
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />
        </div>
    );
}

export default InputAcademy;