import React, { useEffect, useRef, useState } from 'react';

type eType = React.MouseEvent<HTMLDivElement>;

interface noteLabelProps {
    noteId: string;
    noteName: string;
    order: string;
    color?: string;
    edit?: boolean;
    onDown: (e: eType)=>void;
    onUp: (e: eType)=>void;
}

function NoteLabel({noteId, noteName, order, color, edit=false, onDown, onUp}: noteLabelProps){
    const [label, setLabel] = useState(noteName);
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

    useEffect(()=>{
        divRef.current!.style.borderLeft = `7px solid ${color}`;
    }, []);

    return (
        <div className='noteLabel-box shaking' ref={divRef} data-id={noteId} data-ord={order} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            {edit ? 
                <input value={label} onChange={onChange}></input> : 
                <div>{`${noteName}`}</div>
            }
            
        </div>
    );
}

export default NoteLabel;