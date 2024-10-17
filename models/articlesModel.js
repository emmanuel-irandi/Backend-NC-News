const db = require("../db/connection");

const selectArticles = (sort_by = "created_at",order = "DESC")=>{
    return db.query(`
        SELECT * FROM articles
        ORDER BY ${sort_by} ${order}

        `)
        .then((result)=>{
            return result.rows
        })
}

module.exports = selectArticles