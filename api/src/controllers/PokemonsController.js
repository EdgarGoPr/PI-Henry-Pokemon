const axios = require("axios");
const { formatPokemonData } = require("../Utils/FormatPokemon");
const { Pokemon } = require("../models/Pokemon");

const getAllPokemons = async () => {
  const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=9");

  return pokemons.data.results;
};

const getPokemonName = async (name) => {
  try {
    const apiResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=9`
    );
    const pokemonList = apiResponse.data.results;
    // console.log(pokemonList, 'pokemonList');
    const filteredPokemon = pokemonList.find(
      (p) => p.name == name.toLowerCase()
    );
    if (!filteredPokemon) {
      return { message: `No hay pokemones llamados ${name}` };
    }
    const pokemonResponse = await axios.get(filteredPokemon.url);
    const pokemonData = pokemonResponse.data;
    const formatPokemon = formatPokemonData(pokemonData);
    return formatPokemon;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getPokemonDetail = async (id) => {
  if (id.length <= 4) {
    // console.log(id, 'idvfabgdshrv')
    // const pokemonDetalle = await pokemonData.find(id => id == pokemonData.id);
    const pokemonDetalle = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    let pokemonDetail = pokemonDetalle.data;
    return formatPokemonData(pokemonDetail);
  } else {
    const dbPokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.image,
      health: pokemonData.health,
      attack: pokemonData.attack,
      defense: pokemonData.defense,
      speed: pokemonData.speed,
      height: pokemonData.height,
      weight: pokemonData.weight,
      type: pokemonData.types.map((type) => type.type.name),
    };
    return dbPokemon;
  }
};

const createPokemon = async (pokemonData) => {
  try {
    const pjExists = Pokemon.findOne({ id: pokemonData.id });
    if (pjExists === undefined || pjExists === null) {
      const newPokemon = new Pokemon({
        name: pokemonData.name,
        image: pokemonData.image,
        health: pokemonData.health,
        attack: pokemonData.attack,
        defense: pokemonData.defense,
        speed: pokemonData.speed,
        height: pokemonData.height,
        weight: pokemonData.weight,
        type: pokemonData.types.map((type) => type.type.name),
      });
      await newPokemon.save();
      return newPokemon;
    } else {
      throw new Error("Pokemon already exists");
    }
  } catch (error) {
    throw new Error(`Error creating a new Pokemon: ${error.message}`);
  }
};

module.exports = {
  getAllPokemons,
  getPokemonName,
  getPokemonDetail,
  createPokemon,
};
