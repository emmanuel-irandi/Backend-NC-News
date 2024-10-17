const insertComment = require("../models/postCommentModel.js");

const postComment = (req,res)=>{
    console.log(req.params.article_id,req.body)
    insertComment(req.params.article_id,req.body)
    .then(()=>{
        res.status(201).send({username : req.body.username, body : req.body.body });
    })
}

module.exports = postComment;