const db = require("../db/connection");

const selectArticles = (sort_by = "created_at",order = "DESC",topic = 'topic')=>{
    return db.query(`
        SELECT * FROM articles
        WHERE topic = '${topic}'
        ORDER BY ${sort_by} ${order}
        `)
        .then((result)=>{
            return result.rows
        })
}

module.exports = selectArticles