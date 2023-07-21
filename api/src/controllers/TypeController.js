const axios = require("axios");
const {Type} = require('../db')

// const getTypes = async () => {
//   try {
//     const apiResponse = await axios.get(
//       "https://pokeapi.co/api/v2/type/"
//     );
//     const apiTypes = apiResponse.results.map(async (pokemon) => {
//       const response = await axios.get(pokemon.name);
//       return response;
//     });

//     const dbTypes = await Type.findAll();
//     const formatTypes = dbTypes.map((type) =>
//       type.name
//     );

//     const allTypes = [
//       ...formatTypes,
//       ...(await Promise.all(apiTypes)),
//     ];
//     return allTypes;
//   } catch (error) {
//     throw new Error(`Error fetching Pokemons: ${error.message}`);
//   }
// };

const getTypes = async () => {
  try {
    // Obtener los tipos de la API
    const apiResponse = await axios.get("https://pokeapi.co/api/v2/type/");
    const apiTypes = apiResponse.data.results.map((pokemon) => pokemon.name);

    // Obtener los tipos de la base de datos
    const dbTypes = await Type.findAll();
    const dbTypeNames = dbTypes.map((type) => type.name);

    // Combinar los tipos de la API y la base de datos (evitando duplicados)
    const allTypes = [...new Set([...dbTypeNames, ...apiTypes])];

    return allTypes;
  } catch (error) {
    throw new Error(`Error fetching Pokemons: ${error.message}`);
  }
};


module.exports = getTypes;
