const supertest = require("supertest")
const app = require('../app')

let actorId;

test("GET -> '/api/v1/actors' should return status code 200 and to have length is 2 ", async()=>{
    const res = await supertest(app)
    .get('/api/v1/actors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2);
    //expect(res.body.length).toBe(2);// S puede usar de esta manera tambien
})

test("POST -> '/api/v1/actors' should return status code 201", async()=>{
    const actor = {
        firstName: "Keanu",
        lastName: "Reeves",
        nationality: "americano",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Keanu_Reeves_2019.jpg/220px-Keanu_Reeves_2019.jpg",
        birthday:"1964-09-02"
    }
    const res = await supertest(app)
    .post('/api/v1/actors')
    .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)//code
    expect(res.body.firstName).toBe(actor.firstName)// se podria tambien hacer asi, pero no seria dinamico: toBe("Caracas")
})

/* test("GET ONE -> '/api/v1/actors/:id', should return status code 200 ", async()=>{
    const res = await supertest(app)
    .get(`/api/v1/actors/${actorId}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Keanu")
}) */

test("PUT -> `/api/v1/actors/:id`, should return status code 200 & res.body.name = actor.firstName", async()=>{
    const actor =  {
        firstName:"Neel"
    }
    const res = await supertest(app)
        .put(`/api/v1/actors/${actorId}`)
        .send(actor)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actor.firstName)
})

test("DELETE -> `/api/v1/actors/:id`, should return status code 204", async()=>{
    const res = await supertest(app).delete(`/api/v1/actors/${actorId}`)
    expect(res.status).toBe(204)
})