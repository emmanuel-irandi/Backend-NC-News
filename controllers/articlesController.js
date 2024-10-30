const selectArticles = require("../models/articlesModel.js");

const getArticles = (req,res)=>{
    selectArticles(req.query.sort_by,req.query.order,req.query.topic)
    .then((articlesData)=>{
        res.status(200).send({articles : articlesData});
    })
    .catch((err)=>{
        res.status(err.status).send({msg : err.msg})
    })
}

module.exports = getArticles;