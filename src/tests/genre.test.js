const supertest = require("supertest")
const app = require('../app')

let genreId;

test("GET -> '/api/v1/genres' should return status code 200 and to hace length is 2 ", async()=>{
    const res = await supertest(app)
    .get('/api/v1/genres')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2);
    //expect(res.body.length).toBe(2);// S puede usar de esta manera tambien
})

test("POST -> '/api/v1/genres' should return status code 201", async()=>{
    const genre = {
        name:"Terror"
    }
    const res = await supertest(app)
    .post('/api/v1/genres')
    .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)//code
    expect(res.body.name).toBe(genre.name)// se podria tambien hacer asi, pero no seria dinamico: toBe("Caracas")
})

test("PUT -> `/api/v1/genres/:id`, should return status code 200 & res.body.name = city.name", async()=>{
    const genre =  {
        name:"Sci-Fi"
    }
    const res = await supertest(app)
        .put(`/api/v1/genres/${genreId}`)
        .send(genre)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genre.name)
})

test("DELETE -> `/api/v1/genres/:id`, should return status code 204", async()=>{
    const res = await supertest(app).delete(`/api/v1/genres/${genreId}`)
    expect(res.status).toBe(204)
})