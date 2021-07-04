import React from 'react';
import { Toolbar } from './CompLink';
import {FcViewDetails} from 'react-icons/fc';
import { useRef } from 'react';
import { useEffect } from 'react';
import {Button} from './CompLink';


interface contentBoxProps {
    textContent: string;
    noteName: string;
    noteId: string;
    onContentChange: (e: HTMLDivElement, s: string)=>void;
}

function ContentBox({textContent, noteName, noteId, onContentChange}: contentBoxProps){
    const contRef = useRef<HTMLDivElement | null>(null);

    const onSave = ()=>{
        onContentChange(contRef.current!, 'save');
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>)=>{
        if(e.key === 'Tab'){
            e.preventDefault(); // 브라우저 다른 요소로 포커스 이동 차단
        }else{
            onContentChange(e.currentTarget, '');
        }
    }

    useEffect(()=>{
        contRef.current!.innerHTML = textContent;
    }, [noteId]);

    return (
        <div className='content-box'>
            <div className='sessionbar-h'></div>
            <div className='content-box-header'>
                <div className='content-box-note-name'>
                    <FcViewDetails style={{marginRight : '10px'}}></FcViewDetails>
                    {noteName}
                </div>
                <div className='content-box-tools'>
                    <Toolbar></Toolbar>
                    <Button style={{backgroundColor : 'var(--theme-color-3)'}} text='저장' onClick={onSave}></Button>
                </div>
            </div>
            <div ref={contRef} className='cont-box' contentEditable={true} suppressContentEditableWarning={true} data-id={noteId} onKeyDown={onKeyDown}></div>
        </div>
    );
}

export default ContentBox;