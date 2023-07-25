import {configureStore} from "@reduxjs/toolkit";
import normMemberReducer from './normMemberSlice';
import compMemberReducer from './compMemberSlice';

const store = configureStore({
    reducer: {
        norm: normMemberReducer,
        comp: compMemberReducer,
    }
});

export default store;