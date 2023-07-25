import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    m_name: '',
    m_id: '',
    m_email: '',
    m_pass: '',
    m_nickname: '',
    ai_idx: '',
    ai_name: '',
    seconds: null,
    emailRegInput: '',

    idChk: false,
    emailChk: false,
    emailRegChk: false,
    passChk: false,
    nicknameChk: false,

    nameIsValid: false,
    idIsValid: false,
    emailIsValid: false,
    passIsValid: false,
    nicknameIsValid: false,
    academyIsValid: false,
    contractValid:false,

    isEmailSent: false,
    sendingInProg: false,
    isSelectedTouched : false,
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
        setAi_idx: (state, action) => {
            state.ai_idx = action.payload;
        },
        setAi_name: (state, action) => {
            state.ai_name = action.payload;
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
        setPassChk: (state, action) => {
            state.passChk = action.payload;
        },
        setNicknameChk: (state, action) => {
            state.nicknameChk = action.payload;
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
        setNicknameIsValid: (state, action) => {
            state.nicknameIsValid = action.payload;
        },
        setAcademyIsValid: (state, action) => {
            state.academyIsValid = action.payload;
        },
        setContractValid:(state,action) => {
            state.contractValid = action.payload;
        },


        setIsEmailSent: (state, action) => {
            state.isEmailSent = action.payload;
        },
        setSendingInProg: (state, action) => {
            state.sendingInProg = action.payload;
        },
        setIsSelectedTouched:(state,action) => {
            state.isSelectedTouched=action.payload;
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
    setAi_idx,
    setAi_name,
    setSeconds,
    setEmailRegInput,
    setIdChk,
    setEmailChk,
    setEmailRegChk,
    setPassChk,
    setNicknameChk,
    setNameIsValid,
    setIdIsValid,
    setEmailIsValid,
    setPassIsValid,
    setNicknameIsValid,
    setAcademyIsValid,
    setContractValid,
    setIsEmailSent,
    setSendingInProg,
    setIsSelectedTouched,
    setIsSubmitted
} = normMemberSlice.actions;

export default normMemberSlice.reducer;