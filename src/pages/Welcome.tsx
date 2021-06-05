import React, { useEffect } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Login from './Login';

function Welcome({history}:RouteComponentProps){
    return (
        <div className='welcome-box'>
            <div className='app-name'>My Note</div>
            <Login></Login>
        </div>
    );
}

export default Welcome;