import React, { useContext, useEffect, useRef, useState } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, SessionBar, VerticalNavi, NoteList, Pusher, NaviFooter, ContentBox} from '../components/CompLink';
import {appContext} from '../App';
import {noteListAttr} from '../util/interfaces';
import UT from '../util/util';

interface stateType {
    noteList: noteListAttr[];
    isNoteLabelEdit: boolean;
}

function Main({history}:RouteComponentProps){
    const context = useContext(appContext);
    const [info, setInfo] = useState<stateType>({
        noteList : [],
        isNoteLabelEdit : false
    });    

    const onOrderChange = (selected: string, covered: string)=>{
        const i1 = info.noteList.findIndex(d => d.note_id === selected);
        const i2 = info.noteList.findIndex(d => d.note_id === covered);

        let tmp = info.noteList[i1];
        info.noteList[i1] = info.noteList[i2];
        info.noteList[i2] = tmp;

        setInfo({
            ...info,
            noteList : info.noteList.slice()
        });
    }

    const onEdit = (val: boolean)=>{
        setInfo({
            ...info,
            isNoteLabelEdit : val
        });
    }

    useEffect(()=>{
        if(!localStorage.getItem('userId')){
            history.push('/welcome');
        }

        const param = {
            url : 'getNoteList',
            body : {
                user_id : localStorage.getItem('userId')
            }
        }
        UT.request(param, (res)=>{
            setInfo({
                ...info,
                noteList : res.data
            })
        })

    }, []);

    return (
        <div id='mainPage' className='main-box'>
            <SessionBar></SessionBar>
            <div style={{display : 'flex'}}>
                <VerticalNavi>
                    <NoteList noteList={info.noteList} onOrderChange={onOrderChange} editMode={info.isNoteLabelEdit}></NoteList>
                    <Pusher type='h'></Pusher>
                        <NaviFooter onEdit={onEdit}></NaviFooter>
                </VerticalNavi>
                <ContentBox></ContentBox>
            </div>
        </div>
    );
}

export default Main;