const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host : 'secret',
    port : 'secret',
    user : 'secret',
    password : 'secret',
    database : 'secret'
});

const sqlMap = {
    getUser : `
        select name
          from user_note
         where name = ?
           and pw = ? 
    `,
};

const doQuery = async (sqlId, p)=>{
    let params = null,
        rows = null, 
        error = false;
        
        switch(sqlId){
            case 'getUser': params = [p.id, p.pw];
            break;
        }
        
    const conn = await db.getConnection(async c => c);
    try{
        await conn.beginTransaction();
        const rows = await conn.query(sqlMap[sqlId], params);
        await conn.commit();
        conn.release();
        return {rows, error};
    }catch(ex){
        console.log('DB Error ===> ' + ex);
        error = true;
        await conn.rollback();
        conn.release();
        return {rows, error};
    }
};

module.exports = doQuery;