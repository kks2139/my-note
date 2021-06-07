import React, { useEffect, useRef } from 'react';

interface noteLabelProps {
    noteId: string;
    noteName: string;
    order: string;
}

function NoteLabel({noteId, noteName, order}: noteLabelProps){
    const prePos = useRef({x : 0, y : 0});
    const isDown = useRef(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>)=>{
        prePos.current = {
            x : e.pageX,
            y : e.pageY
        };
        isDown.current = true;
    }
    
    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>)=>{
        traceMouse(e);
    }

    const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>)=>{
        traceMouse(e);
        if(isMouseOut(e)){
            moveEnd();
        }
    }
    
    const onMouseUp = ()=>{
        moveEnd();
    }
    
    const moveEnd = ()=>{
        const el = divRef.current;
        el!.style.top = '0px'; 
        el!.style.left = '0px'; 
        isDown.current = false;
    }

    const traceMouse = (e: React.MouseEvent<HTMLDivElement>)=>{
        if(isDown.current){
            const el = divRef.current;
            
            let moveX = prePos.current.x - e.pageX;
            let moveY = prePos.current.y - e.pageY;
            
            el!.style.left = (Number(el!.style.left.split('px')[0]) - moveX) + 'px';
            el!.style.top = (Number(el!.style.top.split('px')[0]) - moveY) + 'px';
            
            prePos.current.x = e.pageX;
            prePos.current.y = e.pageY;
            
        }
    }

    // 포인터가 브라우저 창 밖으로 나갔을때 처리 
    const isMouseOut = (e: React.MouseEvent<HTMLDivElement>): boolean=>{
        const [x, y] = [e.pageX, e.pageY];
        return x <=0 || y <= 0 ? true : false;
    };

    useEffect(()=>{
        moveEnd();
    }, []);

    return (
        <div className='noteLabel-box' ref={divRef} data-id={noteId} data-ord={order} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            <div>{`${noteName}`}</div>
        </div>
    );
}

export default NoteLabel;