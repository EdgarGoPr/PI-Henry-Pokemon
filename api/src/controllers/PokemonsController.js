const axios = require("axios");
const { formatPokemonData, formatCard, formatCardDb, formatPokemonDataDb } = require("../Utils/FormatPokemon");
const { Pokemon, Type } = require("../db");

// const getAllPokemons = async () => {
//   const apiResponse = await axios.get(
//     "https://pokeapi.co/api/v2/pokemon?limit=9"
//   );
//   const apiPokemons = apiResponse.data.results;
//   const dbPokemons = await Pokemon.findAll();
//   const allPokemons = [...apiPokemons, ...dbPokemons];

//   return allPokemons;
//   // let pokeFormateo = formatPokemonData(pokemons.data)
//   // return pokeFormateo;
//   // return pokemons.data.results
// };

const getAllPokemons = async () => {
  const apiResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=13");
  const apiPokemons = apiResponse.data.results.map(async (pokemon) => {
    const response = await axios.get(pokemon.url);
    return formatCard(response.data, "API");
  });

  const dbPokemons = await Pokemon.findAll({
    include: [
      {
        model: Type,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
  });

  const formattedDbPokemons = dbPokemons.map((pokemon) =>
    formatCardDb(pokemon, "Database")
  );

  const allPokemons = [...formattedDbPokemons, ...(await Promise.all(apiPokemons))];
  return allPokemons;
};

const sortPokemonsByName = async (sort = 'asc', pokemons) => {
  const allPokemons = await pokemons;
  const sortedPokemons = allPokemons.slice().sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (sort === 'asc') {
      return nameA.localeCompare(nameB);
    } else if (sort === 'desc') {
      return nameB.localeCompare(nameA);
    } else {
      throw new Error('Invalid sort order');
    }
  });
  return sortedPokemons;
};

const getPokemonByType = async (type, pokemons) => {
  const allPokemons = await pokemons;
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.type.includes(type.toLowerCase())
  );

  return filteredPokemons;
};

// const getPokemonName = async (name) => {
//   try {
//     const apiResponse = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon?limit=9`
//     );
//     let existingPokemon = await Pokemon.findByPk(name);
//     const pokemonList = apiResponse.data.results;
//     // console.log(pokemonList, 'pokemonList');
//     const filteredPokemon = pokemonList.find(
//       (p) => p.name == name.toLowerCase()
//     );
//     if (!filteredPokemon) {
//       if (!existingPokemon) {
//         return { message: `No hay pokemones llamados ${name}` };
//       }
//     }
//     const pokemonResponse = await axios.get(filteredPokemon.url);
//     const pokemonData = pokemonResponse.data;
//     const formatPokemon = formatPokemonData(pokemonData);
//     return formatPokemon;
//   } catch (error) {
//     throw new Error({ error: error.message });
//   }
// };

const getPokemonName = async (name) => {
  try {
    const apiResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=9`
    );
    const pokemonList = apiResponse.data.results;
    const filteredPokemon = pokemonList.find(
      (p) => p.name === name.toLowerCase()
    );

    if (!filteredPokemon) {
      const existingPokemon = await Pokemon.findOne({
        where: { name: name.toLowerCase() },
      });

      if (!existingPokemon) {
        return { message: `No hay pokemones llamados ${name}` };
      }

      const formatPokemon = formatPokemonData(existingPokemon);
      return formatPokemon;
    }

    const pokemonResponse = await axios.get(filteredPokemon.url);
    const pokemonData = pokemonResponse.data;

    const formatPokemon = formatPokemonData(pokemonData);
    return formatPokemon;
  } catch (error) {
    throw new Error(error.message);
  }
};

// const getPokemonDetail = async (id) => {
//   if (id.length <= 4) {
//     // console.log(id, 'idvfabgdshrv')
//     // const pokemonDetalle = await pokemonData.find(id => id == pokemonData.id);
//     const pokemonDetalle = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${id}`
//     );
//     let pokemonDetail = pokemonDetalle.data;
//     return formatPokemonData(pokemonDetail);
//   } else {
//     const dbPokemon = {
//       id: pokemonData.id,
//       name: pokemonData.name,
//       image: pokemonData.image,
//       health: pokemonData.health,
//       attack: pokemonData.attack,
//       defense: pokemonData.defense,
//       speed: pokemonData.speed,
//       height: pokemonData.height,
//       weight: pokemonData.weight,
//       type: pokemonData.types.map((type) => type.type.name),
//     };
//     return dbPokemon;
//   }
// };

const getPokemonDetail = async (id) => {
  if (id.length <= 4) {
    try {
      const pokemonDetalle = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokemonDetail = pokemonDetalle.data;
      return formatPokemonData(pokemonDetail);
    } catch (error) {
      throw new Error(
        `Error fetching Pokemon details from API: ${error.message}`
      );
    }
  } else {
    try {
      const dbPokemon = await Pokemon.findByPk(id, {
        include: Type,
      });
      if (!dbPokemon) {
        throw new Error(`Pokemon with ID ${id} not found in the database.`);
      }
      const formattedPokemon = formatPokemonDataDb(dbPokemon);
      return formattedPokemon;
    } catch (error) {
      throw new Error(
        `Error fetching Pokemon details from database: ${error.message}`
      );
    }
  }
};

// const createPokemon = async (pokemonData) => {
//   try {
//     const pjExists = Pokemon.findOne({
//       where: {
//         id: pokemonData.id,
//       },
//     });
//     if (!pjExists) {
//       const newPokemon = new Pokemon({
//         name: pokemonData.name,
//         image: pokemonData.image,
//         health: pokemonData.health,
//         attack: pokemonData.attack,
//         defense: pokemonData.defense,
//         speed: pokemonData.speed,
//         height: pokemonData.height,
//         weight: pokemonData.weight,
//         type: pokemonData.types.map((type) => type.type.name),
//       });
//       await newPokemon.save();
//       return newPokemon;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };

//-----------------------------------------------------------------------------

// const createPokemon = async (pokemonData) => {
//   try {
//     // Check if the Pokemon already exists
//     const existingPokemon = await Pokemon.findOne({
//       where: {
//         id: pokemonData.id,
//       },
//     });

//     if (!existingPokemon) {
//       const newPokemon = await Pokemon.create({
//         name: pokemonData.name,
//         image: pokemonData.image,
//         life: pokemonData.health,
//         attack: pokemonData.attack,
//         defense: pokemonData.defense,
//         speed: pokemonData.speed,
//         height: pokemonData.height,
//         weight: pokemonData.weight,
//       });

//       return newPokemon;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };

//---------------------------------------------------------------------------------

// const createPokemon = async (pokemonData) => {
//   // let typeOfPokemon = [];
//   try {
//     const existingPokemon = await Pokemon.findByPk(pokemonData.id);

//     if (!existingPokemon) {
//       const typeOfPokemon = pokemonData.type;
//       const newPokemon = await Pokemon.create({
//         name: pokemonData.name,
//         image: pokemonData.image,
//         life: pokemonData.health,
//         attack: pokemonData.attack,
//         defense: pokemonData.defense,
//         speed: pokemonData.speed,
//         height: pokemonData.height,
//         weight: pokemonData.weight,
//         typeId: [],
//         // type: pokemonData.types.map((type) => type.type.name),
//       });
//       let allTypes = [];
//       for (const typeName of typeOfPokemon) {
//         //recorro el arreglo que llega por el post
//         const newType = await Type.findOne({ where: { name: typeName } }); //busco los valores de dicho arreglo en el modelo
//         allTypes.push(newType); //los almaceno en un arreglo
//       }
//       await newPokemon.addTypes(allTypes);
//       // console.log("pokemonData ----->", newPokemon.type);
//       return newPokemon;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };

//---------------------------------------------------------------------------

// const createPokemon = async ({ pokemonData }) => {
//   try {
//     const existingPokemon = await Pokemon.findByPk(pokemonData.name);

//     if (!existingPokemon) {
//       const typeOfPokemon = pokemonData.type;
//       const newPokemon = await Pokemon.create({
//         name: pokemonData.name,
//         image: pokemonData.image,
//         life: pokemonData.health,
//         attack: pokemonData.attack,
//         defense: pokemonData.defense,
//         speed: pokemonData.speed,
//         height: pokemonData.height,
//         weight: pokemonData.weight,
//         type: [],
//       });

//       let allTypes = [];
//       for (const typeName of typeOfPokemon) {
//         const newType = await Type.findOne({ where: { name: typeName } });
//         if (newType) {
//           allTypes.push(newType);
//         }
//       }

//       await newPokemon.addTypes(allTypes);

//       return newPokemon;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };

//----------------------------------------------------------------------

// const createPokemon = async ({
//   name,
//   image,
//   life,
//   attack,
//   defense,
//   speed,
//   height,
//   weight,
//   type,
// }) => {
//   let objPokemon = {
//     name,
//     image,
//     life,
//     attack,
//     defense,
//     speed,
//     height,
//     weight,
//     types: type,
//   };

//   let allTypes = [];
//   for (const typeName of type) {
//     const newType = await Type.findOne({ where: { name: typeName } });
//     allTypes.push(newType);
//     // console.log('first', first);
//   }

//   const newPokemon = await Pokemon.create(objPokemon);
//   await newPokemon.addTypes(allTypes);
//   return newPokemon;
// };

//--------------------------------------------------

// const createPokemon = async ({
//   name,
//   image,
//   life,
//   attack,
//   defense,
//   speed,
//   height,
//   weight,
//   type,
// }) => {
//   try {
//     const existingPokemon = await Pokemon.findOne({ where: { name } });

//     if (!existingPokemon) {
//       const newPokemon = await Pokemon.create({
//         name,
//         image,
//         life,
//         attack,
//         defense,
//         speed,
//         height,
//         weight,
//       });

//       const existingTypes = await Promise.all(
//         type.map((typeName) => Type.findOrCreate({ where: { name: typeName } }))
//       );

//       await newPokemon.setTypes(existingTypes.map((type) => type[0]));

//       const types = await newPokemon.getTypes();

//       console.log("types", types);
//       return newPokemon;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };

//--------------------------------------------------------

// const createPokemon = async (pokemonData) => {
//   try {
//     // const Pokemon = require('../models/Pokemon');

//     // Check if the Pokemon already exists
//     const existingPokemon = await Pokemon.findAndCountAll(pokemonData.id);

//     if (!existingPokemon) {
//       const newPokemon = await Pokemon.create({
//         name: pokemonData.name,
//         image: pokemonData.image,
//         life: pokemonData.health,
//         attack: pokemonData.attack,
//         defense: pokemonData.defense,
//         speed: pokemonData.speed,
//         height: pokemonData.height,
//         weight: pokemonData.weight,
//       });

//       return newPokemon;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };

//----------------------------------------------------------------

// const createPokemon = async (pokemonData) => {
//   try {
//     // Check if the Pokemon already exists
//     const existingPokemon = await Pokemon.findAndCountAll({
//       where: {
//         id: pokemonData.id,
//       },
//     });

//     if (existingPokemon.count === 0) {
//       const newPokemon = await Pokemon.create({
//         name: pokemonData.name,
//         image: pokemonData.image,
//         life: pokemonData.health,
//         attack: pokemonData.attack,
//         defense: pokemonData.defense,
//         speed: pokemonData.speed,
//         height: pokemonData.height,
//         weight: pokemonData.weight,
//       });

//       return newPokemon;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };

//---------------------------------------------------------------------

// const createPokemon = async ({
//   name,
//   image,
//   life,
//   attack,
//   defense,
//   speed,
//   height,
//   weight,
//   type,
// }) => {
//   try {
//     const existingPokemon = await Pokemon.findOne({ where: { name } });

//     if (!existingPokemon) {
//       const newPokemon = await Pokemon.create({
//         name,
//         image,
//         life,
//         attack,
//         defense,
//         speed,
//         height,
//         weight,
//       });

//       let allTypes = [];
//       for (const typeName of type) {
//         const newType = await Type.findOrCreate({ where: { name: typeName } });
//         if (newType) {
//           allTypes.push(newType);
//         }
//       }

//       await newPokemon.addTypes(allTypes);

//       return newPokemon;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };

//--------------------------------------------------------------------

// const createPokemon = async ({
//   name,
//   image,
//   life,
//   attack,
//   defense,
//   speed,
//   height,
//   weight,
//   type,
// }) => {
//   try {
//     const existingPokemon = await Pokemon.findOne({ where: { name } });

//     if (!existingPokemon) {
//       const newPokemon = await Pokemon.create({
//         name,
//         image,
//         life,
//         attack,
//         defense,
//         speed,
//         height,
//         weight,
//       });

//       const allTypes = [];
//       for (const typeName of type) {
//         const newType = await Type.findOne({ where: { name: typeName } });
//         if (newType) {
//           allTypes.push(newType);
//         } else {
//           throw new Error(`Type "${typeName}" does not exist in the database.`);
//         }
//       }
//       await newPokemon.addTypes(allTypes);

//       return {
//         id: newPokemon.id,
//         name: newPokemon.name,
//         image: newPokemon.image,
//         life: newPokemon.life,
//         attack: newPokemon.attack,
//         defense: newPokemon.defense,
//         speed: newPokemon.speed,
//         height: newPokemon.height,
//         weight: newPokemon.weight,
//         type: type,
//       };
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };  Solo muestra los types

//------------------------------------------------------------------------------------

// const createPokemon = async ({
//   name,
//   image,
//   life,
//   attack,
//   defense,
//   speed,
//   height,
//   weight,
//   type,
// }) => {
//   try {
//     const existingPokemon = await Pokemon.findOne({ where: { name } });

//     if (!existingPokemon) {
//       const newPokemon = await Pokemon.create({
//         name,
//         image,
//         life,
//         attack,
//         defense,
//         speed,
//         height,
//         weight,
//       });
//       console.log("types", type);
//       // newPokemon.type = type
//       // let allTypes = type;
//       // console.log("allTypes::::::>", allTypes);
//       // newPokemon.type = allTypes
//       // for (const typeName of type) {
//       //   const [newType] = await Type.findOrCreate({ where: { name: typeName } });
//       //   allTypes.push(newType);
//       //   console.log('allTypes', allTypes.name)
//       // }
//       // await newPokemon.addTypes(allTypes);

//       // console.log("type--------->", newPokemon.type);
//       const pokePoke = {
//         id: newPokemon.id,
//         name: newPokemon.name,
//         image: newPokemon.image,
//         life: newPokemon.life,
//         attack: newPokemon.attack,
//         defense: newPokemon.defense,
//         speed: newPokemon.speed,
//         height: newPokemon.height,
//         weight: newPokemon.weight,
//         type: type,
//       };
//       let allTypes = []
//       for(const pepito of type) {
//         const newType = await Type.findOne({ where: { name: pepito } })
//         allTypes.push(newType)
//       }
//       await pokePoke.addTypes(allTypes)
//       return pokePoke;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };  No Funciona para nada

//------------------------------------------------------------------------------

// const createPokemon = async ({
//   name,
//   image,
//   life,
//   attack,
//   defense,
//   speed,
//   height,
//   weight,
//   type,
// }) => {
//   try {
//     const existingPokemon = await Pokemon.findOne({ where: { name } });

//     if (!existingPokemon) {
//       const newPokemon = await Pokemon.create({
//         name,
//         image,
//         life,
//         attack,
//         defense,
//         speed,
//         height,
//         weight,
//       });

//       const typesArray = Array.isArray(type) ? type : [type];

//       let allTypes = [];
//       for (const typeName of typesArray) {
//         const [newType] = await Type.findOne({ where: { name: typeName } });
//         allTypes.push(newType);
//       }

//       await newPokemon.addTypes(allTypes);

//       return newPokemon;
//     } else {
//       throw new Error("Pokemon already exists");
//     }
//   } catch (error) {
//     throw new Error(`Error creating a new Pokemon: ${error.message}`);
//   }
// };  No muestra Types

//----------------------------------------------------------------------------

// const createPokemon = async ({
//   id,
//   name,
//   image,
//   life,
//   attack,
//   defense,
//   speed,
//   height,
//   weight,
//   type,
// }) => {
//   console.log(name);
//   let objPokemon = {
//     id,
//     name,
//     image,
//     life,
//     attack,
//     defense,
//     speed,
//     height,
//     weight,
//     type,
//   };
//   let allTypes = [];
//   for (const typeName of type) {
//     const newType = await Type.findOne({ where: { name: typeName } }); 
//     allTypes.push(newType);
//   }
//   const newPokemon = await Pokemon.create(objPokemon);
//   await newPokemon.addTypes(allTypes);
//   return newPokemon;
// }; No muestra Types

//---------------------------------------------------------------------------

// const createPokemon = async ({
//   id,
//   name,
//   image,
//   life,
//   attack,
//   defense,
//   speed,
//   height,
//   weight,
//   type,
// }) => {
//   let objPokemon = {
//     id,
//     name,
//     image,
//     life,
//     attack,
//     defense,
//     speed,
//     height,
//     weight,
//   };
//   // const newPokemon = await Pokemon.create(objPokemon)
//   // const foundTypes = await Type.findAll({ where: { name: type } })
//   // if (foundTypes.length > 0) {
//   //   await newPokemon.setTypes(foundTypes)
//   // }
//   // console.log(newPokemon)
//   // return newPokemon;
//   const newPokemon = await Pokemon.create(objPokemon);

//   const foundTypes = await Type.findAll({ where: { name: type } });

//   if (foundTypes.length > 0) {
//     await newPokemon.setTypes(foundTypes);
//   }

//   // Fetch the newly created Pokemon with the associated types
//   const fetchedPokemon = await Pokemon.findOne({
//     where: { id: newPokemon.id },
//     include: Type,
//   });

//   console.log(fetchedPokemon);
//   return fetchedPokemon;
// };

//-----------------------------------------------------------------------------

const createPokemon = async ({
  id,
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  type,
}) => {
  let objPokemon = {
    id,
    name,
    image,
    life,
    attack,
    defense,
    speed,
    height,
    weight,
  };

  const foundTypes = await Type.findAll({ where: { name: type } });

  if (foundTypes.length > 0) {
    const newPokemon = await Pokemon.create(objPokemon);
    await newPokemon.setTypes(foundTypes);

    const typeNames = foundTypes.map((foundType) => foundType.name);

    const fetchedPokemon = {
      id: newPokemon.id,
      name: newPokemon.name,
      image: newPokemon.image,
      life: newPokemon.life,
      attack: newPokemon.attack,
      defense: newPokemon.defense,
      speed: newPokemon.speed,
      height: newPokemon.height,
      weight: newPokemon.weight,
      type: typeNames,
    };

    console.log(fetchedPokemon);
    return fetchedPokemon;
  } else {
    console.error("Unable to find the specified types.");
    return null;
  }
};


module.exports = {
  getAllPokemons,
  getPokemonName,
  getPokemonDetail,
  createPokemon,
  sortPokemonsByName,
  getPokemonByType,
};
