import React, {useEffect, useRef} from 'react';
import {NoteLabel} from './CompLink';
import {noteListAttr, contentBoxAttr} from '../util/interfaces';

interface noteListProps {
    noteList: noteListAttr[];
    onOrderChange: (val1: string, val2: string)=>void;
    onNoteSelected: (el: HTMLDivElement)=>void;
    onDeleteNote: (val: string)=>void;
    editMode: boolean;
}

type eType = React.MouseEvent<HTMLDivElement> | MouseEvent;

function NoteList({noteList, onOrderChange, onNoteSelected, onDeleteNote, editMode}: noteListProps){
    const divRef = useRef<HTMLDivElement | null>(null);
    const prePos = useRef({x : 0, y : 0});
    
    const onMouseDown = (e: eType)=>{
        if(!editMode) return;
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

    const onClickNote = (targ: HTMLDivElement)=>{
        onNoteSelected(targ);
    }

    useEffect(()=>{
        const firstChild = divRef.current!.firstChild as HTMLDivElement;
        if(firstChild){
            onNoteSelected(firstChild);
        }
        
        document.body.onmousemove = onMouseMove;
        return ()=>{
            document.body.onmousemove = null;
        }
    }, []);

    return (
        <div className='noteList-box' ref={divRef}>
            {noteList.map(note => <NoteLabel key={note.note_id} {...note} edit={editMode} onClickDelete={onDeleteNote} onDown={onMouseDown} onUp={onMouseUp} onClickNote={onClickNote}></NoteLabel>)}
        </div>
    );
}

export default NoteList;