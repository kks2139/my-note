import React, { useState } from 'react';

type eType = React.ChangeEvent<HTMLTextAreaElement>;

interface contentBoxProps {
    textContent: string;
    noteName: string;
    onContentChange: (s: string)=>void;
}

function ContentBox({textContent, noteName, onContentChange}: contentBoxProps){
    const onChange = (e: eType)=>{
        onContentChange(e.currentTarget.value);
    }

    return (
        <div className='content-box'>
            <div className='sessionbar-h'></div>
            <div className='content-box-note-name'>{noteName}</div>
            <textarea value={textContent} onChange={onChange}></textarea>
            
        </div>
    );
}

export default ContentBox;