import React, { useRef, useState } from 'react';
import {Button} from './CompLink';

type rootEl = 'button' | 'combox';

interface itemAttr {
    data: string;
    label: string;
}

interface dropDownListProps {
    type: rootEl;
    text?: string;
    items: itemAttr[];
    onSelect?: (seleted: itemAttr)=>void;
}

function DropDownList({type, text='', items, onSelect}: dropDownListProps){
    const [toggle, setToggle] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const dropListRef = useRef<HTMLDivElement | null>(null);

    const onClick = (e: React.MouseEvent<HTMLInputElement | HTMLDivElement>): void=>{
        setToggle(!toggle);
    }

    const onItemClick = (e: React.MouseEvent<HTMLDivElement>): void=>{
         if(onSelect) onSelect({
            data : e.currentTarget.dataset.value || '',
            label : e.currentTarget.textContent || ''
         });
    }

    return (
        <div className='dropdown-box'>
            {type === 'button' ?
                <Button text={text} onClick={onClick}></Button> :
                <input readOnly onClick={onClick} value={inputVal}></input>
            }
            {toggle ? 
                <div className='drop-list' ref={dropListRef}>
                    {items.map((d, i)=>{
                        return <div key={d.data} data-value={d.data} onClick={onItemClick}>{d.label}</div>
                    })}
                </div> : null
            }
        </div>
    );
}

export default DropDownList;