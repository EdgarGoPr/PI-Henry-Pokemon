const { getPokemons } = require("../handlers/GetPokemons");
const { pokemonDetail } = require("../handlers/GetDetail");
const { pokemonCreado } = require("../handlers/CreatePokemon");

const pokemonRoute = require("express").Router();

pokemonRoute.get("/", getPokemons);
pokemonRoute.get("/:id", pokemonDetail);
pokemonRoute.post('/', pokemonCreado)

module.exports = pokemonRoute;
