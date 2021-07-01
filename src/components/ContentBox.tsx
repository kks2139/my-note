import React, { useState } from 'react';
import { Toolbar } from './CompLink';
import {FcViewDetails} from 'react-icons/fc';


interface contentBoxProps {
    textContent: string;
    noteName: string;
    noteId: string;
    onContentChange: (e: HTMLTextAreaElement)=>void;
}

function ContentBox({textContent, noteName, noteId, onContentChange}: contentBoxProps){
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        onContentChange(e.currentTarget);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if(e.key === 'Tab'){
            e.preventDefault(); // 브라우저 다른 요소로 포커스 이동 차단
        }
    }

    return (
        <div className='content-box'>
            <div className='sessionbar-h'></div>
            <div className='content-box-header'>
                <div className='content-box-note-name'>
                    <FcViewDetails style={{marginRight : '10px'}}></FcViewDetails>
                    {noteName}
                </div>
                <Toolbar></Toolbar>
            </div>
            <textarea value={textContent} data-id={noteId} onChange={onChange} onKeyDown={onKeyDown}></textarea>
        </div>
    );
}

export default ContentBox;