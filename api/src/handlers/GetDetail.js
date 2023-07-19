const getPokemonDetail = require("../controllers/PokemonsController");

const pokemonDetail = async (req, res) => {
  const id = req.body.idPokemon;
  try {
    if (!id) {
      throw new Error("ID not found");
    }
    const pokemonDetail = await getPokemonDetail();
    if (!pokemonDetail) {
      throw new Error("Detail not found");
    }
    res.status(200).json(getPokemonDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = pokemonDetail
