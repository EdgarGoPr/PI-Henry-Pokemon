function formatPokemonData(pokemon) {
  const { id, name, sprites, stats, height, weight, types } = pokemon;

  const formattedPokemon = {
    id,
    name,
    image: sprites.front_default,
    health: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    speed: stats[5] ? stats[5].base_stat : null,
    height,
    weight,
    type: types.map((type) => type.type.name),
  };

  return formattedPokemon;
}

module.exports = { formatPokemonData };
