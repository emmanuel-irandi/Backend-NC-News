const express = require("express")
const app = express()
const getTopics = require('./controllers/controller')
const getEndPoint = require('./controllers/controllerTwo')
const getId = require('./controllers/controllerThree')


app.get("/api/topics",getTopics)
app.get("/api",getEndPoint)
app.get("/api/articles/:article_id",getId);


module.exports = app;