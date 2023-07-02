const Actor = require("../../models/Actor")

const actorsCreate = async()=>{
    const actors = [
        {
            firstName: "Robert",
            lastName: "Downey Jr.",
            nationality: "americano",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/220px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg",
            birthday:"1965-04-04"
        },
        {
            firstName: "to delete",
            lastName: "to delete",
            nationality: "to delete",
            image: "to delete",
            birthday:"1900-01-01"
        }       
    ]
    await Actor.bulkCreate(actors)
}

module.exports = actorsCreate