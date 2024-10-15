const express = require("express")
const app = express()
const getTopics = require('./controllers/controller')
const getEndPoint = require('./controllers/controllerTwo')


app.get("/api/topics",getTopics)
app.get("/api",getEndPoint)

/*
we need to require our controller to establish the connection between this and that,
then we simply just need to add another app.get to our approriate end point
*/

module.exports = app;