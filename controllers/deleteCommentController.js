const deleteCommentById = require("../models/deleteCommentModel.js");

const deleteComment = (req,res)=>{
    if (isNaN(Number(req.params.comment_id))) {
        res.status(400).send({msg : "invalid ID"})
        return 
    }
    deleteCommentById(req.params.comment_id)
    .then(()=>{
        res.status(204).send({});
    })
    .catch((err)=>{
        res.status(err.status).send({msg : err.msg})
    })
}

module.exports = deleteComment;