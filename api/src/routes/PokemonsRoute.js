const {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
  handleSortPokemons
} = require("../handlers/PokemonHandlers");


const pokemonRoute = require("express").Router();

pokemonRoute.get("/", getPokemons);
pokemonRoute.get("/detail/:id", pokemonDetail);
pokemonRoute.post("/", pokemonCreado);
pokemonRoute.get('/sort', handleSortPokemons)

module.exports = pokemonRoute;
