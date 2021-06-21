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
        select user_id
             , note_id
             , note_name
             , ord
             , color
             , reg_dt
             , mod_dt
          from note
         where user_id = ? 
      order by ord asc
    `,
    insertNote : `
        insert into note(
            user_id,
            note_id,
            note_name,
            txt_cont,
            ord,
            color,
            reg_dt,
            mod_dt
        ) values (
            ?, ?, ?, ?, ?, ?,
            date_format(now(), '%Y%m%d%H%i%S'),
            DATE_FORMAT(now(), '%Y%m%d%H%i%S') 
        )
    `,
    deleteNote : `
        delete from note
        where user_id = ?
        and note_id = ?
    `,
    getTextContent : `
        select txt_cont
          from note
         where user_id = ?
           and note_id = ?
    `,
    saveTextContent : `
        update note
           set txt_cont = ?
         where user_id = ?
           and note_id = ?
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
                case 'insertNote': params = [p.user_id, p.note_id, p.note_name,
                    p.txt_cont, p.ord, p.color];
                    break;
            case 'deleteNote': params = [p.user_id, p.note_id];
                break;
            case 'getTextContent': params = [p.user_id, p.note_id];
                break;
            case 'saveTextContent': params = [p.txt_cont, p.user_id, p.note_id];
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