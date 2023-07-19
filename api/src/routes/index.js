const { Router } = require("express");
const pokemonRoute = require("./PokemonsRoute");
const typesRoutes = require("./TypesRoutes");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonRoute);
router.use("/types", typesRoutes);

module.exports = router;
