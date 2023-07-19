const getPokemonName = require('../controllers/PokemonsController')

const getByName = async (req, res) => {
  const {name} = req.body
  try {
    const pokemons = await getPokemonName(name);
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getByName;
