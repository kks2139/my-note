import React, { useRef, useState } from 'react';
import UT from '../util/util';
import {Input, Button} from './CompLink';

interface naviFooterProps {
    onEdit: (val: boolean)=>void;
    onAdd: (s1: string, s2: string)=>void;
}

function NaviFooter({onEdit, onAdd}: naviFooterProps){
    const [noteName, setNoteName] = useState('');
    const [invalid, setInvalid] = useState(false);
    const isEdit = useRef(false);
    const isAdd = useRef(false);
    const inputBoxRef = useRef<HTMLDivElement | null>(null);

    const onClickAddNote = (e: React.MouseEvent<HTMLDivElement>)=>{
        const targ = e.currentTarget;
        targ.classList.toggle('footer-btn-sel');
        targ.textContent = isAdd.current ? '노트추가' : '취소';

        inputBoxRef.current!.classList.toggle('footer-input-hide');
        isAdd.current = !isAdd.current;
        setInvalid(false);
    }
    
    const onAddNote = ()=>{
        if(validation('add')){
            UT.confirm('노트를 추가 하시겠습니까?', ()=>{
                onAdd(noteName, UT.randomColor());
            });
        }else return;
        setInvalid(false);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setNoteName(e.target.value);
        setInvalid(false);
    }

    const onClickEdit = (e: React.MouseEvent<HTMLDivElement>)=>{
        const targ = e.currentTarget;
        targ.textContent = isEdit.current ? '편집' : '편집 완료';
        targ.classList.toggle('footer-btn-sel');
        
        const noteLabels = document.querySelectorAll('div.noteLabel-box');
        noteLabels.forEach(el =>{
            el.classList.toggle('noteLabel-edit');
        });

        isEdit.current = !isEdit.current;
        onEdit(isEdit.current);
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
            case '':
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
                </div>
            </div>
            <div className='footer-buttons'>
                <div onClick={onClickAddNote}>노트추가</div>
                <div onClick={onClickEdit}>편집</div>
            </div>
        </div>
    );
}

export default NaviFooter;