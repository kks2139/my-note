import React, { useEffect, useRef, useState, useContext } from 'react';
import {Button, Pusher, DropDownList} from './CompLink';
import {appContext} from '../App';

interface sessionBarProps {

}

interface infoItems {
    data: string;
    label: string;
}

function SessionBar({}: sessionBarProps){
    const dayStr: string[] = ['월요일','화요일','수요일','목요일','금요일','토요일', '일요일'];
    const items: infoItems[] = [{data : '1', label : 'one'}, {data : '2', label : 'two'}, {data : '3', label : 'three'}];
    const [timer, setTimer] = useState('');
    const context = useContext(appContext);
    let intervalId = useRef<NodeJS.Timeout | null>(null);
    
    const onLogoutClick = (): void=>{
        context!.onLogout();
    }

    const onInfoClick = (): void=>{
        // 콤보 리스트 - 1.사용자정보 2.수정이력
    }
    
    useEffect(()=>{
        intervalId.current = setInterval(()=>{
            setTimer(getTime());
        }, 1000);
        return ()=> clearInterval(intervalId.current!);
    }, []);

    const getTime = ()=>{
        const dt: Date = new Date();
        const d: string[] = dt.toLocaleDateString().split(' ');
        const t: string = dt.toLocaleTimeString();
        const day: string = dayStr[dt.getDay()];

        d.shift();
        d[0] = d[0].replace('.', '월');
        d[1] = d[1].replace('.', '일');
        const date: string = d.join(' ');

        return `${date} ${day} ${t}`;
    }

    return (
        <div className='sessionbar-box'>
            <table>
                <colgroup>
                    <col style={{width : '40%'}}></col>
                    <col style={{width : '20%'}}></col>
                    <col style={{width : '40%'}}></col>
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <div className='session-title-1'>'KKS'님 안녕하세요</div>
                        </td>
                        <td>
                            <div className='session-title-2'>My Note</div>
                        </td>
                        <td>
                            <div className='session-title-3'>
                                <Pusher></Pusher>
                                <div className='timer'>{timer}</div>
                                <Button text='정보' onClick={onInfoClick}></Button>
                                <Button text='로그아웃' onClick={onLogoutClick}></Button>
                                <DropDownList type='button' text='Dropdown' items={items}></DropDownList>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SessionBar;