const types = require("../handlers/GetTypes");
const typesRoutes = require("express").Router();

typesRoutes.get("/", types);

module.exports = typesRoutes;
