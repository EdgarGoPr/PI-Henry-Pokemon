const axios = require("axios");

const getTypes = async () => {
  const tipos = await axios.get("https://pokeapi.co/api/v2/type");
  return tipos.data;
};

module.exports = getTypes;
