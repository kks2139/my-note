import React, { useRef, useState, useContext } from 'react';
import {Button, Pusher, DropDownList, Clock} from './CompLink';
import {appContext} from '../App';
import UT from '../util/util';

interface sessionBarProps {

}

interface infoItems {
    data: string;
    label: string;
}

function SessionBar({}: sessionBarProps){
    const items: infoItems[] = [{data : 'd1', label : '수정이력'}, 
                                {data : 'd2', label : '사용자 정보'}];
    const context = useContext(appContext);
    
    const onLogoutClick = (): void=>{
        UT.confirm('로그아웃 하시겠습니까?', ()=>{
            context!.onLogout();
        });
    }

    const onInfoClick = (sel: infoItems): void=>{
        // 콤보 리스트 - 1.사용자정보 2.수정이력
        UT.toastMsg(sel.label);
    }
    
    return (
        <div className='sessionbar-box'>
            <div className='session-title-1'>
                <div className='session-sub-1'>My Note</div>
                <div className='session-sub-2'>{`'${localStorage.getItem('userId')}' 님 안녕하세요!`}</div>
            </div>
            <Pusher></Pusher>
            <div className='session-title-3'>
                {/* <div className='timer'>{timer}</div> */}
                <Clock></Clock>
                <Button text='로그아웃' onClick={onLogoutClick}></Button>
                <DropDownList type='button' text='정보' items={items} onSelect={onInfoClick}></DropDownList>
            </div>
        </div>
    );
}

export default SessionBar;