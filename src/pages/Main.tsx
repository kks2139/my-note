import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {SessionBar} from '../components/CompLink';

function Main({history}:RouteComponentProps){
    return (
        <div>
            메인!
            <button onClick={()=> history.push('/welcome')}>go welcome</button>

            <SessionBar></SessionBar>
        </div>
    );
}

export default Main;