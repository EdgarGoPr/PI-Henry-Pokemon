const {getPokemons} = require("../handlers/GetPokemons");
const getByName = require("../handlers/GetByName");
const pokemonDetail = require("../handlers/GetDetail");

const pokemonRoute = require("express").Router();

pokemonRoute.get('/', getPokemons)
pokemonRoute.get(`/name/:name`, getByName)
pokemonRoute.get('/:idPokemon', pokemonDetail)

module.exports = pokemonRoute
