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

            expect(article).toHaveProperty("comment_count")
        })
    })
    test("Receive a 400 when trying to access an invalid ID",()=>{
        return request(app)
        .get("/api/articles/a")
        .expect(400)
        .then((responce)=>{
            expect(responce.body.msg).toBe("invalid ID");
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
    test("Returns status code 400 when passing in the wrong properties",()=>{
        return request(app)
        .post("/api/articles/1/comments")
        .send({user : "lurker", comment : "unsubing rn"})
        .expect(400)
        .then((responce) => {
            expect(responce.body.msg).toBe("invalid properties")
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
    test("Returns status code 400 when passing in the wrong properties",()=>{
        return request(app)
        .patch("/api/articles/1")
        .send({votes : 10})
        .expect(400)
        .then((responce) => {
            expect(responce.body.msg).toBe("invalid property")
        })
    })
    test("Returns status code, 400 when passing in the wrong values",()=>{
        return request(app)
        .patch("/api/articles/1")
        .send({inc_votes : "Childish Gambino"})
        .expect(400)
        .then((responce) => {
            expect(responce.body.msg).toBe("invalid value")
        })
    })
})

describe("DELETE comment",()=>{
    test("Deletes comment at endpoint and sends back 204.",()=>{
        return request(app)
        .delete("/api/comments/1")
        .expect(204)
    })
    test("Returns a 400 when passed an invalid ID number",()=>{
        return request(app)
        .delete("/api/comments/donald-glover")
        .expect(400)
        .then((responce)=>{
            expect(responce.body.msg).toBe("invalid ID");
        })
    })
})

describe("GET users", ()=>{
    test("Return all the available users",()=>{
        return request(app)
        .get("/api/users")
        .expect(200)
        .then((responce) => {
            expect(Array.isArray(responce.body.users)).toBe(true);
            responce.body.users.forEach((user)=>{
            expect(user).toHaveProperty("username")

            expect(user).toHaveProperty("name")

    
            expect(user).toHaveProperty("avatar_url")
            })
        })
    })
});

describe("GET articles sort queries", ()=>{
    test("Return all the available articles sorted",()=>{
        return request(app)
        .get("/api/articles?sort_by=votes&order=asc")
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

describe("GET articles by topic query", ()=>{
    test("Return all the available articles filtered by topic",()=>{
        return request(app)
        .get("/api/articles?topic=mitch")
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