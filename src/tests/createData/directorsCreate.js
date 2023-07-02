const Director = require("../../models/Director")

const directorCreate = async()=>{
    const director = [
        {
            firstName: "Joss",
            lastName: "Whedon",
            nationality: "americano",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Joss_Whedon_%2827970806483%29.jpg/270px-Joss_Whedon_%2827970806483%29.jpg",
            birthday:"1964-06-23"
        },
        {
            firstName: "to delete",
            lastName: "to delete",
            nationality: "to delete",
            image: "to delete",
            birthday:"1900-01-01"
        }       
    ]
    await Director.bulkCreate(director)
}

module.exports = directorCreate