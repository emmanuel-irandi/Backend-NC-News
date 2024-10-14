const express = require("express")
const app = express()
const topicsData = require('./db/data/development-data/topics.js')

app.use(express.json())

app.get("/api/topics", (reg,res) => {
    res.status(200).json({ topics: topicsData })
})

module.exports = app;