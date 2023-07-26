import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cm_reg: '',
    cm_compname: '',
    cm_email: '',
    cm_pass: '',
    cm_tele: '',
    cm_name: '',
    seconds: null,
    emailRegInput: '',


    regChk: false,
    compChk: false,
    emailChk: false,
    emailRegChk: false,
    passChk: false,


    regIsValid: false,
    compIsValid: false,
    emailIsValid: false,
    passIsValid: false,
    teleIsValid: false,
    nameIsValid: false,


    isEmailSent: false,
    sendingInProg: false,


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
        setSeconds: (state, action) => {
            state.seconds = action.payload;
        },
        setEmailRegInput: (state, action) => {
            state.emailRegInput = action.payload;
        },
        setCm_tele: (state, action) => {
            state.cm_tele = action.payload
        },
        setCm_name: (state, action) => {
            state.cm_name = action.payload
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



        setIsEmailSent: (state, action) => {
            state.isEmailSent = action.payload;
        },
        setSendingInProg: (state, action) => {
            state.sendingInProg = action.payload;
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


    setSeconds,
    setEmailRegInput,


    setRegChk,
    setCompChk,
    setEmailChk,
    setEmailRegChk,
    setPassChk,


    setRegIsValid,
    setCompIsValid,
    setEmailIsValid,
    setPassIsValid,
    setTeleIsValid,
    setNameIsValid,

    setIsEmailSent,
    setSendingInProg,

    setIsSubmitted,
} = compMemberSlice.actions;

export default compMemberSlice.reducer;