import React from 'react';
import {RouteComponentProps} from 'react-router-dom';

function Welcome({history}:RouteComponentProps){
    return (
        <div>
            웰컴!
            <button onClick={()=> history.push('/main')}>go Main</button>
        </div>
    );
}

export default Welcome;