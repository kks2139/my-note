import { stat } from 'fs';
import React, { useReducer, useRef, useState } from 'react';
import {Button, Input} from '../components/CompLink';
import {styleAttr} from '../util/interfaces';
import UT from '../util/util';

interface stateObj {
    isJoin: boolean;
    loginTxt: string;
}

function Login(){
    const [info, setInfo] = useState<stateObj>({
        isJoin : false,
        loginTxt : '로그인'
    });
    const boxRef = useRef<HTMLDivElement>(null);
    
    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>): void=>{
        
    }
    
    const onClick = (e: React.MouseEvent<HTMLDivElement>): void=>{
        const name = e.currentTarget.dataset.name;
        if(name === 'login'){
            onLogin();
        }else if(name === 'join' || name === 'back'){
            setInfo({
                isJoin : !info.isJoin,
                loginTxt : info.isJoin ? '로그인' : '회원가입'
            });
        }else if(name === 'joinEnd'){
            onJoin();
        }

    }

    const onLogin = (): void=>{
        const node = boxRef.current;
        if(node){
            const el1:HTMLInputElement | null = node.querySelector('input[name=id]'); 
            const el2:HTMLInputElement | null = node.querySelector('input[name=pw]'); 
            if(el1 && el2){
                validate(el1, el2);
            }else{
                console.warn('No such elements!');
            }
        }
    }

    const onJoin = (): void=>{
        
    }

    const validate = (el_id: HTMLInputElement, el_pw: HTMLInputElement): void=>{
        if(!(el_id.value.trim())){
            el_id.focus();
        }else if(!(el_pw.value.trim())){
            el_pw.focus();
        }
    }

    const btnStyle: styleAttr = {
        position: 'relative',
        left: '50%',
        width: '150px',
        transform: 'translateX(-50%)',
        marginTop: '5px'
    }
    
    const divStyle: styleAttr = {
        position: 'absolute',
        top: '75%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    return (
        // <div className='login-back'>
            <div className='login-box' ref={boxRef}>
                <div className='login-tit'>{info.loginTxt}</div>
                <Input placeholder='아이디를 입력하세요.' onEnter={onEnter} name='id'></Input>
                <Input placeholder='비밀번호를 입력하세요.' onEnter={onEnter} name='pw'></Input>
                <Input placeholder='비밀번호(확인)' onEnter={onEnter} name='pw2' hidden={!info.isJoin}></Input>
                
                {!info.isJoin ?
                    <div style={divStyle}>
                        <Button text='로그인' name='login' onClick={onClick} style={btnStyle}></Button>
                        <Button text='회원가입' name='join' onClick={onClick} style={btnStyle}></Button>
                    </div> :
                    <div style={divStyle}>
                        <Button text='가입완료' name='joinEnd' onClick={onClick} style={btnStyle}></Button>
                        <Button text='뒤로' name='back' onClick={onClick} style={btnStyle}></Button>
                    </div>
                }   
            </div>
        // </div>
    );
}

export default Login;