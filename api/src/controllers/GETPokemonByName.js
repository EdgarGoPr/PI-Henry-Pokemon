const axios = require("axios");

const getPokemonName = async (name) => {
  try {
    const apiResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    const pokemonList = apiResponse.data.results;
    const filteredPokemon = pokemonList.filter((p) => {
      p.nombre.toLowerCase() === name.toLowerCase();
    });
    if (filteredPokemon.length) {
      return { message: "No pokemons found" };
    } else {
      return filteredPokemon;
    }
  } catch (error) {
    throw new Error({ message: "There is no pokemon with that name" });
  }
};

module.exports = getPokemonName;
