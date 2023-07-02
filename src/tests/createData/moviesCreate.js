const Movie = require("../../models/Movie")

const moviesCreate = async()=>{
    const movies = [
        {
            name: "Jhon Wick",
            image: "https://m.media-amazon.com/images/M/MV5BNzVlNTAwMTAtNWRiYS00NzFiLWIxMTUtODAwMDJiZmI5ZTc2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_QL75_UX380_CR0,0,380,562_.jpg",
            synopsis: "Un Asesino letal",
            releaseYear: 2014
        },
        {
            name: "to delete",
            image: "to delete",
            synopsis: "to delete",
            releaseYear: 1900
        }      
    ]
    await Movie.bulkCreate(movies)
}

module.exports = moviesCreate