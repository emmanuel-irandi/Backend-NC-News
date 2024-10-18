const updateVote = require("../models/updateVotes.js");

const patchVote = (req,res)=>{
    if (!req.body.inc_votes){
        res.status(400).send({msg : "invalid property"})
        return
    }
    if (isNaN(Number(req.body.inc_votes))){
        res.status(400).send({msg : "invalid value"})
        return
    }
    updateVote(req.params.article_id,req.body.inc_votes)
    .then((articleData)=>{
        res.status(200).send({article : articleData});
    })
}

module.exports = patchVote;