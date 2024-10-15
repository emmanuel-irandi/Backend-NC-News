const express = require("express")
const app = express()
const getTopics = require('./controllers/controller')
const getEndPoint = require('./controllers/controllerTwo')



app.get("/api/topics",getTopics)
app.get("/api",getEndPoint)

module.exports = app;