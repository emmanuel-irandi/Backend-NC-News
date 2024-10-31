const db = require("../db/connection");
const selectArticles = require("./articlesModel");
const selectArticlesById = require("./modelThree");
const selectUsersById = require("./usersModelById");

const insertComment = (articleId, requestBody) => {

    return selectArticlesById(articleId)
        .then(() => {
            return selectUsersById(requestBody.username)
                .then(() => {
                    return db.query(`
                    INSERT INTO comments(body, article_id, author) VALUES($1,$2,$3) RETURNING *
                    `, [requestBody.body, articleId, requestBody.username])
                        .then((result) => {
                            return result.rows[0]
                        })
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

module.exports = insertComment;