import {configureStore} from "@reduxjs/toolkit";
import normMemberReducer from './normMemberSlice'

const store = configureStore({
    reducer: {
        norm: normMemberReducer,
    }
});

export default store;