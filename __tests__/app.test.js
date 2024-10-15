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
    test("",()=>{
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then((responce) => {
            /*
            similarily to ticket 2, but modified for the specifics of the question,
            we could do something along the lines of first of, expecting the length of the object to be 8 or more,
            as we're working with 8 parameters, then we could just do 8 different expect toHaveProperty's for each one we was asked to include.
            That overall should cover everything we're looking for?
            */
        })
    })
})