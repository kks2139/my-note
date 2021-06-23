const crypto = require('crypto');

const helper = {
    encrypt : (str)=>{
        return crypto.createHash('sha512').update(str).digest('base64');
    },
    uuid : (std='')=>{ // std == uuid 구분
        var len = 0;
        const now = new Date();
        const d = now.toLocaleString().split('.');
        const t = now.toTimeString().split(':');

        len = d[1].trim().length; 
        d[1] = len === 1 ? '0' + d[1].trim() : d[1].trim(); 
        len = d[2].trim().length; 
        d[2] = len === 1 ? '0' + d[2].trim() : d[2].trim();

        return std + d[0] + d[1] + d[2] + '-' + t[0] + t[1] + now.getSeconds() + '-' + helper.rand(100);
    },
    rand : n => {
        if(isNaN(n)) return 0;
        else{
            const pos = Math.pow(10, Number(("" + n).length));
            return (Math.random() * pos % n).toFixed();
        }
    },
    logger : (req, res, next)=>{
        req.requestTime = new Date();
        console.log(`${req.url} : requested ${req.requestTime}`);
        next();
    },
    tokenPass : (req, res, next)=>{
        if(req.method === 'GET' && req.url === '/api/getToken'){
            res.send({token : req.csrfToken()});
        }else{
            next();
        }
    },
    doBatch : async (func)=>{
        if(func && typeof func === 'function'){
            func();
        }else{
            throw new Error('not function');
        }
    }
}

module.exports = helper;
