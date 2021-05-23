import React, { useState } from 'react';

interface inputProps {
    placeholder: string,
    text?: string,
    width?: string,
    height?: string,
    onEnter?: (e:React.KeyboardEvent<HTMLInputElement>)=>void
}

function Input({placeholder, text='', onEnter, width, height='30px'}: inputProps){
    const [value, setValue] = useState('');

    const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'enter' && onEnter){
            onEnter(e);
        }
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(p => e.currentTarget.value);
    }

    const style = {
        width,
        height
    }

    return (
        <div style={style}>
            <input placeholder={placeholder} value={text} onChange={onChange} onKeyDown={onKeyDown}></input>
        </div>
    )
}

export default Input;