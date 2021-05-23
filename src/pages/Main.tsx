import React from 'react';
import {RouteComponentProps} from 'react-router-dom';

function Main({history}:RouteComponentProps){
    return (
        <div>
            메인!
            <button onClick={()=> history.push('/welcome')}>go welcome</button>
        </div>
    );
}

export default Main;