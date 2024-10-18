const insertComment = require("../models/postCommentModel.js");
const users = require("../db/data/test-data/users.js")

const postComment = (req,res)=>{
    if (!req.body.username || !req.body.body){
        res.status(400).send({msg : "invalid properties"})
        return
    }
    insertComment(req.params.article_id,req.body)
    .then(()=>{
        res.status(201).send({username : req.body.username, body : req.body.body });
    })
}

module.exports = postComment;