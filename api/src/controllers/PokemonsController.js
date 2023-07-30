const axios = require("axios");
const { formatPokemonData, formatCard, formatCardDb, formatPokemonDataDb } = require("../Utils/FormatPokemon");
const { Pokemon, Type } = require("../db");

const getAllPokemons = async () => {
  const apiResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
  const apiPokemons = apiResponse.data.results.map(async (pokemon) => {
    const response = await axios.get(pokemon.url);
    return formatCard(response.data, "API");
  });

  const dbPokemons = await Pokemon.findAll({
    include: [
      {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });

  const formattedDbPokemons = dbPokemons.map((pokemon) =>
    formatCardDb(pokemon, "Database")
  );

  const allPokemons = [...formattedDbPokemons, ...(await Promise.all(apiPokemons))];
  return allPokemons;
};

const paginatePokemons = (pokemons, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  return pokemons.slice(startIndex, endIndex);
};

const sortPokemonsByName = async (sort = 'asc', pokemons) => {
  const allPokemons = await pokemons;
  const sortedPokemons = allPokemons.slice().sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (sort === 'asc') {
      return nameA.localeCompare(nameB);
    } else if (sort === 'desc') {
      return nameB.localeCompare(nameA);
    } else {
      throw new Error('Invalid sort order');
    }
  });
  return sortedPokemons;
};

const getPokemonByType = async (type, pokemons) => {
  const allPokemons = await pokemons;
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.type.includes(type.toLowerCase())
  );

  return filteredPokemons;
};

const getPokemonName = async (name) => {
  try {
    const apiResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=9`
    );
    const pokemonList = apiResponse.data.results;
    const filteredPokemon = pokemonList.find(
      (p) => p.name === name.toLowerCase()
    );

    if (!filteredPokemon) {
      const existingPokemon = await Pokemon.findOne({
        where: { name: name.toLowerCase() },
      });

      if (!existingPokemon) {
        return { message: `No hay pokemones llamados ${name}` };
      }

      const formatPokemon = formatPokemonData(existingPokemon);
      return formatPokemon;
    }

    const pokemonResponse = await axios.get(filteredPokemon.url);
    const pokemonData = pokemonResponse.data;

    const formatPokemon = formatPokemonData(pokemonData);
    return formatPokemon;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPokemonDetail = async (id) => {
  if (id.length <= 4) {
    try {
      const pokemonDetalle = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokemonDetail = pokemonDetalle.data;
      return formatPokemonData(pokemonDetail);
    } catch (error) {
      throw new Error(
        `Error fetching Pokemon details from API: ${error.message}`
      );
    }
  } else {
    try {
      const dbPokemon = await Pokemon.findByPk(id, {
        include: Type,
      });
      if (!dbPokemon) {
        throw new Error(`Pokemon with ID ${id} not found in the database.`);
      }
      const formattedPokemon = formatPokemonDataDb(dbPokemon);
      return formattedPokemon;
    } catch (error) {
      throw new Error(
        `Error fetching Pokemon details from database: ${error.message}`
      );
    }
  }
};

const createPokemon = async ({
  id,
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  type,
}) => {
  let objPokemon = {
    id,
    name,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
  };

  const foundTypes = await Type.findAll({ where: { name: type } });

  if (foundTypes.length > 0) {
    const newPokemon = await Pokemon.create(objPokemon);
    await newPokemon.setTypes(foundTypes);

    const typeNames = foundTypes.map((foundType) => foundType.name);

    const fetchedPokemon = {
      id: newPokemon.id,
      name: newPokemon.name,
      image: newPokemon.image,
      life: newPokemon.life,
      attack: newPokemon.attack,
      defense: newPokemon.defense,
      speed: newPokemon.speed,
      height: newPokemon.height,
      weight: newPokemon.weight,
      type: typeNames,
    };

    console.log(fetchedPokemon);
    return fetchedPokemon;
  } else {
    console.error("Unable to find the specified types.");
    return null;
  }
};


module.exports = {
  getAllPokemons,
  getPokemonName,
  getPokemonDetail,
  createPokemon,
  sortPokemonsByName,
  getPokemonByType,
  paginatePokemons,
};
