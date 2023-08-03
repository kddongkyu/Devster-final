import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axiosIns from "../../api/JwtConfig";
import { setAi_idx, setRoomName, setUserName, setUserProfile, wsConnect, wsDisconnect } from "../../redux/devChat";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";
import { checkToken } from "../../api/checkToken";
import {Room} from "./index";

function DevChat(props) {
    const dispatch = useDispatch();
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
                const de = checkToken();
                try {
                    const res = await axiosIns.get(`/api/member/D1/${de.idx}`);
                    if (res?.status === 200) {
                        dispatch(setAi_idx(res.data.ai_idx));
                        dispatch(setRoomName(res.data.ai_name));
                        dispatch(setUserName(res.data.m_nickname));
                        dispatch(setUserProfile(res.data.m_photo));
                        dispatch(wsConnect(res.data.ai_idx));
                    }
                } catch (error) {
                    jwtHandleError(error, toastAlert);
                }
            }
            handleOnConnect();
        }
    }, [connected]);

    return (
        <div>
            <div className='chat-list'>
                <Room />
            </div>
        </div>
    );
}

export default DevChat;