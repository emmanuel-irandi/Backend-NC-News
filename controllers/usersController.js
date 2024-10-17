const selectUsers = require("../models/usersModel.js");

const getUsers = (req,res)=>{
    selectUsers()
    .then((usersData)=>{

        res.status(200).send({users : usersData});
    })
}

module.exports = getUsers;