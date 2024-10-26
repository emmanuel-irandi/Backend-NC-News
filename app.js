const express = require("express")
const app = express()
const getTopics = require('./controllers/controller')
const getEndPoint = require('./controllers/controllerTwo')
const getId = require('./controllers/controllerThree')
const getArticles = require('./controllers/articlesController');
const getComments = require('./controllers/commentController');
const postComment = require('./controllers/postCommentController');
const patchVote = require('./controllers/patchVoteController');
const deleteComment = require('./controllers/deleteCommentController');
const getUsers = require('./controllers/usersController');
const {handleCustomErrors,handleServerErrors} = require('./errors/errorHandler');

app.use(express.json());
app.use(handleCustomErrors);
app.use(handleServerErrors);

app.get("/api/topics",getTopics)
app.get("/api",getEndPoint)
app.get("/api/articles/:article_id",getId);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments",getComments);

app.post("/api/articles/:article_id/comments",postComment);

app.patch("/api/articles/:article_id", patchVote);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users",getUsers);

module.exports = app;