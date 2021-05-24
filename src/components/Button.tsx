import React from 'react';

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

interface buttonProps {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>)=> void;
    style?: styleAttr;
}

function Button({text='', onClick, style}: buttonProps){
    const clickBtn = (e: React.MouseEvent<HTMLDivElement>)=> {
        if(onClick) onClick(e);
    }

    return (
        <div className='btn-1' onClick={clickBtn} style={style}>{text}</div>
    );
}

export default Button;