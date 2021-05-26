import React, { useState } from 'react';
import {styleAttr} from '../util/interfaces';

interface inputProps {
    placeholder?: string;
    text?: string;
    name?: string;
    id?: string;
    maxLength?: number;
    style?: styleAttr;
    hidden?: boolean;
    onEnter?: (e: React.KeyboardEvent<HTMLInputElement>)=> void;
}

function Input({placeholder, text, id, name, maxLength, onEnter, hidden=false, style}: inputProps){
    const [value, setValue] = useState(text);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'enter' && onEnter){
            onEnter(e);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value);
    }

    return (
        <div id={id} hidden={hidden}>
            <input className='input-1' placeholder={placeholder} value={value} name={name} maxLength={maxLength} onChange={onChange} onKeyDown={onKeyDown} style={style}></input>
        </div>
    )
}

export default Input;