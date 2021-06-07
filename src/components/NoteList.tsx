import React, {useRef} from 'react';
import {NoteLabel} from './CompLink';

interface noteAttr {
    noteId: string;
    noteName: string;
    order: string;
}

interface noteListProps {
    noteList: noteAttr[];
}

function NoteList({noteList}: noteListProps){

    return (
        <div className='noteList-box'>
            {noteList.map(note => <NoteLabel key={note.noteId} {...note}></NoteLabel>)}
            
        </div>
    );
}

export default NoteList;