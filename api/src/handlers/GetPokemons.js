const {getAllPokemons} = require("../controllers/PokemonsController");

const getPokemons = async (req, res) => {
  try {
    const pokemons = await getAllPokemons();
    return res.json(pokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {getPokemons};
