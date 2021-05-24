import React, { useState } from 'react';

interface styleAttr {
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
    position?: 'absolute' | 'relative' | undefined;
    top?: string;
    left?: string;
    transform?: string;
}

interface inputProps {
    placeholder?: string;
    text?: string;
    name?: string;
    maxLength?: number;
    style?: styleAttr;
    onEnter?: (e: React.KeyboardEvent<HTMLInputElement>)=> void;
}

function Input({placeholder, text='', name='', maxLength, onEnter, style={width : 'fit-content'}}: inputProps){
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
        <div>
            <input className='input-1' placeholder={placeholder} name={name} maxLength={maxLength} onChange={onChange} onKeyDown={onKeyDown} style={style}></input>
        </div>
    )
}

export default Input;