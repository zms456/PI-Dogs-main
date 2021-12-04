const {Raza, Temperament} = require("../db");
const { Op } = require("sequelize");

const getDogDb = async () => {
  try {
    const dogsDB = await Raza.findAll({
      include: Temperament,
    });
    if (dogsDB.length > 0) {
      return { status: 200, results: dogsDB };
    } else {
      return { status: 404, message: "Request not Found" };
    }
  } catch (error) {
    return { status: 500, error };
  }
};

const getDogsByNameFromDb = async (name) => {
  try {
    const dogByName = await Raza.findAll({
      include: Temperament,
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    if (dogByName.length > 0) {
      return { status: 200, results: dogByName };
    } else {
      return { status: 404, message: "Request Not found" };
    }
  } catch (error) {
    return { status: 500, error };
  }
};


const insertDog = async (dogsObject, temperament) => {
  
  try {
    const dogRegister = await Raza.create(dogsObject);
   
    if (dogRegister) {
      
      await dogRegister.setTemperaments(temperament);
      
      return {
        status: 201,
        message: "Register successfully",
        data: dogRegister,
      };
    } else {
      return { status: 204, message: "Oops, Register failed" };
    }
  } catch (error) {
    return { status: 500,  error };
  }
};




module.exports = {
  insertDog,
  getDogDb,
  getDogsByNameFromDb,
};