import {requestParam, resultAttr} from './interfaces';

interface optionAttr {
    method?: string;
    credentials?: RequestCredentials;
    headers: HeadersInit;
    body?: string;
}

const UT = {
    request : async ({method='POST', url='', body={}, showLoad=true}: requestParam, callback?: (obj: resultAttr<any>)=> void)=>{
        const option: optionAttr = {
            method: method,
            credentials: "same-origin",
            headers: {
                "Content-Type" : "application/json",
                // "X-CSRF-TOKEN" : sessionStorage.getItem('_csrf')
            }
        }
        if(method.toLowerCase() === 'post') option.body = JSON.stringify(body);
        try{
            UT.showLoading(showLoad);
            const res = await fetch('/api/' + url, option);
            if(res.status === 200){
                UT.showLoading(false);
                const result = await res.json();
                if(callback) callback(result);
            }else{
                throw new Error('문제가 발생하였습니다.');
            }
        }catch(e){
            UT.showLoading(false);
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
    },

    showLoading : (show: boolean): void=>{
        const modalRoot = document.querySelector('#modal');
        if(show && modalRoot!.querySelector('div.modal')) return undefined;
        
        if(show){
            // const text = 'Loading...';
            const text = '로딩중...';
            const back: HTMLDivElement = document.createElement('div');
            const box: HTMLDivElement = document.createElement('div');
    
            back.classList.add('modal');
            box.classList.add('loadmask');
            
            for(let i=0; i<text.length; i++){
                const mask: HTMLDivElement = document.createElement('div');
                mask.classList.add(`mask-${i + 1}`);
                mask.textContent = text[i];
                box.appendChild(mask);
            }
            back.appendChild(box);
            modalRoot!.appendChild(back);
        }else{
            if(modalRoot!.firstChild !== null){
                modalRoot!.removeChild(modalRoot!.firstChild);
            }
        }
    },

    rand : (n: number): number=>{ // 0 ~ n 사이의 랜덤숫자 리턴
        if(isNaN(n)) return 0;
        else{
            const pos = Math.pow(10, Number(("" + n).length));
            return Number((Math.random() * pos % n).toFixed());
        }
    },

    randomColor : (): string=>{
        const [r1, r2, r3] = [UT.rand(255), UT.rand(255), UT.rand(255)];
        return `rgb(${r1}, ${r2}, ${r3})`;
    }
}

export default UT;