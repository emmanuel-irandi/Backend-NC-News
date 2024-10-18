const selectArticlesById = require("../models/modelThree.js");

const getId = (req,res)=>{
    if (isNaN(Number(req.params.article_id))) {
        res.status(400).send({msg : "invalid ID"})
        return 
    }
    selectArticlesById(req.params.article_id)
    .then((articlesData)=>{

        res.status(200).send({article_id : articlesData});
    })
}

module.exports = getId;