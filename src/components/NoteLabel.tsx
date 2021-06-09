import React, { useEffect, useRef } from 'react';

interface noteLabelProps {
    noteId: string;
    noteName: string;
    order: string;
    color: string;
    hasChanged: (val1: string, val2: string)=>void;
}

type eType = React.MouseEvent<HTMLDivElement>;

function NoteLabel({noteId, noteName, order, color, hasChanged}: noteLabelProps){
    const prePos = useRef({x : 0, y : 0});
    const isDown = useRef(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    const onMouseDown = (e: eType)=>{
        prePos.current = {
            x : e.pageX,
            y : e.pageY
        };
        isDown.current = true;
    }
    
    const onMouseMove = (e: eType)=>{
        traceMouse(e);
        if(isMouseOut(e)){
            moveEnd();
        }
    }
    
    const onMouseLeave = (e: eType)=>{
        traceMouse(e);
        if(isMouseOut(e)){
            moveEnd();
        }
    }
        
    const onMouseUp = ()=>{
        moveEnd();
        changeOrder();
    }
    
    const moveEnd = ()=>{
        const el = divRef.current;
        el!.style.top = '0px'; 
        el!.style.left = '0px'; 
        isDown.current = false;
    }

    const traceMouse = (e: eType)=>{
        if(isDown.current){
            const el = divRef.current;
            
            let moveX = prePos.current.x - e.pageX;
            let moveY = prePos.current.y - e.pageY;
            
            el!.style.left = (Number(el!.style.left.split('px')[0]) - moveX) + 'px';
            el!.style.top = (Number(el!.style.top.split('px')[0]) - moveY) + 'px';
            
            prePos.current.x = e.pageX;
            prePos.current.y = e.pageY;

            checkCollision(e);
        }
    }
    
    // 포인터가 브라우저 창 밖으로 나갔을때
    const isMouseOut = (e: eType): boolean=>{
        const [x, y, winX, winY] = [e.pageX, e.pageY, window.innerWidth, window.innerHeight];
        return x <=0 || y <= 0 || winX <= x || winY <= y ? true : false;
    };

    const checkCollision = (e: eType)=>{
        let result = '';
        const el = divRef.current;
        const [currX, currY] = [e.pageX, e.pageY]; 
        const notes = e.currentTarget.parentNode!.children;
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
        const el = divRef.current;
        if(covered){
            hasChanged(el!.dataset.id!, covered.dataset.id!);
            covered.classList.remove('covered');
        }
    }

    useEffect(()=>{
        divRef.current!.style.borderLeft = `7px solid ${color}`;
        moveEnd();
    }, []);

    return (
        <div className='noteLabel-box' ref={divRef} data-id={noteId} data-ord={order} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            <div>{`${noteName}`}</div>
        </div>
    );
}


export default NoteLabel;