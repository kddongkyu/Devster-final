import {createAction, createSlice} from "@reduxjs/toolkit";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";

const initialState = {
    ai_idx: 1,
    roomName: '',
    roomId:'',
    msg: [],
    peopleCount: 0,
    connected: false,
    hidden: false,
    userName: '',
    sendingMsg: '',
    modalOpen: false,
    unreadMsg: 0,
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
        setRoomId:(state,action) => {
            state.roomId=action.payload;
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
            if(!state.hidden && action.payload) {
                state.msg = state.msg.filter(item=> item.type !== 'READ_MARKER').concat({
                    type:'READ_MARKER',
                    msg:'------------ 여기 -------------',
                });
            }
            state.hidden = action.payload;
          },
        setUserName: (state, action) => {
            state.userName = action.payload;
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

        resetDevChat:() => initialState,
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
    setUserName,
    setSendingMsg,
    setModalOpen,
    incUnreadMsg,
    resetUnreadMsg,
    resetDevChat,
} = devChatSlice.actions;

export const wsConnect = createAction('SOCKET_CONNECT');
export const wsDisconnect = createAction('SOCKET_DISCONNECT');
export const wsPublish = createAction('SOCKET_PUBLISH');

export default devChatSlice.reducer;

export const createWebSocketMiddleware = () => {
    let client;

    return (storeAPI) => (next) => (action) => {
        switch (action.type) {
            case 'SOCKET_CONNECT' :
                let sock = new SockJS('https://localhost/wss');
                client = StompJS.Stomp.over(sock);
                client.connect({}, () => {
                    client.subscribe('/sub/' + action.payload, data => {
                        let parsedData=JSON.parse(data.body);
                        storeAPI.dispatch(setMsg(parsedData));
                        if(storeAPI.getState().devChat.hidden) {
                            storeAPI.dispatch(incUnreadMsg());
                        }
                    });
                    client.subscribe('/sub/'+ action.payload + '/ppl', data => {
                        storeAPI.dispatch(setPeopleCount(data.body));
                    });
                    storeAPI.dispatch(setRoomId(action.payload));
                    //username 가져와서 dispatch로 세터해주고 넘겨줘야함(나중에);
                    storeAPI.dispatch(wsPublish({
                        type:'ENTER',
                    }));
                    storeAPI.dispatch(setConnected(true));
                });
                break;

            case 'SOCKET_DISCONNECT':
                if (client) {
                    const roomId=storeAPI.getState().devChat.roomId;
                    client.send('/pub/msg',{},JSON.stringify({
                        type:'EXIT',
                        roomId,
                        userName:'',
                        msg:'',
                        date:'',
                    }));
                    client.disconnect();
                    storeAPI.dispatch(setConnected(false));
                    storeAPI.dispatch(resetDevChat());
                }
                client = undefined;
                break;

            case 'SOCKET_PUBLISH':
                if (client) {
                    const roomId=storeAPI.getState().devChat.roomId;
                    const {type, userName, msg} = action.payload;
                    client.send('/pub/msg', {}, JSON.stringify({
                        type,
                        roomId,
                        userName,
                        msg,
                    }));
                }
                break;
            default:
                return next(action);
        }
    }
}

