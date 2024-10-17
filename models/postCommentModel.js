const db = require("../db/connection");

const insertComment = (articleId,requestBody)=>{
    
    return db.query(`
        INSERT INTO comments(body, article_id, author) VALUES($1,$2,$3) RETURNING *
        `,[requestBody.body,articleId,requestBody.username])
        .then((result)=>{
            return result.rows[0]
        })
}

module.exports = insertComment;