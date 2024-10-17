const express = require("express")
const app = express()
const getTopics = require('./controllers/controller')
const getEndPoint = require('./controllers/controllerTwo')
const getId = require('./controllers/controllerThree')
const getArticles = require('./controllers/articlesController');
const getComments = require('./controllers/commentController');
const postComment = require('./controllers/postCommentController');

app.use(express.json());

app.get("/api/topics",getTopics)
app.get("/api",getEndPoint)
app.get("/api/articles/:article_id",getId);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments",getComments);

app.post("/api/articles/:article_id/comments",postComment);

module.exports = app;