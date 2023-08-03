import { createAction, createSlice } from "@reduxjs/toolkit";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";

const initialState = {
    ai_idx: '',
    roomName: '',
    roomId: '',
    msg: [],
    peopleCount: 0,
    connected: false,
    hidden: false,
    userName: '',
    userProfile: '',
    sendingMsg: '',
    modalOpen: false,
    unreadMsg: 0,
    userList: [],
    imgDetail:false,
    menuList:false,
    selectedMessage:null,
};

export const devChatSlice = createSlice({
    name: 'devChat',
    initialState,
    reducers: {
        setAi_idx: (state, action) => {
            state.ai_idx = action.payload;
        },
        setRoomName: (state, action) => {
            state.roomName = action.payload;
        },
        setRoomId: (state, action) => {
            state.roomId = action.payload;
        },
        setMsg: (state, action) => {
            state.msg.push(action.payload);
        },
        setPeopleCount: (state, action) => {
            state.peopleCount = action.payload;
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        setHidden: (state, action) => {
            if (!state.hidden && action.payload) {
                state.msg = state.msg.filter(item => item.type !== 'READ_MARKER').concat({
                    type: 'READ_MARKER',
                });
            }
            state.hidden = action.payload;
        },
        removeMarker: (state) => {
            state.msg = state.msg.filter(item => item.type !== 'READ_MARKER');
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserProfile: (state, action) => {
            state.userProfile = action.payload;
        },
        setSendingMsg: (state, action) => {
            state.sendingMsg = action.payload;
        },
        setModalOpen: (state, action) => {
            state.modalOpen = action.payload;
        },
        incUnreadMsg: (state) => {
            state.unreadMsg += 1;
        },
        resetUnreadMsg: (state) => {
            state.unreadMsg = 0;
        },
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
        setImgDetail:(state,action) => {
            state.imgDetail = action.payload;
        },
        setMenuList:(state,action) => {
            state.menuList=action.payload;
        },
        setSelectedMessage :(state,action) => {
            state.selectedMessage = action.payload;
        },

        resetDevChat: () => initialState,
    },
});

export const {
    setAi_idx,
    setRoomName,
    setRoomId,
    setMsg,
    setPeopleCount,
    setConnected,
    setHidden,
    removeMarker,
    setUserName,
    setUserProfile,
    setSendingMsg,
    setModalOpen,
    incUnreadMsg,
    resetUnreadMsg,
    setUserList,
    setImgDetail,
    setMenuList,
    setSelectedMessage,
    resetDevChat,

} = devChatSlice.actions;

export const wsConnect = createAction('SOCKET_CONNECT');
export const wsDisconnect = createAction('SOCKET_DISCONNECT');
export const wsPublish = createAction('SOCKET_PUBLISH');

export default devChatSlice.reducer;

export const createWebSocketMiddleware = () => {
    let client;

    return (storeAPI) => (next) => (action) => {
        const roomId = storeAPI.getState().devChat.roomId;
        const userName=storeAPI.getState().devChat.userName;
        const userProfile=storeAPI.getState().devChat.userProfile;
        const date = new Date().toISOString();

        switch (action.type) {
            case 'SOCKET_CONNECT':
                let sock = new SockJS('https://devster.kr/wss');
                client = StompJS.Stomp.over(sock);
                client.debug = () => { };
                client.connect({}, () => {
                    client.subscribe('/sub/' + action.payload, data => {
                        let parsedData = JSON.parse(data.body);
                        storeAPI.dispatch(setMsg(parsedData));
                        if (storeAPI.getState().devChat.hidden && parsedData.type === 'CHAT') {
                            storeAPI.dispatch(incUnreadMsg());
                        }
                    });
                    client.subscribe('/sub/' + action.payload + '/ppl', data => {
                        storeAPI.dispatch(setPeopleCount(data.body));
                    });
                    client.subscribe('/sub/' + action.payload + '/users', data => {
                        let parsedData = JSON.parse(data.body);
                        storeAPI.dispatch(setUserList(parsedData));
                    });
                    storeAPI.dispatch(setRoomId(action.payload));
                    storeAPI.dispatch(wsPublish({
                        type: 'ENTER',
                        roomId,
                        userName,
                        userProfile,
                    }));
                    storeAPI.dispatch(setConnected(true));
                });
                break;

            case 'SOCKET_DISCONNECT':
                if (client) {
                    client.disconnect();
                    storeAPI.dispatch(setConnected(false));
                    storeAPI.dispatch(resetDevChat());
                }
                client = undefined;
                break;

            case 'SOCKET_PUBLISH':
                if (client) {
                    const { type, userName, userProfile, msg, msgImg } = action.payload;
                    client.send('/pub/msg', {}, JSON.stringify({
                        type,
                        roomId,
                        userName,
                        userProfile,
                        msg,
                        msgImg,
                        date,
                    }));
                }
                break;
            default:
                return next(action);
        }
    }
}

