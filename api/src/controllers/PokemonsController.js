const axios = require("axios");

const getAllPokemons = async () => {
  const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=9");
  return pokemons.data.results;
};

const getPokemonName = async (name) => {
  const apiResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=9`
  );
  const pokemonList = apiResponse.data.results;
  // console.log(pokemonList, 'pokemonList');
  const filteredPokemon = pokemonList.find((p) => p.name == name.toLowerCase());
  // console.log(filteredPokemon, 'filteredPokemon');
  if (filteredPokemon.length == 0) {
    return { message: `No hay pokemones llamados ${name}` };
  } else {
    return filteredPokemon;
  }
};

const getPokemonDetail = async (id) => {
  // const apiResponse = await axios.get(
  //   "https://pokeapi.co/api/v2/pokemon?limit=9"
  // );
  // const pokemonData = apiResponse.data.results;
  // let pokemonDetalle = []
  if (id.length < 4) {
    // console.log(id, 'idvfabgdshrv')
    // const pokemonDetalle = await pokemonData.find(id => id == pokemonData.id);
    const pokemonDetalle = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    let pokemonDetail = pokemonDetalle.data
    return pokemonDetail
  }
  
  // const dbPokemon = {
  //   id: pokemonData.id,
  //   nombre: pokemonData.name,
  //   imagen: pokemonData.image,
  //   vida: pokemonData.stats.find((stat) => stat.stat.name === "life").base_stat,
  //   ataque: pokemonData.stats.find((stat) => stat.stat.name === "attack")
  //     .base_stat,
  //   defensa: pokemonData.stats.find((stat) => stat.stat.name === "defense")
  //     .base_stat,
  //   velocidad: pokemonData.stats.find((stat) => stat.stat.name === "speed")
  //     .base_stat,
  //   altura: pokemonData.height,
  //   peso: pokemonData.weight,
  //   tipo: pokemonData.types.map((type) => type.type.name),
  // };
  // if (dbPokemon) {
  //   pokemonDetalle.datos_adicionales = dbPokemon.datos_adicionales;
  // };
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
