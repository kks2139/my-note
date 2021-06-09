import React from 'react';

interface puhserProps {
    type?: string;
}

function Pusher({type='w'}: puhserProps){
    return <div className={type === 'w' ? 'push-w' : 'push-h'}></div>;
}

export default Pusher;