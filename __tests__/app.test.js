const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const fs = require("fs/promises")
const endpoints = require("../endpoints.json")

describe("GET: 200 - testing endpoints",()=>{
    test(" returns a status of 200.",()=>{
        return request(app)
         .get("/api/topics")
         .expect(200)
    })
    test("should respond with an array of all the topics",()=>{
        return request(app)
        .get('/api/topics')
        .then((responce)=>{
            expect(Array.isArray(responce.body.topics)).toBe(true)
          })
    })
    test("should respdon with an array of topic objects, containing slug and description",()=>{
        return request(app)
            .get('/api/topics')
            .then((responce) => {
                responce.body.topics.forEach((topic) => {
                    expect(topic).toHaveProperty("slug");
                    expect(topic).toHaveProperty("description")
                })
            })
    })
})
