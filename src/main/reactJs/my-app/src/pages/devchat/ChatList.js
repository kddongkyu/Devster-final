import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDevChat, setMenuList, wsDisconnect } from '../../redux/devChat';

function ChatList(props) {
    const dispatch = useDispatch();
    const menuList = useSelector(state => state.devChat.menuList);
    const userList = useSelector(state => state.devChat.userList);
    const userImg = process.env.REACT_APP_PHOTO + 'member/';
    const peopleCount = useSelector(state => state.devChat.peopleCount);

    const handleOnCloseMenu = () => {
        dispatch(setMenuList(false));
    }

    const handleClose = () => {
        let b = window.confirm('정말 채팅방에서 나가시겠습니까?');
        if (b) {
            dispatch(wsDisconnect());
            resetDevChat()
        } else {
            return;
        }
    }

    if (!menuList) {
        return null;
    }

    return (
        <div
            className='modal-overlay'
            onClick={handleOnCloseMenu}
        >
            <div
                className='chat-menu-box'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='chat-menu-title'>
                    <div>
                        접속중 [{peopleCount}]
                    </div>
                    <div
                        onClick={handleOnCloseMenu}
                    >
                        <img
                            className='chat-menu-close'
                            alt=''
                            src={require('./assets/menu_modal_close.svg').default}
                        />
                    </div>
                </div>
                <div className='chat-menu-body-list'>
                    {
                        userList.map((user, idx) => (
                            <div key={idx} className='chat-menu-card'>
                                {
                                    user.userProfile ?
                                        <img
                                            alt=''
                                            src={`${userImg}${user.userProfile}`}
                                            className='chat-menu-card-profile'
                                        />
                                        :
                                        <img
                                            alt=''
                                            className='chat-menu-card-profile'
                                            src={require('./assets/logo_profile.svg').default}
                                        />
                                }
                                <div className='chat-menu-card-name'>{user.userName}</div>
                            </div>
                        ))
                    }
                </div>
                <div
                    className='chat-menu-function'
                    onClick={handleClose}
                >
                    채팅 나가기
                </div>
            </div>
        </div>

    );
}

export default ChatList;