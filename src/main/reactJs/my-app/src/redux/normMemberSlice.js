import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    m_name: '',
    m_id: '',
    m_email: '',
    m_pass: '',
    m_nickname: '',
    m_academy: '',
    seconds: null,
    emailRegInput: '',

    idChk: false,
    emailChk: false,
    emailRegChk: false,

    nameIsValid: false,
    idIsValid: false,
    emailIsValid: false,
    passIsValid: false,

    isEmailSent: false,

    isSubmitted: false,
};

export const normMemberSlice = createSlice({
    name: 'normMember',
    initialState,
    reducers: {
        setM_name: (state, action) => {
            state.m_name = action.payload;
        },
        setM_id: (state, action) => {
            state.m_id = action.payload;
        },
        setM_email: (state, action) => {
            state.m_email = action.payload;
        },
        setM_pass: (state, action) => {
            state.m_pass = action.payload;
        },
        setM_nickname: (state, action) => {
            state.m_nickname = action.payload;
        },
        setM_academy: (state, action) => {
            state.m_academy = action.payload;
        },
        setSeconds: (state, action) => {
            state.seconds = action.payload;
        },
        setEmailRegInput: (state, action) => {
            state.emailRegInput = action.payload;
        },


        setIdChk: (state, action) => {
            state.idChk = action.payload;
        },
        setEmailChk: (state, action) => {
            state.emailChk = action.payload;
        },
        setEmailRegChk: (state, action) => {
            state.emailRegChk = action.payload;
        },



        setNameIsValid: (state, action) => {
            state.nameIsValid = action.payload;
        },
        setIdIsValid: (state, action) => {
            state.idIsValid = action.payload;
        },
        setEmailIsValid: (state, action) => {
            state.emailIsValid = action.payload;
        },
        setPassIsValid: (state, action) => {
            state.passIsValid = action.payload;
        },



        setIsEmailSent: (state, action) => {
            state.isEmailSent = action.payload;
        },
        setIsSubmitted: (state, action) => {
            state.isSubmitted = action.payload;
        },
    },
});

export const {
    setM_name,
    setM_id,
    setM_email,
    setM_pass,
    setM_nickname,
    setM_academy,
    setSeconds,
    setEmailRegInput,
    setIdChk,
    setEmailChk,
    setEmailRegChk,
    setNameIsValid,
    setIdIsValid,
    setEmailIsValid,
    setPassIsValid,
    setIsEmailSent,
    setIsSubmitted
} = normMemberSlice.actions;

export default normMemberSlice.reducer;