// function formatPokemonData(pokemon) {
//   const { id, name, sprites, stats, height, weight, types } = pokemon;

//   const formattedPokemon = {
//     id,
//     name,
//     image: sprites.front_default || data.image,
//     health: stats[0].base_stat,
//     attack: stats[1].base_stat,
//     defense: stats[2].base_stat,
//     speed: stats[5] ? stats[5].base_stat : null,
//     height,
//     weight,
//     type: types.map((type) => type.type.name),
//   };

//   return formattedPokemon;
// }

// module.exports = { formatPokemonData };

//----------------------------------------------------------------

// const formatPokemonData = (pokemon) => {
//   const { id, name, image, health, attack, defense, speed, height, weight, types } = pokemon;

//   const formattedPokemon = {
//     id,
//     name,
//     image: image || null,
//     health,
//     attack,
//     defense,
//     speed,
//     height,
//     weight,
//     type: types.map((type) => type.name),
//   };

//   return formattedPokemon;
// };

// module.exports = { formatPokemonData };

//--------------------------------------------------------------------------

// function formatPokemonData(pokemon) {
//   const { id, name, sprites, stats, height, weight, types } = pokemon;

//   const formattedPokemon = {
//     id,
//     name,
//     image: sprites?.front_default || "default_image_url", // Replace "default_image_url" with a default image URL if available
//     health: stats[0]?.base_stat || 0, // Replace 0 with a default health value if available
//     attack: stats[1]?.base_stat || 0, // Replace 0 with a default attack value if available
//     defense: stats[2]?.base_stat || 0, // Replace 0 with a default defense value if available
//     speed: stats[5]?.base_stat || null,
//     height,
//     weight,
//     type: types.map((type) => type?.type?.name || null),
//   };

//   return formattedPokemon;
// }

// module.exports = { formatPokemonData };

//---------------------------------------------------------------------------

// function formatPokemonData(pokemon) {
//   const { id, name, sprites, stats, height, weight, types } = pokemon;

//   const formattedPokemon = {
//     id,
//     name,
//     image: sprites?.front_default || sprites?.other?.["official-artwork"]?.front_default || "",
//     health: stats?.[0]?.base_stat || 0,
//     attack: stats?.[1]?.base_stat || 0,
//     defense: stats?.[2]?.base_stat || 0,
//     speed: stats.find((stat) => stat.stat.name === "speed")?.base_stat || 0,
//     height,
//     weight,
//     type: types.map((type) => type.type.name),
//   };

//   return formattedPokemon;
// }

// module.exports = { formatPokemonData };

//---------------------------------------------------------------------------

function formatPokemonData(pokemon) {
  if (!pokemon) {
    return null; // Return null if the pokemon data is not provided
  }

  const {
    id,
    image,
    name,
    sprites,
    stats,
    height,
    weight,
    types,
    attack,
    defense,
    life,
    speed,
  } = pokemon;

  const formattedPokemon = {
    id,
    name,
    image: sprites?.front_default || image || "default_image_url", // Replace "default_image_url" with a default image URL if available
    health: stats?.[0]?.base_stat || life || 0, // Replace 0 with a default health value if available
    attack: stats?.[1]?.base_stat || attack || 0, // Replace 0 with a default attack value if available
    defense: stats?.[2]?.base_stat || defense || 0, // Replace 0 with a default defense value if available
    speed: stats?.[5]?.base_stat || speed || null,
    height,
    weight,
    type: types?.map((type) => type?.type?.name || null) || [], // Return an empty array if types is not provided
  };

  return formattedPokemon;
}

module.exports = { formatPokemonData };
