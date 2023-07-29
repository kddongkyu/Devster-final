import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axiosIns from "../../api/JwtConfig";
import { setRoomName, wsConnect, wsDisconnect } from "../../redux/devChat";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";
import Room from "./Room";

function DevChat(props) {
    const dispatch = useDispatch();
    const ai_idx = useSelector(state => state.devChat.ai_idx);
    const connected = useSelector(state => state.devChat.connected);
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    
    useEffect(() => {
        const handleBeforeUnload = () => {
            dispatch(wsDisconnect());
        }
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [dispatch]);

    useEffect(() => {
        if (!connected) {
            const handleOnConnect = async () => {
                try {
                    const res = await axiosIns.get('/api/devchat/D1/' + ai_idx)
                    if (res?.status === 200) {
                        dispatch(setRoomName(res.data));
                        dispatch(wsConnect(res.data));
                    }
                } catch (error) {
                    jwtHandleError(error, toastAlert);
                }
            }
            handleOnConnect();
        }
    }, [connected, ai_idx, dispatch, toastAlert]);

    return (
        <div>
            <div className='chat-list'>
                <Room />
            </div>
        </div>
    );
}

export default DevChat;