import React, {useRef} from 'react';
import {NoteLabel} from './CompLink';

interface noteAttr {
    noteId: string;
    noteName: string;
    order: string;
    color: string;
}

interface noteListProps {
    noteList: noteAttr[];
    onOrderChanged: (val1: string, val2: string)=>void;
}

function NoteList({noteList, onOrderChanged}: noteListProps){

    return (
        <div className='noteList-box'>
            {noteList.map(note => <NoteLabel key={note.noteId} {...note} hasChanged={onOrderChanged}></NoteLabel>)}
        </div>
    );
}

export default NoteList;