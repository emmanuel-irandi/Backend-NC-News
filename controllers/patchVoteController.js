const updateVote = require("../models/updateVotes.js");

const patchVote = (req,res)=>{
    updateVote(req.params.article_id,req.body.inc_votes)
    .then((articleData)=>{
        res.status(200).send({article : articleData});
    })
}

module.exports = patchVote;