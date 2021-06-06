import React from 'react';
import {NoteLabel} from './CompLink';

interface noteListProps {
    noteList: string[];
}

function NoteList({noteList}: noteListProps){
    return (
        <div className='noteList-box'>
            {noteList.map(note => <NoteLabel name={note}></NoteLabel>)}
            
        </div>
    );
}

export default NoteList;