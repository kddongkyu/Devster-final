import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    m_name: '',
    m_id: '',
    m_email: '',
    m_pass: '',
    m_nickname: '',
    m_academy: '',

    m_nameIsValid: false,
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
        setM_nameIsValid: (state, action) => {
            state.m_nameIsValid = action.payload;
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
    setM_nameIsValid
} = normMemberSlice.actions;

export default normMemberSlice.reducer;