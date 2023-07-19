const { createPokemon } = require("../controllers/PokemonsController");

const pokemonCreado = async (req, res) => {
  const nuevito = req.body;
  try {
    const pokemonNuevo = await createPokemon(nuevito);
    res.json(pokemonNuevo);
  } catch (error) {
    res.json({error: error.message})
  }
};

module.exports = { pokemonCreado };
