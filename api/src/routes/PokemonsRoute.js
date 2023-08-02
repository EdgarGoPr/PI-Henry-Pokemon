const {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
  pokemonDestroy,
  pokemonChanged,
} = require("../handlers/PokemonHandlers");


const pokemonRoute = require("express").Router();

pokemonRoute.get("/", getPokemons);
pokemonRoute.get("/:id", pokemonDetail);
pokemonRoute.post("/", pokemonCreado);
pokemonRoute.delete("/:id", pokemonDestroy);
pokemonRoute.put('/:id', pokemonChanged);


module.exports = pokemonRoute;
