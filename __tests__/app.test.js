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