const {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
} = require("../handlers/PokemonHandlers");

const pokemonRoute = require("express").Router();

pokemonRoute.get("/", getPokemons);
pokemonRoute.get("/:id", pokemonDetail);
pokemonRoute.post("/", pokemonCreado);

module.exports = pokemonRoute;
