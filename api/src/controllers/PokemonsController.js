const axios = require("axios");
const { formatPokemonData, formatCard, formatCardDb, formatPokemonDataDb } = require("../Utils/FormatPokemon");
const { Pokemon, Type } = require("../db");

const getAllPokemons = async () => {
  const apiResponse = (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")).data.results;
  const apiPokemons = await Promise.all(
    apiResponse.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      return formatCard(response.data, "API");
    }));

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

const sortPokemonsByAttack = async (sort = 'max', pokemons) => {
  const allPokemons = await pokemons;
  const sortedPokemons = allPokemons.sort((a, b) => {
    const attackA = a.attack;
    const attackB = b.attack;

    if (sort === 'max') {
      return attackB - attackA;
    } else if (sort === 'min') {
      return attackA - attackB;
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

const getPokemonBySource = async (source = 'DB', pokemons) => {
  const allPokemons = await pokemons;
  if (source === 'DB') {
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.source === 'DB');
    return filteredPokemons;
  } else if (source === 'API') {
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.source === 'API');
    return filteredPokemons;
  }
};

const getPokemonName = async (name) => {
  try {
    const apiResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=251`
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
    const pokemonDetalle = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const pokemonDetail = pokemonDetalle.data;
    return formatPokemonData(pokemonDetail);
  } else {
    const dbPokemon = await Pokemon.findByPk(id, {
      include: Type,
    });
    if (!dbPokemon) {
      throw new Error(`Pokemon with ID ${id} not found in the database.`);
    }
    const formattedPokemon = formatPokemonDataDb(dbPokemon);
    return formattedPokemon;
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

const deletePokemon = async (id) => {
  if (id.length <= 4) {
    throw new Error('Cannot delete Pokemon from API')
  } else {
    const dbPokemon = await Pokemon.findByPk(id)
    if (!dbPokemon) {
      throw new Error(`Pokemon with ID ${id} not found in the database.`);
    }
    await dbPokemon.destroy()
    return { message: 'Pokemon deleted successfully' };
  }
}

const changePokemon = async (
  id,
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  type
) => {
  const elpepe = await Pokemon.findOne({ where: { id: id } });

  if (!elpepe) {
    return "Pokemon not found.";
  }

  const pepito = {};
  if (name) {
    pepito.name = name;
  }
  if (image) {
    pepito.image = image;
  }
  if (life) {
    pepito.life = life;
  }
  if (attack) {
    pepito.attack = attack;
  }
  if (defense) {
    pepito.defense = defense;
  }
  if (speed) {
    pepito.speed = speed;
  }
  if (height) {
    pepito.height = height;
  }
  if (weight) {
    pepito.weight = weight;
  }

  if (type) {
    const foundTypes = await Type.findAll({ where: { name: type } });
    if (foundTypes.length > 0) {
      await elpepe.setTypes(foundTypes);
      const typeNames = foundTypes.map((foundType) => foundType.name);
      pepito.type = typeNames;
    } else {
      return "Unable to find the specified types.";
    }
  }

  const [updatedRows] = await Pokemon.update(pepito, {
    where: {
      id: id
    }
  });

  if (updatedRows > 0) {
    await elpepe.reload();
    
    return elpepe;
  } else {
    return "Unable to update the specified Pokemon.";
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
  sortPokemonsByAttack,
  getPokemonBySource,
  deletePokemon,
  changePokemon
};
