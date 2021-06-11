import React, { useRef, useState } from 'react';
import UT from '../util/util';
import {Input, Button} from './CompLink';

function NaviFooter(){
    const [noteName, setNoteName] = useState('');
    const [invalid, setInvalid] = useState(false);
    const inputBoxRef = useRef<HTMLDivElement | null>(null);

    const clickAddNote = (e: React.MouseEvent<HTMLDivElement>)=>{
        inputBoxRef.current!.classList.add('footer-input-hide');
    }
    
    const onAddNote = (e: React.MouseEvent<HTMLDivElement>)=>{
        if(e.currentTarget!.dataset.name === 'add'){
            if(validation('add')){


                // 추가노트 디비저장 --> 재조회


            }else return;
        }
        setInvalid(false);
        inputBoxRef.current!.classList.remove('footer-input-hide');
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setNoteName(e.target.value);
        setInvalid(false);
    }

    const validation = (type: string): boolean=>{
        let result = true;
        switch(type){
            case 'add':
                if(!(noteName.trim())){
                    setInvalid(true);
                    UT.toastMsg('노트제목을 입력하세요.');
                    result = false;
                }
                break;
            case 'add':
                break;
        }
        return result;
    }
    
    return (
        <div className='navi-footer-box'>
            <div className='footer-input-box' ref={inputBoxRef}>
                <Input placeholder='노트제목' style={{width : '99%'}} invalid={invalid} onChange={onChange}></Input>
                <div className='wrap-buttons'>
                    <Button text='추가' name='add' onClick={onAddNote}></Button>
                    <div style={{width : '5px'}}></div>
                    <Button text='취소' onClick={onAddNote}></Button>
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