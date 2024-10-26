const db = require("../db/connection");

const selectArticlesById = (articleId)=>{
    
    return db.query(`
        SELECT *,
        (SELECT COUNT(*) FROM comments WHERE comments.article_id = ${articleId}) AS comment_count
        FROM articles 
        WHERE article_id = ${articleId}
        `)
        .then((result)=>{
            if (result.rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: `No article found with ID:${articleId}`
                })
            }
            return result.rows
        })
}

module.exports = selectArticlesById