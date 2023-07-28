const {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
  getByType,
  order
} = require("../handlers/PokemonHandlers");


const pokemonRoute = require("express").Router();

pokemonRoute.get("/", getPokemons);
pokemonRoute.get("/:id", pokemonDetail);
pokemonRoute.post("/", pokemonCreado);
pokemonRoute.get('/', getByType);
pokemonRoute.get('/', order)

module.exports = pokemonRoute;
