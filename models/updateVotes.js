const db = require("../db/connection");

const updateVote = (articleId,inc_votes)=>{
    
    return db.query(`
        UPDATE articles
        SET votes = votes + ${inc_votes}
        WHERE article_id = ${articleId}
        RETURNING *
        `)
        .then((result)=>{
            if(result.rows.length === 0) {
                return Promise.reject({
                    status : 404,
                    msg : `No article found with ID:${articleId}`
                })
            }
            return result.rows[0]
        })
}

module.exports = updateVote;