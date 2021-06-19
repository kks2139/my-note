import React, { useContext, useEffect, useRef, useState } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, SessionBar, VerticalNavi, NoteList, Pusher, NaviFooter, ContentBox} from '../components/CompLink';
import {appContext} from '../App';
import {noteListAttr, contentBoxAttr} from '../util/interfaces';
import UT from '../util/util';

interface infoType {
    noteList: noteListAttr[];
    contentInfo: contentBoxAttr;
    isNoteLabelEdit: boolean;
}

type eType = React.MouseEvent<HTMLDivElement> | MouseEvent;

function Main({history}:RouteComponentProps){
    const context = useContext(appContext);
    const [info, setInfo] = useState<infoType>({
        noteList : [],
        contentInfo : {
            noteName : '',
            nowContent : ''
        },
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

    const onAdd = (noteName: string, color: string)=>{
        const ord = info.noteList.length === 0 ? 1 : info.noteList.sort((a, b)=> b.ord - a.ord)[0].ord + 1;
        const param = {
            url : 'insertNote',
            body : {
                user_id : localStorage.getItem('userId'),
                note_name : noteName,
                txt_cont : '새 노트',
                ord,
                color
            }
        };
        UT.request(param, (res)=>{
            const msg = res.errMsg || '노트가 추가되었습니다.';
            UT.alert(msg, ()=> getNoteList()); 
        });
    }

    const onNoteSelected = (e: eType, contInfo: contentBoxAttr)=>{
        const targ = e.currentTarget as HTMLDivElement;
        const childs = Array.prototype.slice.call(targ.parentNode!.children);

        childs.forEach(el =>{
            el.classList.remove('noteLabel-selected');
        });
        targ.classList.add('noteLabel-selected');

        setInfo({
            ...info,
            contentInfo : {
                noteName : contInfo.noteName,
                nowContent : contInfo.nowContent
            }
        });
    }

    const onContentChange = (cont: string)=>{
        setInfo({
            ...info,
            contentInfo : {
                ...info.contentInfo,
                nowContent : cont
            }
        });
    }

    const getNoteList = ()=>{
        const param = {
            url : 'getNoteList',
            body : {
                user_id : localStorage.getItem('userId')
            }
        }
        UT.request(param, (res)=>{
            setInfo({
                ...info,
                noteList : res.data,
                contentInfo : {
                    noteName : res.data[0] ? res.data[0].note_name : '',
                    nowContent : res.data[0] ? res.data[0].txt_cont : ''
                }
            })
        });
    }

    useEffect(()=>{
        if(!localStorage.getItem('userId')){
            history.push('/welcome');
        }
        getNoteList();
    }, []);

    return (
        <div id='mainPage' className='main-box'>
            <SessionBar></SessionBar>
            <div style={{display : 'flex'}}>
                <VerticalNavi>
                    <NoteList noteList={info.noteList} onOrderChange={onOrderChange} onNoteSelected={onNoteSelected} editMode={info.isNoteLabelEdit}></NoteList>
                    <Pusher type='h'></Pusher>
                    <NaviFooter onEdit={onEdit} onAdd={onAdd}></NaviFooter>
                </VerticalNavi>
                <ContentBox textContent={info.contentInfo.nowContent} noteName={info.contentInfo.noteName} onContentChange={onContentChange}></ContentBox>
            </div>
        </div>
    );
}

export default Main;