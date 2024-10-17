const selectArticlesById = require("../models/modelThree.js");

const getId = (req,res)=>{
    selectArticlesById(req.params.article_id)
    .then((articlesData)=>{

        res.status(200).send({article_id : articlesData});
    })
}

module.exports = getId;