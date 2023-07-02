const sequelize = require('../utils/connection');
const actorsCreate = require('./createData/actorsCreate');
const directorCreate = require('./createData/directorsCreate');
const genresCreate = require('./createData/genresCreate');
const moviesCreate = require('./createData/moviesCreate');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await actorsCreate();
        await directorCreate();
        await moviesCreate();
        await genresCreate();
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();