const selectArticles = require("../models/articlesModel.js");

const getArticles = (req,res)=>{
    selectArticles(req.query.sort_by,req.query.order,req.query.topic)
    .then((articlesData)=>{
        res.status(200).send({articles : articlesData});
    })
    .catch((err)=>{
        if (err.status) {
            res.status(err.status).send({msg : err.msg})
        }
        else {
            res.status(400).send({msg : "bad request"})
        }
    })
}

module.exports = getArticles;