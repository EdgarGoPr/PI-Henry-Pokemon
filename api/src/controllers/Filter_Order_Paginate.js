const { getTypes, getAllPokemons } = require("./PokemonsController");

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
