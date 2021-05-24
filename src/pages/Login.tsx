import React, { useState } from 'react';
import {Button, Input} from '../components/CompLink';

interface btnStyleAttr {
    position: 'absolute' | 'relative' | undefined;
    top?: string;
    left: string;
    transform: string;
}

function Login(){
    const [isJoin, setIsJoin] = useState(false);
    const [btnNm, setBtnNm] = useState('가입하기');

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        
    }
    
    const onClick = (e: React.MouseEvent<HTMLDivElement>)=>{
        
    }

    const onLogin = ()=>{

    }

    const onJoin = ()=>{
        
    }

    const btnStyle: btnStyleAttr = {
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)'
    }

    return (
        <div className='login-box' hidden={isJoin}>
            <h2>로그인</h2>
            <Input placeholder='아이디를 입력하세요.' onEnter={onEnter} name='id'></Input>
            <Input placeholder='비밀번호를 입력하세요.' onEnter={onEnter} name='pw'></Input>
            {isJoin ? 
                <Input placeholder='비밀번호를 입력하세요. (확인)' onEnter={onEnter} name='pw2'></Input>
            : null}

            <Button text={btnNm} onClick={onClick} style={btnStyle}></Button>

        </div>
    );
}

export default Login;