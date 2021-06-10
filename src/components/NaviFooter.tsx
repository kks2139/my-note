import React, { useRef } from 'react';
import {Input, Button} from './CompLink';

function NaviFooter(){
    const inputBoxRef = useRef<HTMLDivElement | null>(null);

    const clickAddNote = (e: React.MouseEvent<HTMLDivElement>)=>{
        inputBoxRef.current!.classList.add('footer-input-hide');
    }
    const addCancel = (e: React.MouseEvent<HTMLDivElement>)=>{
        inputBoxRef.current!.classList.remove('footer-input-hide');
    }
    
    return (
        <div className='navi-footer-box'>
            <div className='footer-input-box' ref={inputBoxRef}>
                <Input placeholder='노트제목'></Input>
                <div className='wrap-buttons'>
                    <Button text='추가'></Button>
                    <Button text='취소' onClick={addCancel}></Button>
                </div>
            </div>
            <div className='footer-buttons'>
                <div onClick={clickAddNote}>노트추가</div>
                <div>편집</div>
            </div>
        </div>
    );
}

export default NaviFooter;