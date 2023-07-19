const { getPokemons } = require("../handlers/GetPokemons");
const { pokemonDetail } = require("../handlers/GetDetail");

const pokemonRoute = require("express").Router();

pokemonRoute.get("/", getPokemons);
pokemonRoute.get("/:id", pokemonDetail);

module.exports = pokemonRoute;
