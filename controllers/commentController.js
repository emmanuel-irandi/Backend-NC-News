const selectComment = require("../models/commentModel.js");

const getComments = (req,res)=>{
    selectComment(req.params.article_id)
    .then((commentData)=>{

        res.status(200).send({comments : commentData});
    })
}

module.exports = getComments;