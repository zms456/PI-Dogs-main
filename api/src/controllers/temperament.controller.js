
const {
    getTempFromdb,
} = require("../helpers/temperament.helper")



const getTemperament = async (req, res) => {
  
    //temperament
    const dogsTemperament = await getTempFromdb();
  
    return res.send({ fromApi: dogsTemperament.status === 404 ? [] : dogsTemperament});
};

module.exports = {
    getTemperament,
  };