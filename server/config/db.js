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
        select id
          from user_note
         where id = ?
           and pw = ? 
    `,
    insertUser : `
        insert into user_note
        (id, pw) 
        values
        (?, ?)
    `,
    getNoteList : `
        select * 
          from note
         where user_id = ? 
      order by ord asc
    `
};

const doQuery = async (sqlId, p)=>{
    let params = null,
        rows = null, 
        error = false;
        
        switch(sqlId){
            case 'getUser': params = [p.id, p.pw];
                break;
            case 'insertUser': params = [p.id, p.pw];
                break;
            case 'getNoteList': params = [p.user_id];
                break;
        }
        
    const conn = await db.getConnection(async c => c);
    try{
        await conn.beginTransaction();
        const [rows, tmp] = await conn.query(sqlMap[sqlId], params);
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