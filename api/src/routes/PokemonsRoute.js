const {
  getPokemons,
  pokemonDetail,
  pokemonCreado,
  // handleSortPokemons,
  // getByType
} = require("../handlers/PokemonHandlers");


const pokemonRoute = require("express").Router();

pokemonRoute.get("/", getPokemons);
pokemonRoute.get("/detail/:id", pokemonDetail);
pokemonRoute.post("/", pokemonCreado);
// pokemonRoute.delete("/detail/:id", );


module.exports = pokemonRoute;
