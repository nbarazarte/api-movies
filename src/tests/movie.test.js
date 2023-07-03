const supertest = require("supertest");
const app = require("../app");
require("../models");

const Actor = require("../models/Actor");
const Movie = require("../models/Movie");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

let movieId;

test("GET -> '/api/v1/movies' should return status code 200", async () => {
  const res = await supertest(app).get("/api/v1/movies");
  expect(res.status).toBe(200);
  //expect(res.body).toHaveLength(2);
});

test("POST -> '/api/v1/movies', should return status code 201 ", async () => {
  const movie = {
    name: "EL SECRETO DE ADELINE",
    image:
      "https://es.web.img3.acsta.net/c_310_420/pictures/15/07/07/10/52/358930.jpg",
    synopsis:
      "La historia de Adaline, una bella joven de 29 años que tras un extraño accidente adquiere la capacidad de no envejecer, y con ella, la de no morir. Tras una larga vida solitaria a lo largo del siglo XX ocultando su secreto, por fin conocerá a un hombre por el cual podrá valer la pena perder su inmortalidad.",
    releaseYear: 2015,
  };

  const res = await supertest(app).post("/api/v1/movies").send(movie);

  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(movie.name);
});

test("PUT -> '/api/v1/movies/:id', should return status code 200 & res.body.name = movie.name", async () => {
  const movie = {
    name: "El Secreto de Adeline 2",
  };
  const res = await supertest(app).put(`/api/v1/movies/${movieId}`).send(movie);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movie.name);
});

test("POST -> '/movies/:id/actors', should return status code 201", async () => {
  const actorBody = {
    firstName: "Blake",
    lastName: "Lively",
    nationality: "americana",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Blake_Lively_Cannes_2016_3.jpg/220px-Blake_Lively_Cannes_2016_3.jpg",
    birthday: "1987-08-25",
  };

  const actor = await Actor.create(actorBody);

  const movieBody = {
    name: "EL SECRETO DE ADELINE",
    image:
      "https://es.web.img3.acsta.net/c_310_420/pictures/15/07/07/10/52/358930.jpg",
    synopsis:
      "La historia de Adaline, una bella joven de 29 años que tras un extraño accidente adquiere la capacidad de no envejecer, y con ella, la de no morir. Tras una larga vida solitaria a lo largo del siglo XX ocultando su secreto, por fin conocerá a un hombre por el cual podrá valer la pena perder su inmortalidad.",
    releaseYear: 2015,
  };

  const movie = await Movie.create(movieBody);

  const res = await supertest(app)
    .post(`/api/v1/movies/${movie.id}/actors`)
    .send([actor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await actor.destroy();
  await movie.destroy();
});

test("POST -> '/movies/:id/directors', should return status code 201", async () => {
  const directorBody = {
    firstName: "Lee Toland",
    lastName: "Krieger",
    nationality: "americana",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Lee_Toland_Krieger_%28cropped%29.jpg/220px-Lee_Toland_Krieger_%28cropped%29.jpg",
    birthday: "1983-01-24",
  };

  const director = await Director.create(directorBody);

  const movieBody = {
    name: "EL SECRETO DE ADELINE",
    image:
      "https://es.web.img3.acsta.net/c_310_420/pictures/15/07/07/10/52/358930.jpg",
    synopsis:
      "La historia de Adaline, una bella joven de 29 años que tras un extraño accidente adquiere la capacidad de no envejecer, y con ella, la de no morir. Tras una larga vida solitaria a lo largo del siglo XX ocultando su secreto, por fin conocerá a un hombre por el cual podrá valer la pena perder su inmortalidad.",
    releaseYear: 2015,
  };

  const movie = await Movie.create(movieBody);

  const res = await supertest(app)
    .post(`/api/v1/movies/${movie.id}/directors`) // Ruta
    .send([director.id]); // Enviar

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await director.destroy();
  await movie.destroy();
});

test("POST -> '/movies/:id/genres', should return status code 201 and res.body.name === body.name", async () => {
  const genresBody = {
    name: "Sci-Fi",
  };

  const genre = await Genre.create(genresBody);

  const movieBody = {
    name: "EL SECRETO DE ADELINE",
    image:
      "https://es.web.img3.acsta.net/c_310_420/pictures/15/07/07/10/52/358930.jpg",
    synopsis:
      "La historia de Adaline, una bella joven de 29 años que tras un extraño accidente adquiere la capacidad de no envejecer, y con ella, la de no morir. Tras una larga vida solitaria a lo largo del siglo XX ocultando su secreto, por fin conocerá a un hombre por el cual podrá valer la pena perder su inmortalidad.",
    releaseYear: 2015,
  };

  const movie = await Movie.create(movieBody);

  const res = await supertest(app)
    .post(`/api/v1/movies/${movie.id}/genres`)
    .send([genre.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await genre.destroy();
  await movie.destroy();
});

test("DELETE -> '/api/v1/movies/:id', should return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/movies/${movieId}`);
  expect(res.status).toBe(204);
});
