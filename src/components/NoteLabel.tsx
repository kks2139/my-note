import React, { useEffect, useRef, useState } from 'react';
import {noteListAttr, contentBoxAttr} from '../util/interfaces';

type eType = React.MouseEvent<HTMLDivElement>;

interface noteLabelProps extends noteListAttr {
    edit: boolean;
    onDown: (e: eType)=>void;
    onUp: (e: eType)=>void;
    onClickNote: (e: eType, obj: contentBoxAttr)=>void;
}

function NoteLabel({note_id, note_name, ord, color, txt_cont, edit=false, onDown, onUp, onClickNote}: noteLabelProps){
    const [label, setLabel] = useState(note_name);
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

    const onClick = (e: eType)=>{
        onClickNote(e, {
            nowContent : txt_cont,
            noteName : note_name
        });
    }

    useEffect(()=>{
        divRef.current!.style.borderLeft = `7px solid ${color}`;
    }, []);

    return (
        <div className='noteLabel-box' ref={divRef} data-id={note_id} data-ord={ord} onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            {edit ? 
                <input value={label} onChange={onChange}></input> : 
                <div>{`${note_name}`}</div>
            }
            
        </div>
    );
}

export default NoteLabel;