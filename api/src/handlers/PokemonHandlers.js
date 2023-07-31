const {
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
} = require("../controllers/PokemonsController");

const getPokemons = async (req, res) => {
  try {
    const { name, sort, type, page, pageSize, source } = req.query;
    if (name) {
      const pokemons = await getPokemonName(name);
      return res.json(pokemons);
    }
    let pokemons = await getAllPokemons();
    if (source) {
      if (source === 'DB' || source === 'API') {
        pokemons = await getPokemonBySource(source, pokemons)
      }
      if (source !== 'DB' && source !== 'API') {
        throw new Error('Invalid source');
      }
    }
    if (sort) {
      if (sort === 'max' || sort === 'min') {
        pokemons = await sortPokemonsByAttack(sort, pokemons);
      }
      if (sort === 'asc' || sort === 'desc') {
        pokemons = await sortPokemonsByName(sort, pokemons);
      }
      if (sort !== 'asc' && sort !== 'desc' && sort !== 'max' && sort !== 'min') {
        throw new Error('Invalid sort order');
      }
    }
    if (type) {
      pokemons = await getPokemonByType(type, pokemons);
    }
    const totalPokemons = pokemons.length
    const paginatedPokemons = paginatePokemons(pokemons, page, pageSize);
    return res.json({ totalPokemons, data: paginatedPokemons });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const pokemonDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonDetail = await getPokemonDetail(id);
    res.send(pokemonDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const pokemonDestroy = async (req, res) => {
  const { id } = req.params
  try {
    const result = await deletePokemon(id)
    return res.json(result)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const pokemonCreado = async (req, res) => {
  const nuevito = req.body;
  try {
    const pokemonNuevo = await createPokemon(nuevito);
    res.json(pokemonNuevo);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
  pokemonDestroy,
};
