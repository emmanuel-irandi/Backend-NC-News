const db = require("../db/connection");

const selectTopicsBySlug = (slug)=>{
    if (slug === "topic") return Promise.resolve()
    return db.query(`
        SELECT * FROM topics
        WHERE slug = '${slug}'
        `)
        .then((result)=>{
            if (result.rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: `No topic found:${slug}`
                })
            }
            return result.rows
        })
}

module.exports = selectTopicsBySlug