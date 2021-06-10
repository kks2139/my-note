import React, { useEffect, useRef, useState } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, SessionBar, VerticalNavi, NoteList, Pusher, NaviFooter} from '../components/CompLink';
import UT from '../util/util';

function Main({history}:RouteComponentProps){
    const [info, setInfo] = useState({
        noteList : [
            {
                noteId : '1',
                noteName : '할일',
                order : '1',
                color :  UT.randomColor()
            },
            {
                noteId : '2',
                noteName : 'React',
                order : '2',
                color :  UT.randomColor()
            },
            {
                noteId : '3',
                noteName : 'Javascript',
                order : '3',
                color :  UT.randomColor()
            },
            {
                noteId : '4',
                noteName : 'Typescript',
                order : '4',
                color :  UT.randomColor()
            },
        ]
    });    

    const onOrderChange = (selected: string, covered: string)=>{
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
        <div id='mainPage' className='main-box'>
            <SessionBar></SessionBar>
            <VerticalNavi>
                <NoteList noteList={info.noteList} onOrderChange={onOrderChange}></NoteList>
                <Pusher type='h'></Pusher>
                <NaviFooter></NaviFooter>
            </VerticalNavi>
        </div>
    );
}

export default Main;