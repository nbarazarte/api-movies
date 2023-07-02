const Genre = require("../../models/Genre")

const genresCreate = async()=>{
    const genres = [
        {
            name: "Action",
        },
        {
            name: "to delete",
        }       
    ]
    await Genre.bulkCreate(genres)
}

module.exports = genresCreate