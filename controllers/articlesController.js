const selectArticles = require("../models/articlesModel.js");

const getArticles = (req,res)=>{
    selectArticles()
    .then((articlesData)=>{

        res.status(200).send({articles : articlesData});
    })
}

module.exports = getArticles;