const selectComment = require("../models/commentModel.js");

const getComments = (req,res)=>{
    if (isNaN(Number(req.params.article_id))) {
        res.status(400).send({msg : "invalid ID"})
        return 
    }
    selectComment(req.params.article_id)
    .then((commentData)=>{

        res.status(200).send({comments : commentData});
    })
    .catch((err)=>{
        res.status(err.status).send({msg : err.msg});
    })
}

module.exports = getComments;