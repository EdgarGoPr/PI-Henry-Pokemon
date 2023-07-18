const axios = require("axios");

const getAllPokemons = async () => {
  const api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
  return api;
};

getAllPokemons()
  .then((result) => {
    console.log(result.data);
  }) 
  .catch((error) => {
    console.log(error);
  });
