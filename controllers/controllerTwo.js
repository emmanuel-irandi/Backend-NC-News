const endPointData = require('../endpoints.json');

const getEndPoint = (reg,res) => {
    res.status(200).send({ endpoints : endPointData})
}

module.exports = getEndPoint;