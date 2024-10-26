const db = require("../db/connection");
const selectArticlesById = require("./modelThree")

const selectComment = (articleId)=>{
    
    return db.query(`
        SELECT * FROM comments 
        WHERE article_id = ${articleId}
        ORDER BY created_at DESC
        `)
        .then((result)=>{
            return selectArticlesById(articleId)
            .then(()=>{
                return result.rows 
            })
            .catch((err)=>{
                return Promise.reject(err)
            })
        })
}

module.exports = selectComment;