








const { Temperament } = require("../db");
const { getDogsTemperamentFromApi } = require("../services/api.services");

const getTempFromdb = async () => {
  try {
    const tempDb_size = await Temperament.count();
    if (tempDb_size === 0) {
      const tempsApi = await getDogsTemperamentFromApi();
     const filterDb = tempsApi.map(tempsName => {const obj = {name: tempsName}
        return obj;
      });
      console.log("llega...",filterDb)
      
      await Temperament.bulkCreate(filterDb);
    }

    const temps = await Temperament.findAll();
    return { status: 200, results: temps };
    
  } catch (error) {
    return { status: 500, error };
  }
};

module.exports = {
  getTempFromdb,
};
