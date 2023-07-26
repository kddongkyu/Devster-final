import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setContractValid} from "../../../redux/compMemberSlice";
import {IOSSwitch} from "../assets/IosToggleBtn";
import {useSnackbar} from "notistack";
import ToastAlert from "../../../api/ToastAlert";
import {TermsOfPrivate, TermsOfService} from "./terms";

function SignUpNormContract(props) {
    const dispatch = useDispatch();
    const contractValid = useSelector(state => state.comp.contractValid);
    const isSubmitted = useSelector(state => state.comp.isSubmitted);
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

    useEffect(() => {
        console.log('contractValid chaged', contractValid)
    }, [contractValid]);

    return (
        <div>
            <div className='signup-comp-contract-conditio'>
                <b className='signup-comp-contract-conditio1'>약관동의 (필수)</b>
                <IOSSwitch
                    color='secondary'
                    className='signup-comp-contract-conditio-icon'
                    onClick={handleOnContract}
                />
            </div>
            <div className='signup-comp-contract-detail'>
                <div
                    className='signup-comp-contract-detail-o'
                    onClick={() => setServiceModal(true)}
                >
                    서비스이용약관
                </div>
                <TermsOfService
                    serviceModal={serviceModal}
                    setServiceModal={setServiceModal}
                />
                <img
                    className='signup-comp-contract-detail-b-icon'
                    alt=''
                    src={require('../assets/signup_guest_choose_bar.svg').default}
                />
                <div
                    className='signup-comp-contract-detail-t'
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

export default SignUpNormContract;