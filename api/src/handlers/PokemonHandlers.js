const {
  getAllPokemons,
  getPokemonName,
  getPokemonDetail,
  createPokemon,
} = require("../controllers/PokemonsController");
const sortPokemonsByName = require("../controllers/Filter_Order_Paginate");

// const getPokemons = async (req, res) => {
//   try {
//     const { name } = req.query;
//     if (name) {
//       const pokemons = await getPokemonName(name);
//       return res.json(pokemons);
//     } else {
//       const pokemons = await getAllPokemons();
//       return res.json(pokemons);
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

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



const getByType = async (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: "Type parameter is required" });
  }

  try {
    const byType = await getPokemonByType(type);
    res.json(byType);
  } catch (error) {
    console.error("Error retrieving Pokemon by type:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleSortPokemons = async (req, res) => {
  const { sortOrder } = req.query
  try {
    const sorted = await sortPokemonsByName(sortOrder)
    res.json(sorted)
  } catch (error) {
    res.status(400).json({ error: 'Error sorting pokemons' })
  }
}

module.exports = {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
  getByType,
  handleSortPokemons
};
