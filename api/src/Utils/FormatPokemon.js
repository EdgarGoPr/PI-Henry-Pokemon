function formatPokemonData(pokemon) {
  if (!pokemon) {
    return null;
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
    image: sprites?.front_default || image || "default_image_url", 
    health: stats?.[0]?.base_stat || life || 0, 
    attack: stats?.[1]?.base_stat || attack || 0, 
    defense: stats?.[2]?.base_stat || defense || 0, 
    speed: stats?.[5]?.base_stat || speed || null,
    height,
    weight,
    type: types?.map((type) => type?.type?.name || null) || [], 
  };

  return formattedPokemon;
}


function formatPokemonDataDb(pokemon) {
  if (!pokemon) {
    return null;
  }

  const {
    id,
    image,
    name,
    sprites,
    stats,
    height,
    weight,
    Types,
    attack,
    defense,
    life,
    speed,
  } = pokemon;

  const formattedPokemon = {
    id,
    name,
    image: sprites?.front_default || image || "default_image_url", 
    health: stats?.[0]?.base_stat || life || 0, 
    attack: stats?.[1]?.base_stat || attack || 0, 
    defense: stats?.[2]?.base_stat || defense || 0, 
    speed: stats?.[5]?.base_stat || speed || null,
    height,
    weight,
    type: Types.map((t) => t.name) || [], 
  };

  return formattedPokemon;
}

function formatCard(pokemon) {
  if (!pokemon) {
    return null;
  }

  const { id, image, name, sprites, types } = pokemon;

  const formattedCard = {
    id,
    image: sprites?.front_default || image || "default_image_url",
    name,
    type: types?.map((type) => type.type.name) || [],
  };

  return formattedCard;
}

function formatCardDb(pokemon) {
  if (!pokemon) {
    return null;
  }

  const { id, image, name, sprites, Types } = pokemon;

  const formattedCard = {
    id,
    image: sprites?.front_default || image || "default_image_url",
    name,
    type: Types?.map((type) => type.name) || [],
  };

  return formattedCard;
}


module.exports = { formatPokemonData, formatCard, formatCardDb, formatPokemonDataDb };
