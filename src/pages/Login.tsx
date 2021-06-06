import React, { useContext, useRef, useState } from 'react';
import {Button, Input} from '../components/CompLink';
import {styleAttr, requestParam, resultAttr} from '../util/interfaces';
import UT from '../util/util';
import {appContext} from '../App';

interface stateObj {
    isJoin: boolean;
    loginTxt: string;
    id: string;
    pw: string;
    pw2: string;
}
type loginInfo = {
    id: string;
    pw: string;
};
type inputEl = HTMLInputElement | null;

function Login(){
    const context = useContext(appContext);
    const [info, setInfo] = useState<stateObj>({
        isJoin : false,
        loginTxt : '로그인',
        id : '',
        pw : '',
        pw2 : ''
    });
    const boxRef = useRef<HTMLDivElement | null>(null);
    
    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>): void=>{
        if(info.isJoin) onJoin();
        else onLogin();
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setInfo({...info, [name] : value});
    }
    
    const onClick = (e: React.MouseEvent<HTMLDivElement>): void=>{
        const name = e.currentTarget.dataset.name;
        if(name === 'login'){
            onLogin();
        }else if(name === 'join' || name === 'back'){
            setInfo({
                isJoin : !info.isJoin,
                loginTxt : info.isJoin ? '로그인' : '회원가입',
                id : '',
                pw : '',
                pw2 : ''
            });
        }else if(name === 'joinEnd'){
            onJoin();
        }

    }

    const onLogin = (): void=>{
        const node = boxRef.current;
        const el1: inputEl = node!.querySelector('input[name=id]'); 
        const el2: inputEl = node!.querySelector('input[name=pw]'); 

        if(el1 && el2){
            if(validate(el1, el2)){
                const param: requestParam = {
                    url : 'login',
                    body : {
                        id : el1.value,
                        pw : el2.value
                    }
                }
                UT.request(param, ({data}: resultAttr<loginInfo>)=>{
                    if(data.length === 0){
                        UT.alert('아이디 혹은 비밀번호를 다시 확인하세요.');
                    }else{
                        context!.onLoginSuccess(data[0].id!);
                    }
                });
            }
        }
    }

    const onJoin = (): void=>{
        const node = boxRef.current;
        const el1: inputEl = node!.querySelector('input[name=id]'); 
        const el2: inputEl = node!.querySelector('input[name=pw]'); 
        const el3: inputEl = node!.querySelector('input[name=pw2]'); 

        if(el1 && el2 && el3){
            if(validate(el1, el2, el3)){
                const param: requestParam = {
                    url : 'join',
                    body : {
                        id : el1.value,
                        pw : el2.value
                    }
                }
                UT.request(param, ({errMsg})=>{
                    if(errMsg){
                        UT.alert('이미 존재하는 아이디 입니다.');
                    }else{
                        UT.alert('가입이 완료되었습니다.', ()=>{
                            setInfo({
                                isJoin : !info.isJoin,
                                loginTxt : info.isJoin ? '로그인' : '회원가입',
                                id : '',
                                pw : '',
                                pw2 : ''
                            });
                        });
                    }
                });
            }
        }
    }

    const validate = (el_id: HTMLInputElement, el_pw: HTMLInputElement, el_pw2?: HTMLInputElement): boolean=>{
        let ret = true;
        if(!(el_id.value.trim())){
            el_id.focus();
            UT.toastMsg('아이디를 입력해주세요.');
            ret = false;
        }else if(!(el_pw.value.trim())){
            el_pw.focus();
            UT.toastMsg('비밀번호를 입력해주세요.');
            ret = false;
        }else if(el_pw2){
            if(!(el_pw2.value.trim())){
                el_pw2.focus();
                UT.toastMsg('비밀번호(확인)을 입력해주세요.');
                ret = false;
            }else if(el_pw.value !== el_pw2.value){
                el_pw2.focus();
                UT.toastMsg('비밀번호가 서로 다릅니다.');
                ret = false;
            }
        }
        return ret;
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
        top: '85%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    return (
        // <div className='login-back'>
            <div className='login-box' ref={boxRef}>
                <div className='login-tit'>{info.loginTxt}</div>
                <Input placeholder='아이디' text={info.id} onEnter={onEnter} onChange={onChange} name='id'></Input>
                <Input placeholder='비밀번호' text={info.pw} onEnter={onEnter} onChange={onChange} name='pw'></Input>
                <Input placeholder='비밀번호(확인)' text={info.pw2} onEnter={onEnter} onChange={onChange} name='pw2' hidden={!info.isJoin}></Input>
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