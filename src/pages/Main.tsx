import React, { useContext, useEffect, useRef, useState } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, SessionBar, VerticalNavi, NoteList, Pusher, NaviFooter, ContentBox} from '../components/CompLink';
import {noteListAttr, contentBoxAttr, editParam} from '../util/interfaces';
import {appContext} from '../App';
import HistoryPopup from './popup/HistoryPopup';
import UT from '../util/util';

interface infoType {
    noteList: noteListAttr[];
    contentInfo: contentBoxAttr;
    isNoteLabelEdit: boolean;
    showHistory: boolean;
    showUserInfo: boolean;
}

type eType = React.MouseEvent<HTMLDivElement> | MouseEvent;

function Main({history}:RouteComponentProps){
    const context = useContext(appContext);
    const cntRef = useRef(0);
    const [info, setInfo] = useState<infoType>({
        noteList : [],
        contentInfo : {
            noteId : '',
            noteName : '',
            nowContent : ''
        },
        isNoteLabelEdit : false,
        showHistory : false,
        showUserInfo : false
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
        info.noteList.forEach((n, i)=> n.ord = i + 1);
        if(!val){ // 편집완료   
            const param = {
                url : 'updateNoteOrder',
                body : {
                    list : info.noteList
                }
            };
            UT.request(param);
        }
        setInfo({
            ...info,
            noteList : info.noteList.slice(),
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
            getNoteList()
        });
    }

    const onDeleteNote = (noteId: string)=>{
        UT.confirm('노트를 삭제 하시겠습니까?', ()=>{
            const param = {
                url : 'deleteNote',
                body : {
                    note_id : noteId,
                    user_id : localStorage.getItem('userId')
                }
            };
            UT.request(param, (res)=>{
                if(!res.errMsg) {
                    UT.alert('처리되었습니다.', ()=> getNoteList());
                }
            });
        });
    }

    const onNoteSelected = (targ: HTMLDivElement)=>{
        const childs = Array.prototype.slice.call(targ.parentNode!.children);

        childs.forEach(el =>{
            el.classList.remove('noteLabel-selected');
        });
        targ.classList.add('noteLabel-selected');

        if(!targ.classList.contains('noteLabel-edit')){
            
        }
        const {id, name} = targ.dataset;
        getTextContent(id!, name!);
    }

    const editNoteName = (p: editParam)=>{
        const param = {
            url : 'updateNoteName',
            body : {
                user_id : localStorage.getItem('userId'),
                note_id : p.noteId,
                note_name : p.noteName
            }
        };
        UT.request(param);

        const idx = info.noteList.findIndex(d => d.note_id === p.noteId);
        info.noteList[idx].note_name = p.noteName;

        setInfo({
            ...info,
            noteList : info.noteList
        });
    }

    const onContentChange = (targ: HTMLTextAreaElement)=>{
        setInfo({
            ...info,
            contentInfo : {
                ...info.contentInfo,
                nowContent : targ.value
            }
        });

        if(cntRef.current > 0) {
            const param = {
                url : 'saveTextContent',
                body : {
                    note_id : targ.dataset.id,
                    user_id : localStorage.getItem('userId'),
                    txt_cont : targ.value 
                },
                showLoad : false
            };
            UT.request(param);
            cntRef.current = 0;
        }else cntRef.current++;
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
            })
        });
    }
    
    const getTextContent = (noteId: string, noteName: string)=>{
        const param = {
            url : 'getTextContent',
            body : {
                user_id : localStorage.getItem('userId'),
                note_id : noteId
            }
        }
        UT.request(param, (res)=>{
            setInfo({
                ...info,
                contentInfo : {
                    nowContent : res.data[0].txt_cont || '',
                    noteId,
                    noteName
                }
            });
        });
    }

    const onClickInfo = (type: string)=>{
        if(type === 'history'){
            setInfo({
                ...info,
                showHistory : true
            });
        }else{
            setInfo({
                ...info,
                showUserInfo : true
            });
        }
    }

    useEffect(()=>{
        if(!localStorage.getItem('userId')){
            history.push('/welcome');
        }
        getNoteList();
    }, []);

    return (
        <div id='mainPage' className='main-box'>
            <SessionBar onClickInfo={onClickInfo}></SessionBar>
            <div style={{display : 'flex'}}>
                <VerticalNavi>
                    <NoteList noteList={info.noteList} onOrderChange={onOrderChange} editNoteName={editNoteName} onNoteSelected={onNoteSelected} onDeleteNote={onDeleteNote} editMode={info.isNoteLabelEdit}></NoteList>
                    <Pusher type='h'></Pusher>
                    <NaviFooter onEdit={onEdit} onAdd={onAdd}></NaviFooter>
                </VerticalNavi>
                <ContentBox textContent={info.contentInfo.nowContent} noteId={info.contentInfo.noteId} noteName={info.contentInfo.noteName} onContentChange={onContentChange}></ContentBox>
            </div>
            {info.showHistory ? <HistoryPopup></HistoryPopup> : null}
        </div>
    );
}

export default Main;