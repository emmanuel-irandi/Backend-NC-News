const deleteCommentById = require("../models/deleteCommentModel.js");

const deleteComment = (req,res)=>{
    deleteCommentById(req.params.comment_id)
    .then(()=>{
        res.status(204).send({});
    })
}

module.exports = deleteComment;