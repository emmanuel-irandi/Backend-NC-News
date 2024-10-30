const db = require("../db/connection");
const selectTopicsBySlug = require("./topicsModelBySlug")

const selectArticles = (sort_by = "created_at", order = "DESC", topic = 'topic') => {
    const details = ["title", "topic", "author", "body", "created_at", "votes", "article_img_url", "article_id"];
    if ((order.toUpperCase() !== "DESC" && order.toUpperCase() !== "ASC") || !details.includes(sort_by)) {
        return Promise.reject({
            status: 400,
            msg: `invalid sort_by/order`
        })
    }
    return selectTopicsBySlug(topic)
        .then(() => {
            return db.query(`
            SELECT * FROM articles
            WHERE topic = '${topic}'
            ORDER BY ${sort_by} ${order}
            `)
                .then((result) => {
                    return result.rows
                })
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

module.exports = selectArticles