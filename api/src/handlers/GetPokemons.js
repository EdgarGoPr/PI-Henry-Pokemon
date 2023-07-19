const { getAllPokemons, getPokemonName } = require("../controllers/PokemonsController");

const getPokemons = async (req, res) => {
  try {
    const { name } = req.query;
    if(name){
      const pokemons = await getPokemonName(name);
      return res.json(pokemons);
    }else {
      const pokemons = await getAllPokemons();
    return res.json(pokemons);
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getPokemons };
