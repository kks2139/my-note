import React from 'react';

interface noteLabelProps {
    name: string;
}

function NoteLabel({name}: noteLabelProps){
    return (
        <div className='noteLabel-box'>
            {`${name}`}
        </div>
    );
}

export default NoteLabel;