const {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
  pokemonDestroy,
} = require("../handlers/PokemonHandlers");


const pokemonRoute = require("express").Router();

pokemonRoute.get("/", getPokemons);
pokemonRoute.get("/:id", pokemonDetail);
pokemonRoute.post("/", pokemonCreado);
pokemonRoute.delete("/:id", pokemonDestroy);


module.exports = pokemonRoute;
