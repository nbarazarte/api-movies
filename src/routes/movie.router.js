const { getAll, create, getOne, remove, update, setGenres, setActors, setDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

    routerMovie.route('/:id/genres') //  /movie/:id/genres
    .post(setGenres)

    routerMovie.route('/:id/actors') //  /movie/:id/actors
    .post(setActors)
    
    routerMovie.route('/:id/directors') //  /movie/:id/directors
    .post(setDirectors)    

module.exports = routerMovie;