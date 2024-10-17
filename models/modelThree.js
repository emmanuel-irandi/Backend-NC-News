const db = require("../db/connection");

const selectArticlesById = (articleId)=>{
    
    return db.query(`
        SELECT * FROM articles WHERE article_id = ${articleId}
        `)
        .then((result)=>{
            return result.rows
        })
}

module.exports = selectArticlesById