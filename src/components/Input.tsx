import React, { useEffect, useState } from 'react';
import {styleAttr} from '../util/interfaces';

interface inputProps {
    placeholder?: string;
    text?: string;
    name?: string;
    id?: string;
    invalid?: boolean;
    maxLength?: number;
    style?: styleAttr;
    hidden?: boolean;
    onEnter?: (e: React.KeyboardEvent<HTMLInputElement>)=> void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void;
}

function Input({placeholder, text, id, name, invalid, maxLength, onEnter, onChange, hidden=false, style}: inputProps){
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>):void=>{
        if(e.key === 'Enter' && onEnter){
            onEnter(e);
        }
    }

    const valueChange = (e: React.ChangeEvent<HTMLInputElement>):void=>{
        if(onChange){
            onChange(e);
        }
    }

    useEffect(()=>{

    });

    return (
        <div id={id} hidden={hidden}>
            <input className={`input-1 ${invalid ? 'input-invalid' : ''}`} 
                   placeholder={placeholder} 
                   value={text} 
                   name={name} 
                   maxLength={maxLength} 
                   onChange={valueChange} 
                   onKeyDown={onKeyDown} 
                   style={style}>
            </input>
        </div>
    )
}

export default Input;