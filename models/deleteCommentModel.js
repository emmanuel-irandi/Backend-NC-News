const db = require("../db/connection");

const deleteCommentById = (commentId)=>{
    return db.query(`
        DELETE FROM comments 
        WHERE comment_id = ${commentId}
        `)
        .then((result)=>{
            if(result.rowCount === 0){
                return Promise.reject({
                    status : 404,
                    msg : `No comment found with ID:${commentId}`
                })
            }
            return
        })
}

module.exports = deleteCommentById;