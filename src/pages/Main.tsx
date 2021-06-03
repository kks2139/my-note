import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {SessionBar, VerticalNavi} from '../components/CompLink';

function Main({history}:RouteComponentProps){
    return (
        <div>
            {/* 메인!
            <button onClick={()=> history.push('/welcome')}>go welcome</button> */}

            <SessionBar></SessionBar>
            <VerticalNavi></VerticalNavi>
        </div>
    );
}

export default Main;