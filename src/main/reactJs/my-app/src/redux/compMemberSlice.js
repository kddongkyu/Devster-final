import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cm_reg: '',
    cm_compname: '',
    cm_email: '',
    cm_pass: '',
    cm_tele: '',
    cm_name: '',
    cm_cp: '',
    cm_post: '',
    cm_addr: '',
    cm_addrFirst: '',
    cm_addrSecond: '',
    seconds: null,
    cpSeconds: null,
    emailRegInput: '',
    cpRegInput: '',
    idType: false,

    regChk: false,
    compChk: false,
    emailChk: false,
    emailRegChk: false,
    passChk: false,
    cpChk: false,
    cpRegChk: false,

    regIsValid: false,
    compIsValid: false,
    emailIsValid: false,
    passIsValid: false,
    teleIsValid: false,
    nameIsValid: false,
    cpIsValid: false,
    postIsValid: false,
    firstAddrValid: false,
    secondAddrValid: false,
    contractValid: false,

    isEmailSent: false,
    sendingInProg: false,
    isCpSent: false,
    cpSendingInProg: false,
    isSelectedTouched: false,
    isSubmitted: false,
};

export const compMemberSlice = createSlice({
    name: 'compMember',
    initialState,
    reducers: {
        setCm_reg: (state, action) => {
            state.cm_reg = action.payload;
        },
        setCm_compname: (state, action) => {
            state.cm_compname = action.payload;
        },
        setCm_email: (state, action) => {
            state.cm_email = action.payload;
        },
        setCm_pass: (state, action) => {
            state.cm_pass = action.payload;
        },
        setCm_tele: (state, action) => {
            state.cm_tele = action.payload;
        },
        setCm_name: (state, action) => {
            state.cm_name = action.payload;
        },
        setCm_cp: (state, action) => {
            state.cm_cp = action.payload;
        },
        setCm_post: (state, action) => {
            state.cm_post = action.payload;
        },
        setCm_addr: (state, action) => {
            state.cm_addr = action.payload;
        },
        setCm_addrFirst: (state, action) => {
            state.cm_addrFirst = action.payload;
        },
        setCm_addrSecond: (state, action) => {
            state.cm_addrSecond = action.payload;
        },
        setSeconds: (state, action) => {
            state.seconds = action.payload;
        },
        setCpSeconds: (state, action) => {
            state.cpSeconds = action.payload;
        },
        setEmailRegInput: (state, action) => {
            state.emailRegInput = action.payload;
        },
        setCpRegInput: (state, action) => {
            state.cpRegInput = action.payload;
        },
        setIdType: (state, action) => {
            state.idType = action.payload;
        },


        setRegChk: (state, action) => {
            state.regChk = action.payload;
        },
        setCompChk: (state, action) => {
            state.compChk = action.payload;
        },
        setEmailRegChk: (state, action) => {
            state.emailRegChk = action.payload;
        },
        setEmailChk: (state, action) => {
            state.emailChk = action.payload;
        },
        setPassChk: (state, action) => {
            state.passChk = action.payload;
        },
        setCpRegChk: (state, action) => {
            state.cpRegChk = action.payload;
        },
        setCpChk: (state, action) => {
            state.cpChk = action.payload;
        },


        setRegIsValid: (state, action) => {
            state.regIsValid = action.payload;
        },
        setCompIsValid: (state, action) => {
            state.compIsValid = action.payload;
        },
        setEmailIsValid: (state, action) => {
            state.emailIsValid = action.payload;
        },
        setPassIsValid: (state, action) => {
            state.passIsValid = action.payload;
        },
        setTeleIsValid: (state, action) => {
            state.teleIsValid = action.payload;
        },
        setNameIsValid: (state, action) => {
            state.nameIsValid = action.payload;
        },
        setCpIsValid: (state, action) => {
            state.cpIsValid = action.payload;
        },
        setPostIsValid: (state, action) => {
            state.postIsValid = action.payload;
        },
        setFirstAddrValid: (state, action) => {
            state.firstAddrValid = action.payload;
        },
        setSecondAddrValid: (state, action) => {
            state.secondAddrValid = action.payload;
        },
        setContractValid: (state, action) => {
            state.contractValid = action.payload;
        },


        setIsEmailSent: (state, action) => {
            state.isEmailSent = action.payload;
        },
        setSendingInProg: (state, action) => {
            state.sendingInProg = action.payload;
        },
        setIsCpSent: (state, action) => {
            state.isCpSent = action.payload;
        },
        setCpSendingInProg: (state, action) => {
            state.cpSendingInProg = action.payload;
        },
        setIsSelectedTouched: (state, action) => {
            state.isSelectedTouched = action.payload;
        },
        setIsSubmitted: (state, action) => {
            state.isSubmitted = action.payload;
        },

        resetCompMember: () => initialState,
    },
});

export const {
    setCm_reg,
    setCm_compname,
    setCm_email,
    setCm_pass,
    setCm_tele,
    setCm_name,
    setCm_cp,
    setCm_post,
    setCm_addr,
    setCm_addrFirst,
    setCm_addrSecond,

    setSeconds,
    setCpSeconds,
    setEmailRegInput,
    setCpRegInput,
    setIdType,

    setRegChk,
    setCompChk,
    setEmailChk,
    setEmailRegChk,
    setPassChk,
    setCpChk,
    setCpRegChk,

    setRegIsValid,
    setCompIsValid,
    setEmailIsValid,
    setPassIsValid,
    setTeleIsValid,
    setNameIsValid,
    setCpIsValid,
    setPostIsValid,
    setFirstAddrValid,
    setSecondAddrValid,
    setContractValid,

    setIsEmailSent,
    setSendingInProg,
    setIsCpSent,
    setCpSendingInProg,
    setIsSelectedTouched,
    setIsSubmitted,

    resetCompMember,
} = compMemberSlice.actions;

export default compMemberSlice.reducer;