interface requestParam {
    method: string;
    url: string;
    body?: object;
}

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
    request : ({method='GET', url, body={}}: requestParam, callback?: (obj: resultAttr)=> void)=>{
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
            alert(e);
        })
    }
}

export default UT;