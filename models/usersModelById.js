const db = require("../db/connection");

const selectUsersById = (username)=>{
    
    return db.query(`
        SELECT * FROM users
        WHERE username = '${username}'
        `)
        .then((result)=>{
            if (result.rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: `No username found:${username}`
                })
            }
            return result.rows
        })
}

module.exports = selectUsersById