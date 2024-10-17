const db = require("../db/connection");

const updateVote = (articleId,inc_votes)=>{
    
    return db.query(`
        UPDATE articles
        SET votes = votes + ${inc_votes}
        WHERE article_id = ${articleId}
        RETURNING *
        `)
        .then((result)=>{
            return result.rows[0]
        })
}

module.exports = updateVote;