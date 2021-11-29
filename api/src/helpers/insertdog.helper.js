const {Raza} = require("../db");

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
};