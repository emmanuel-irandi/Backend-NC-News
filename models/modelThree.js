const db = require("../db/connection");

const selectArticlesById = (articleId)=>{
    
    return db.query(`
        SELECT *,
        (SELECT COUNT(*) FROM comments WHERE comments.article_id = ${articleId}) AS comment_count
        FROM articles 
        WHERE article_id = ${articleId}
        `)
        .then((result)=>{
            return result.rows
        })
}

module.exports = selectArticlesById