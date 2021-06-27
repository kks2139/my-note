import React, { useState } from 'react';

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
            <div className='content-box-note-name'>{noteName}</div>
            <textarea value={textContent} data-id={noteId} onChange={onChange} onKeyDown={onKeyDown}></textarea>
        </div>
    );
}

export default ContentBox;