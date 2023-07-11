import React from 'react';

function Message({item}) {
    const data=JSON.parse(item);
    return (
        <div>
            <b>{data.userName}</b> {data.msg}
        </div>
    );
}

export default React.memo(Message);