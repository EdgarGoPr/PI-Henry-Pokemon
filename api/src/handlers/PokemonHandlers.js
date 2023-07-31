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
} = require("../controllers/PokemonsController");

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
    const { name, sort, type, page, pageSize, source } = req.query;
    if (name) {
      const pokemons = await getPokemonName(name);
      return res.json(pokemons);
    }
    let pokemons = await getAllPokemons();
    if(source){
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
    console.log(totalPokemons)

    const paginatedPokemons = paginatePokemons(pokemons, page, pageSize);

    return res.json({ totalPokemons, data: paginatedPokemons });

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



// const getByType = async (req, res) => {
//   const { type } = req.query;

//   if (!type) {
//     return res.status(400).json({ error: "Type parameter is required" });
//   }

//   try {
//     const byType = await getPokemonByType(type);
//     return res.json(byType);
//   } catch (error) {
//     console.error("Error retrieving Pokemon by type:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const handleSortPokemons = async (req, res) => {
//   const { sort } = req.query;
//   try {
//     if (sort !== 'asc' && sort !== 'desc') {
//       throw new Error('Invalid sort order');
//     }

//     const sorted = await sortPokemonsByName(sort);
//     res.json(sorted);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


module.exports = {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
  // getByType,
  // handleSortPokemons
};
