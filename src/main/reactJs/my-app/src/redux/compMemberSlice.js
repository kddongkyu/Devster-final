import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cm_reg: '',

    regChk:false,

    regIsValid:false,
}

export const compMemberSlice = createSlice({
    name: 'compMember',
    initialState,
    reducers: {
        setCm_reg: (state, action) => {
            state.cm_reg = action.payload;
        },


        setRegChk:(state,action) => {
            state.regChk = action.payload;
        },


        setRegIsValid:(state,action)=>{
            state.regIsValid = action.payload;
        }
    },
});

export const {
    setCm_reg,


    setRegChk,


    setRegIsValid,
} = compMemberSlice.actions;

export default compMemberSlice.reducer;