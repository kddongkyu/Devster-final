import {configureStore} from "@reduxjs/toolkit";
import normMemberReducer from './normMemberSlice';
import compMemberReducer from './compMemberSlice';
import devChatReducer from './devChat';
import {createWebSocketMiddleware} from "./devChat";

const store = configureStore({
    reducer: {
        norm: normMemberReducer,
        comp: compMemberReducer,
        devChat:devChatReducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(createWebSocketMiddleware()),
});

export default store;