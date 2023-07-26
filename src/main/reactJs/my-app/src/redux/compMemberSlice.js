import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cm_reg: '',
    cm_compname: '',
    cm_email: '',
    cm_pass: '',
    cm_tele: '',
    cm_name: '',
    cm_cp: '',
    seconds: null,
    cpSeconds: null,
    emailRegInput: '',
    cpRegInput:'',


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


    isEmailSent: false,
    sendingInProg: false,
    isCpSent: false,
    cpSendingInProg: false,


    isSubmitted: false,
}

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
        setSeconds: (state, action) => {
            state.seconds = action.payload;
        },
        setCpSeconds: (state, action) => {
            state.cpSeconds = action.payload;
        },
        setEmailRegInput: (state, action) => {
            state.emailRegInput = action.payload;
        },
        setCpRegInput:(state,action)=> {
            state.cpRegInput=action.payload;
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


        setIsSubmitted: (state, action) => {
            state.isSubmitted = action.payload;
        },
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


    setSeconds,
    setCpSeconds,
    setEmailRegInput,
    setCpRegInput,



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

    setIsEmailSent,
    setSendingInProg,
    setIsCpSent,
    setCpSendingInProg,

    setIsSubmitted,
} = compMemberSlice.actions;

export default compMemberSlice.reducer;