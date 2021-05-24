import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Login from './Login';

function Welcome({history}:RouteComponentProps){
    return (
        <div>
            웰컴!
            <button onClick={()=> history.push('/main')}>go Main</button>
            <Login></Login>
        </div>
    );
}

export default Welcome;