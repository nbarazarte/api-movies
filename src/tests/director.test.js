const supertest = require("supertest")
const app = require('../app')

let directorId;

test("GET -> '/api/v1/directors' should return status code 200 and to hace length is 2 ", async()=>{
    const res = await supertest(app)
    .get('/api/v1/directors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2);
    //expect(res.body.length).toBe(2);// S puede usar de esta manera tambien
})

test("POST -> '/api/v1/directors' should return status code 201", async()=>{
    const director = {
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "americano",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg/270px-Steven_Spielberg_by_Gage_Skidmore.jpg",
        birthday:"1946-12-18"
    }
    const res = await supertest(app)
    .post('/api/v1/directors')
    .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)//code
    expect(res.body.firstName).toBe(director.firstName)// se podria tambien hacer asi, pero no seria dinamico: toBe("Caracas")
})

test("GET ONE -> '/api/v1/directors/:id', should return status code 200 ", async()=>{
    const res = await supertest(app)
    .get(`/api/v1/directors/${directorId}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Steven")
})

test("PUT -> `/api/v1/directors/:id`, should return status code 200 & res.body.name = city.name", async()=>{
    const director =  {
        firstName:"Neel"
    }
    const res = await supertest(app)
        .put(`/api/v1/directors/${directorId}`)
        .send(director)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(director.firstName)
})

test("DELETE -> `/api/v1/directors/:id`, should return status code 204", async()=>{
    const res = await supertest(app).delete(`/api/v1/directors/${directorId}`)
    expect(res.status).toBe(204)
})