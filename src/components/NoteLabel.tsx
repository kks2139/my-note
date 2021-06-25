import React, { useEffect, useRef, useState } from 'react';
import {noteListAttr, editParam} from '../util/interfaces';
import UT from '../util/util';
import {Input} from './CompLink';

type eType = React.MouseEvent<HTMLDivElement>;

interface noteLabelProps extends noteListAttr {
    edit: boolean;
    onDown: (e: eType)=>void;
    onUp: (e: eType)=>void;
    editNoteName: (p : editParam)=>void;
    onClickNote: (el: HTMLDivElement)=>void;
    onClickDelete: (val: string)=>void;
}

function NoteLabel({note_id, note_name, ord, color, txt_cont, edit=false, onDown, onUp, editNoteName, onClickNote, onClickDelete}: noteLabelProps){
    const [label, setLabel] = useState(note_name);
    const [showInput, setShowInput] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    const onMouseDown = (e: eType)=>{
        onDown(e);
    }

    const onMouseUp = (e: eType)=>{
        onUp(e);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setLabel(e.currentTarget.value);
    }

    const onClick = ()=>{
        onClickNote(divRef.current!);
    }

    const onImgClick = (e: React.MouseEvent<HTMLImageElement>)=>{
        e.stopPropagation();
        if(e.currentTarget.id === 'ok'){
            editNoteName({
                noteName : label,
                noteId : divRef.current!.dataset.id!
            });
        }
        setShowInput(!showInput);
        setLabel(note_name);
    }

    const onDelImgClick = ()=>{
        onClickDelete(divRef.current!.dataset.id!);
    }

    useEffect(()=>{
        divRef.current!.style.borderLeft = `7px solid ${color}`;

        if(ord === 1) onClick();
    }, []);

    useEffect(()=>{
        if(!edit) setShowInput(false);
        setLabel(note_name);
    }, [edit]);

    return (
        <div className='noteLabel-box' ref={divRef} data-id={note_id} data-name={note_name} data-ord={ord} onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            {showInput ? 
            <div className='note-name-edit'>
                <Input text={label} onChange={onChange}></Input>
                <img src='/x_1.png' onClick={onImgClick}></img>
                <img src='/check.png' id='ok' onClick={onImgClick}></img>
            </div> :
            <div className='note-name'>
                <span>{note_name}</span>
                {edit ? 
                    <div>
                        <img src='/pencil_6.png' onClick={onImgClick}></img> 
                        <img src='/delete_2.png' onClick={onDelImgClick}></img>
                    </div> 
                : null}
            </div>}
        </div>
    );
}

export default NoteLabel;