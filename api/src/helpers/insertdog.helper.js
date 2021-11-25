

const { Raza} = require("../db");

const insertDog = async (dogObject, temperament) => {
  try {
    const dogRegister = await Raza.create(dogObject);

    if (dogRegister) {
      await dogRegister.setTemps(JSON.parse(temperament));

      return {
        status: 201,
        message: "Register successfully",
        data: dogRegister,
      };
    } else {
      return { status: 204, message: "Oops, Register failed" };
    }
  } catch (error) {
    return { status: 500, error };
  }
};

module.exports = {
  insertDog,
};