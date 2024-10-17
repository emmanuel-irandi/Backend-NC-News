const db = require("../db/connection");

const selectComment = (articleId)=>{
    
    return db.query(`
        SELECT * FROM comments 
        WHERE article_id = ${articleId}
        ORDER BY created_at DESC
        `)
        .then((result)=>{
            return result.rows
        })
}

module.exports = selectComment;