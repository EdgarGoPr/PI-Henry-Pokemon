const { getTypes, getAllPokemons } = require("./PokemonsController");

const getPokemonByType = async (type) => {
  try {
    const allPokemons = await getAllPokemons();
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.type.includes(type.toLowerCase())
    );

    return filteredPokemons;
  } catch (error) {
    throw new Error("Error filtering Pokemon by type:", error);
  }
};

const sortPokemonsByName = async (sortOrder = 'asc') => {
  const allPokemons = await getAllPokemons();
  const sortedPokemons = allPokemons.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'desc') {
      return b.name.localeCompare(a.name);
    } else {
      throw new Error('Invalid sort order');
    }
  });
  return sortedPokemons;
};


const paginatePokemons = (pokemons, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  return pokemons.slice(startIndex, endIndex);
};

module.exports = {
  getPokemonByType,
  sortPokemonsByName,
  paginatePokemons,
};
