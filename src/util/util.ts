import {requestParam} from './interfaces';

interface optionAttr {
    method?: string;
    credentials?: RequestCredentials;
    headers: HeadersInit;
    body?: string;
}

interface resultAttr {
    errMsg: string;
    data: object | string | undefined | null;
}

const UT = {
    request : async ({method='POST', url='', body={}}: requestParam, callback?: (obj: resultAttr)=> void)=>{
        const option: optionAttr = {
            method: method,
            credentials: "same-origin",
            headers: {
                "Content-Type" : "application/json",
                // "X-CSRF-TOKEN" : sessionStorage.getItem('_csrf')
            }
        }
        if(method.toLowerCase() === 'post') option.body = JSON.stringify(body);
        // fetch('/api/' + url, option)
        // .then(res => {
        //     if(res.status === 200) return res.json();
        //     else throw new Error('문제가 발생하였습니다.');
        // })
        // .then(res =>{
        //     const result = {
        //         msg : res.errorMsg,
        //         result : res.rows,
        //         data : res.data || res
        //     }
        //     if(callback){
        //         callback(result);
        //     }
        // })
        // .catch(e =>{
        //     UT.toastMsg(e);
        // })
        try{
            const res = await fetch('/api/' + url, option);
            if(res.status === 200){
                const result = await res.json();
                if(callback) callback(result);
            }else{
                throw new Error('문제가 발생하였습니다.');
            }
        }catch(e){
            UT.alert(e);
        }
    },

    toastMsg : (msg: string=''): void=>{
        let toast:HTMLDivElement | null = null; 
        const el:HTMLDivElement | null = document.querySelector('div.toast');
        if(el){
            el.textContent = msg;
        }else{
            toast = document.createElement('div');
            toast.textContent = msg;
            toast.classList.add('toast');
            document.body.appendChild(toast);
        }

        setTimeout(()=>{
            if(toast){
                toast.style.opacity = '0';
                setTimeout(()=> document.body.removeChild(toast!), 300);
            }
        }, 1700);
    },

    alert : (msg: string, callback?: ()=>void): void=>{
        UT.makeDialog(true, msg, callback);
    },
    
    confirm : (msg: string, callbackYes?: ()=>void, callbackNo?: ()=>void): void=>{
        UT.makeDialog(false, msg, callbackYes, callbackNo);
    },

    makeDialog : (isAlert: boolean, msg: string, callbackYes?: ()=>void, callbackNo?: ()=>void): void=>{
        const modalRoot = document.querySelector('#modal');
        if(modalRoot!.querySelector('div.modal')) return undefined;

        const back: HTMLDivElement = document.createElement('div');
        const box: HTMLDivElement = document.createElement('div');
        const title: HTMLDivElement = document.createElement('div');
        const label: HTMLDivElement = document.createElement('div');
        const btnBox: HTMLDivElement = document.createElement('div');
        const btnWrap: HTMLDivElement = document.createElement('div');
        const yesBtn: HTMLDivElement = document.createElement('div');
        
        back.classList.add('modal');
        box.classList.add('dialog');
        
        title.classList.add('dialog-title');
        title.textContent = '알림';
        
        label.classList.add('label');
        label.textContent = msg;
        
        btnBox.classList.add('dialog-btn-box');
        btnWrap.classList.add('dialog-btn-wrap');

        yesBtn.classList.add('btn-1', 'dialog-btn');
        yesBtn.textContent = '예';
        yesBtn.onclick = (): void=>{
            if(callbackYes) callbackYes();
            modalRoot!.removeChild(modalRoot!.firstChild!);
        };
        
        back.appendChild(box);
        box.appendChild(title);
        box.appendChild(label);
        box.appendChild(btnBox);
        btnBox.appendChild(btnWrap);
        btnWrap.appendChild(yesBtn);
        
        if(!isAlert){
            const noBtn: HTMLDivElement = document.createElement('div');
            noBtn.classList.add('btn-1', 'dialog-btn');
            noBtn.textContent = '아니요';
            noBtn.onclick = (): void=>{
                if(callbackNo) callbackNo();
                modalRoot!.removeChild(modalRoot!.firstChild!);
            }
            btnWrap.appendChild(noBtn);
        }
        modalRoot!.appendChild(back);
    }
}

export default UT;