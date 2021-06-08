import React, { useEffect, useState } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, SessionBar, VerticalNavi, NoteList} from '../components/CompLink';

function Main({history}:RouteComponentProps){
    const [info, setInfo] = useState({
        noteList : [
            {
                noteId : '1',
                noteName : '할일',
                order : '1'
            },
            {
                noteId : '2',
                noteName : 'React',
                order : '2'
            },
            {
                noteId : '3',
                noteName : 'Javascript',
                order : '3'
            },
            {
                noteId : '4',
                noteName : 'Typescript',
                order : '4'
            },
        ]
    });    

    const onOrderChanged = (selected: string, covered: string)=>{
        const i1 = info.noteList.findIndex(d => d.noteId === selected);
        const i2 = info.noteList.findIndex(d => d.noteId === covered);

        let tmp = info.noteList[i1];
        info.noteList[i1] = info.noteList[i2];
        info.noteList[i2] = tmp;

        setInfo({
            ...info,
            noteList : info.noteList.slice()
        });
    }

    useEffect(()=>{
        if(!localStorage.getItem('userId')){
            history.push('/welcome');
        }
    }, []);

    return (
        <div>
            <SessionBar></SessionBar>
            <VerticalNavi>
                <NoteList noteList={info.noteList} onOrderChanged={onOrderChanged}></NoteList>
            </VerticalNavi>
        </div>
    );
}

export default Main;