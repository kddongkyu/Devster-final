import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setContractValid} from "../../../redux/normMemberSlice";
import {IOSSwitch} from "../assets/IosToggleBtn";
import {TermsOfPrivate, TermsOfService} from "./terms";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";

function SocialContract(props) {
    const dispatch = useDispatch();
    const contractValid = useSelector(state => state.norm.contractValid);
    const isSubmitted = useSelector(state => state.norm.isSubmitted);
    const [serviceModal, setServiceModal] = useState(false);
    const [privateModal, setPrivateModal] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    useEffect(() => {
        if (!contractValid && isSubmitted) {
            toastAlert('약관에 동의해주세요', 'warning');
        }
    }, [isSubmitted]);

    const handleOnContract = () => {
        dispatch(setContractValid(!contractValid));
    }

    return (
        <div>
            <div className='signup-guest-contract-conditio'>
                <b className='signup-guest-contract-conditio1'>약관동의 (필수)</b>
                <IOSSwitch
                    color='secondary'
                    className='signup-guest-contract-conditio-icon'
                    onClick={handleOnContract}
                />
            </div>
            <div className='signup-guest-contract-detail'>
                <div
                    className='signup-guest-contract-detail-o'
                    onClick={() => setServiceModal(true)}
                >
                    서비스이용약관
                </div>
                <TermsOfService
                    serviceModal={serviceModal}
                    setServiceModal={setServiceModal}
                />
                <img
                    className='signup-guest-contract-detail-b-icon'
                    alt=''
                    src={require('../assets/signup_guest_choose_bar.svg').default}
                />
                <div
                    className='signup-guest-contract-detail-t'
                    onClick={() => setPrivateModal(true)}
                >
                    개인정보처리방침
                </div>
                <TermsOfPrivate
                    privateModal={privateModal}
                    setPrivateModal={setPrivateModal}
                />
            </div>
        </div>
    );
}

export default SocialContract;