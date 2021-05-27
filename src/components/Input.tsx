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
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void;
}

function Input({placeholder, text, id, name, maxLength, onEnter, onChange, hidden=false, style}: inputProps){
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'enter' && onEnter){
            onEnter(e);
        }
    }

    const valueChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(onChange){
            onChange(e);
        }
    }

    return (
        <div id={id} hidden={hidden}>
            <input className='input-1' placeholder={placeholder} value={text} name={name} maxLength={maxLength} onChange={valueChange} onKeyDown={onKeyDown} style={style}></input>
        </div>
    )
}

export default Input;