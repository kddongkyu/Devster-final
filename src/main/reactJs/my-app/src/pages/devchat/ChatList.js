import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function ChatList(props) {
    const userList = useSelector(state => state.devChat.userList);
    return (
        <div>
            {
                userList.map((user,idx)=>(
                    <div key={idx}>
                        {user.userName}
                        {user.userProfile}
                    </div>
                ))
            }
        </div>
    );
}

export default ChatList;