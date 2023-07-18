const axios = require("axios");

const getPokemonDetail = async (idPokemon) => {
  try {
    const apiResponse = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    const pokemonData = apiResponse.data;
    const dbPokemon = await traerPokemon(idPokemon);

    const pokemonDetalle = {
      id: pokemonData.id,
      nombre: pokemonData.name,
      imagen: pokemonData.image,
      vida: pokemonData.stats.find((stat) => stat.stat.name === "life")
        .base_stat,
      ataque: pokemonData.stats.find((stat) => stat.stat.name === "attack")
        .base_stat,
      defensa: pokemonData.stats.find((stat) => stat.stat.name === "defense")
        .base_stat,
      velocidad: pokemonData.stats.find((stat) => stat.stat.name === "speed")
        .base_stat,
      altura: pokemonData.height,
      peso: pokemonData.weight,
      tipo: pokemonData.types.map((type) => type.type.name),
    };
    if (dbPokemon) {
      pokemonDetalle.datos_adicionales = dbPokemon.datos_adicionales;
    }
    return pokemonDetalle;
  } catch (error) {
    throw new Error("Can not obtain the detail");
  }
};

module.exports = getPokemonDetail;
