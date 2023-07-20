const types = require("../handlers/TypeHandlers");
const typesRoutes = require("express").Router();

typesRoutes.get("/", types);

module.exports = typesRoutes;
