const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json");


beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET: 200 - testing endpoints",()=>{
    test("should respdon with an array of topic objects, containing slug and description",()=>{
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then((responce) => {
                expect(responce.body.topics.length).toBe(3)
                responce.body.topics.forEach((topic) => {
                    expect(topic).toHaveProperty("slug");
                    expect(topic).toHaveProperty("description")
                })
            })
    })
})

describe("GET /api", () => {
    test("return documentation of all available endpoints", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then((response) => {
                expect(response.body.endpoints).toHaveProperty("GET /api");
                expect(response.body.endpoints).toHaveProperty("GET /api/topics"); 
            });
    });
});

describe("GET article by id", ()=>{
    test("Returns the article that was accessed by ID",()=>{
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((responce) => {
            const article = responce.body.article_id[0];
            expect(article).toHaveProperty("author")
            expect(article).toHaveProperty("title")
            expect(article).toHaveProperty("article_id")

            expect(article).toHaveProperty("body")
            expect(article).toHaveProperty("topic")

            expect(article).toHaveProperty("created_at")
            expect(article).toHaveProperty("votes")
            expect(article).toHaveProperty("article_img_url")
        })
    })
});

describe("GET articles", ()=>{
    test("Return all the available articles",()=>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((responce) => {
            expect(Array.isArray(responce.body.articles)).toBe(true);
            responce.body.articles.forEach((article)=>{
            expect(article).toHaveProperty("author")
            expect(article).toHaveProperty("title")
            expect(article).toHaveProperty("article_id")

            expect(article).toHaveProperty("body")
            expect(article).toHaveProperty("topic")

            expect(article).toHaveProperty("created_at")
            expect(article).toHaveProperty("votes")
            expect(article).toHaveProperty("article_img_url")
            })
        })
    })
});

describe("GET comments", ()=>{
    test("Return all of the comments on an article",()=>{
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then((responce) => {
            expect(Array.isArray(responce.body.comments)).toBe(true);
            responce.body.comments.forEach((comment)=>{
            expect(comment).toHaveProperty("comment_id")
            expect(comment).toHaveProperty("votes")
            expect(comment).toHaveProperty("created_at")
            expect(comment).toHaveProperty("body")
            expect(comment).toHaveProperty("author")
            expect(comment).toHaveProperty("article_id")
            })
        })
    })
});

describe("POST comments", ()=>{
    test("Returns status code of 201 - created. Responds with the posted commment.",()=>{
        return request(app)
        .post("/api/articles/1/comments")
        .send({username : "lurker", body : "unsubing rn"})
        .expect(201)
        .then((responce) => {
            expect(responce.body).toHaveProperty("username")
            expect(responce.body).toHaveProperty("body")
        })
    })
});

describe("Patch votes",()=>{
    test("Increment the votes on an article and return the article back.",()=>{
        return request(app)
        .patch("/api/articles/1")
        .send({inc_votes : 10})
        .expect(200)
        .then((responce) => {
            expect(responce.body.article.votes).toBe(110)
        })
    })
})