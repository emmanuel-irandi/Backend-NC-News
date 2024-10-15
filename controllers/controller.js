const selectTopics = require('../models/model.js');

const getTopics = (reg,res) => {

    selectTopics()
    .then((topicsData)=>{

        res.status(200).send({ topics: topicsData })
    })
}

module.exports = getTopics;