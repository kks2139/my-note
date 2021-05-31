import React from 'react';
import {styleAttr} from '../util/interfaces';

interface buttonProps {
    text?: string;
    name?: string;
    id?: string;
    img?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>)=> void;
    style?: styleAttr;
    hidden?: boolean;
}

function Button({text='', onClick, hidden=false, name='', id='', img, style}: buttonProps){
    const clickBtn = (e: React.MouseEvent<HTMLDivElement>)=> {
        if(onClick) onClick(e);
    }

    if(img){
        style = style || {};
        style.backgroundImage = `url('${img})`;
    }

    return (
        <div className='btn-1' id={id} onClick={clickBtn} data-name={name} hidden={hidden} style={style}>{text}</div>
    );
}

export default Button;