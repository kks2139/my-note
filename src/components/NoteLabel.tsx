import React, { useEffect, useRef } from 'react';

type eType = React.MouseEvent<HTMLDivElement>;

interface noteLabelProps {
    noteId: string;
    noteName: string;
    order: string;
    color: string;
    onDown: (e: eType)=>void;
    onUp: (e: eType)=>void;
}

function NoteLabel({noteId, noteName, order, color, onDown, onUp}: noteLabelProps){
    const divRef = useRef<HTMLDivElement | null>(null);

    const onMouseDown = (e: eType)=>{
        onDown(e);
    }
    const onMouseUp = (e: eType)=>{
        onUp(e);
    }

    useEffect(()=>{
        divRef.current!.style.borderLeft = `7px solid ${color}`;
    }, []);

    return (
        <div className='noteLabel-box' ref={divRef} data-id={noteId} data-ord={order} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            <div>{`${noteName}`}</div>
        </div>
    );
}

export default NoteLabel;