import React, { useEffect, useRef, useState } from 'react';
import {Button} from './CompLink';
import {styleAttr} from '../util/interfaces';
import Input from './Input';

interface sessionBarProps {

}

function SessionBar(){
    const [timer, setTimer] = useState('');
    let intervalId = useRef<NodeJS.Timeout | null>(null);

    useEffect(()=>{
        intervalId.current = setInterval(()=>{
            // yyyy.MM.dd HH:mm:ss 로 날짜 세팅
        }, 1000);
        return ()=> clearInterval(intervalId.current!);
    }, []);

    return (
        <div className='sessionbar-box'>
            <div className='session-title-1'>My Note</div>
            <div className='session-title-2'>'KKS'님 안녕하세요!</div>
            
            <div>
                <div className='timer'>{timer}</div>
                <Button text='test'></Button>
            </div>

        </div>
    );
}

export default SessionBar;