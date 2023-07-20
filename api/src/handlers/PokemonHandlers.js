const {
  getAllPokemons,
  getPokemonName,
  getPokemonDetail,
  createPokemon,
} = require("../controllers/PokemonsController");

const getPokemons = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const pokemons = await getPokemonName(name);
      return res.json(pokemons);
    } else {
      const pokemons = await getAllPokemons();
      return res.json(pokemons);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const pokemonDetail = async (req, res) => {
  const { id } = req.params;
  // console.log(id, "idPokemon");
  const pokemonDetail = await getPokemonDetail(id);
  try {
    // if (!pokemonDetail) {
    //   throw new Error("Detail not found");
    // }
    res.send(pokemonDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const pokemonCreado = async (req, res) => {
  const nuevito = req.body;
  try {
    const pokemonNuevo = await createPokemon(nuevito);
    res.json(pokemonNuevo);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const filterPokemonsByType = (pokemons, type) => {
  if (type) {
    return pokemons.filter((pokemon) =>
      pokemon.types.includes(type.toLowerCase())
    );
  }
  return pokemons;
};

const sortPokemonsByName = (pokemons) => {
  return pokemons.slice().sort((a, b) => a.name.localeCompare(b.name));
};

const paginatePokemons = (pokemons, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  return pokemons.slice(startIndex, endIndex);
};
module.exports = {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
  filterPokemonsByType,
  sortPokemonsByName,
  paginatePokemons,
};
