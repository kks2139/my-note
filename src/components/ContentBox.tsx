import React, { useState } from 'react';

type eType = React.ChangeEvent<HTMLTextAreaElement>;

interface contentBoxProps {
    textContent: string;
    noteName: string;
    noteId: string;
    onContentChange: (e: eType)=>void;
}

function ContentBox({textContent, noteName, noteId, onContentChange}: contentBoxProps){
    const onChange = (e: eType)=>{
        onContentChange(e);
    }

    return (
        <div className='content-box'>
            <div className='sessionbar-h'></div>
            <div className='content-box-note-name'>{noteName}</div>
            <textarea value={textContent} data-id={noteId} onChange={onChange}></textarea>
            
        </div>
    );
}

export default ContentBox;