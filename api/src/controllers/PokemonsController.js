const axios = require("axios");

const getAllPokemons = async () => {
  const pokemons = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=9"
  );
  return pokemons.data.results;
};
const getPokemonName = async (name) => {
  const apiResponse = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=9"
  );
  const pokemonList = apiResponse.data.results;
  const filteredPokemon = pokemonList.filter((p) => {
    p.nombre.toLowerCase() === name.toLowerCase();
  });
  if (filteredPokemon.length === 0) {
    return { message: "No pokemons found" };
  } else {
    return filteredPokemon;
  }
};

const getPokemonDetail = async (idPokemon) => {
  const apiResponse = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=9"
  );
  const pokemonData = apiResponse.data;
  const dbPokemon = await traerPokemon(idPokemon);

  const pokemonDetalle = {
    id: pokemonData.id,
    nombre: pokemonData.name,
    imagen: pokemonData.image,
    vida: pokemonData.stats.find((stat) => stat.stat.name === "life").base_stat,
    ataque: pokemonData.stats.find((stat) => stat.stat.name === "attack")
      .base_stat,
    defensa: pokemonData.stats.find((stat) => stat.stat.name === "defense")
      .base_stat,
    velocidad: pokemonData.stats.find((stat) => stat.stat.name === "speed")
      .base_stat,
    altura: pokemonData.height,
    peso: pokemonData.weight,
    tipo: pokemonData.types.map((type) => type.type.name),
  };
  if (dbPokemon) {
    pokemonDetalle.datos_adicionales = dbPokemon.datos_adicionales;
  }
  return pokemonDetalle;
};

const createPokemon = async (pj) => {
  const pokemonList = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=9"
  );
  const pjExists = pokemonList.data.find((p) => p.id === pj.id);
  if (pjExists) {
    throw new Error("Pokemon already exists");
  } else {
    pokemonList.push(pj);
    return pokemonList;
  }
};

module.exports = {
  getAllPokemons,
  getPokemonName,
  getPokemonDetail,
  createPokemon,
};
