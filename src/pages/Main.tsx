import React, { useEffect, useState } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, SessionBar, VerticalNavi, NoteList} from '../components/CompLink';

function Main({history}:RouteComponentProps){
    const [info, setInfo] = useState({
        noteList : ['할일', 'React', 'Javascript', 'Typescript']
    });    

    useEffect(()=>{
        if(!localStorage.getItem('userId')){
            history.push('/welcome');
        }
    }, []);

    return (
        <div>
            <SessionBar></SessionBar>
            <VerticalNavi>
                <NoteList noteList={info.noteList}></NoteList>
            </VerticalNavi>
        </div>
    );
}

export default Main;