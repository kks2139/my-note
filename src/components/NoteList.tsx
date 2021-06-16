import React, {useEffect, useRef} from 'react';
import {NoteLabel} from './CompLink';

interface noteAttr {
    noteId: string;
    noteName: string;
    order: string;
    color: string;
}

interface noteListProps {
    noteList: noteAttr[];
    onOrderChange: (val1: string, val2: string)=>void;
    editMode: boolean;
}

type eType = React.MouseEvent<HTMLDivElement> | MouseEvent;

function NoteList({noteList, onOrderChange, editMode}: noteListProps){
    const prePos = useRef({x : 0, y : 0});
    
    const onMouseDown = (e: eType)=>{
        markMouseDown(e, true);
        prePos.current = {
            x : e.pageX,
            y : e.pageY
        };
    }
    
    const onMouseMove = (e: eType)=>{
        traceMouse(e);
    }
    
    const onMouseUp = (e: eType)=>{
        changeOrder();
        moveEnd(e);
    }
    
    const moveEnd = (e: eType)=>{
        const el: HTMLDivElement | null = document.querySelector('div[data-is-down=Y]');
        if(el){
            el.style.top = '0px'; 
            el.style.left = '0px'; 
            markMouseDown(e, false);
        }
    }

    const markMouseDown = (e: eType, down: boolean)=>{
        const targ = e.currentTarget as HTMLDivElement;
        targ.dataset.isDown = down ? 'Y' : '';
    }

    const traceMouse = (e: eType)=>{
        const el: HTMLDivElement | null = document.querySelector('div[data-is-down=Y]');
        if(el){
            let moveX = prePos.current.x - e.pageX;
            let moveY = prePos.current.y - e.pageY;
            
            el!.style.left = (Number(el!.style.left.split('px')[0]) - moveX) + 'px';
            el!.style.top = (Number(el!.style.top.split('px')[0]) - moveY) + 'px';
            
            prePos.current.x = e.pageX;
            prePos.current.y = e.pageY;

            checkCollision(e, el);
        }
    }
    
    const checkCollision = (e: eType, el: HTMLDivElement | null)=>{
        let result = '';
        const [currX, currY] = [e.pageX, e.pageY]; 
        const notes = el!.parentNode!.children;
        const others: HTMLDivElement[] = Array.prototype.filter.call(notes, n => n.dataset.id !== el!.dataset.id );

        others.forEach(n =>{
            const {x, y, width, height} = n.getBoundingClientRect();
            const eX = x + width,
                  eY = y + height;

            if(currX > x && currX < eX && currY > y && currY < eY){
                n.classList.add('covered');
            }else{
                n.classList.remove('covered');
            }
        });
        return result;
    }

    const changeOrder = ()=>{
        const covered: HTMLDivElement | null = document.querySelector('div.covered');
        const el: HTMLDivElement | null = document.querySelector('div[data-is-down=Y]');
        if(covered){
            onOrderChange(el!.dataset.id!, covered.dataset.id!);
            covered.classList.remove('covered');
        }
    }

    useEffect(()=>{
        document.body.onmousemove = onMouseMove;
        return ()=>{
            document.body.onmousemove = null;
        }
    }, []);

    return (
        <div className='noteList-box'>
            {noteList.map(note => <NoteLabel key={note.noteId} {...note} edit={editMode} onDown={onMouseDown} onUp={onMouseUp}></NoteLabel>)}
        </div>
    );
}

export default NoteList;