import {requestParam} from './interfaces';

interface optionAttr {
    method?: string;
    credentials?: RequestCredentials;
    headers: HeadersInit;
    body?: string;
}

interface resultAttr {
    msg: string;
    result: object;
    data: object | string | undefined;
}

const UT = {
    request : ({method='POST', url='', body={}}: requestParam, callback?: (obj: resultAttr)=> void): void=>{
        const option: optionAttr = {
            method: method,
            credentials: "same-origin",
            headers: {
                "Content-Type" : "application/json",
                // "X-CSRF-TOKEN" : sessionStorage.getItem('_csrf')
            }
        }
        if(method.toLowerCase() === 'post') option.body = JSON.stringify(body);
        fetch('/api/' + url, option)
        .then(res => {
            if(res.status === 200) return res.json();
            else throw new Error('문제가 발생하였습니다.');
        })
        .then(res =>{
            const result = {
                msg : res.errorMsg,
                result : res.rows,
                data : res.data || res
            }
            if(callback){
                callback(result);
            }
        })
        .catch(e =>{
            UT.toastMsg(e);
        })
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
    }
}

export default UT;