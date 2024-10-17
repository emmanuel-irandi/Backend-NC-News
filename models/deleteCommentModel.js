const db = require("../db/connection");

const deleteCommentById = (commentId)=>{
    
    return db.query(`
        DELETE FROM comments 
        WHERE comment_id = ${commentId}
        `)
}

module.exports = deleteCommentById;