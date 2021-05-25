import React from 'react';
import {styleAttr} from '../util/interfaces';

interface buttonProps {
    text: string;
    name?: string;
    id?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>)=> void;
    style?: styleAttr;
    hidden?: boolean;
}

function Button({text='', onClick, hidden=false, name='', id='', style}: buttonProps){
    const clickBtn = (e: React.MouseEvent<HTMLDivElement>)=> {
        if(onClick) onClick(e);
    }

    return (
        <div className='btn-1' id={id} onClick={clickBtn} data-name={name} hidden={hidden} style={style}>{text}</div>
    );
}

export default Button;