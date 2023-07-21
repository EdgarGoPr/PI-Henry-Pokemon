const axios = require("axios");
const { formatPokemonData } = require("../Utils/FormatPokemon");
const { Pokemon, Type } = require("../db");

const getAllPokemons = async () => {
  const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=9");
  // let pokeFormateo = formatPokemonData(pokemons.data)
  // return pokeFormateo;
  return pokemons.data.results
};

const getPokemonName = async (name) => {
  try {
    const apiResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=9`
    );
    let existingPokemon = await Pokemon.findByPk(name);
    const pokemonList = apiResponse.data.results;
    // console.log(pokemonList, 'pokemonList');
    const filteredPokemon = pokemonList.find(
      (p) => p.name == name.toLowerCase()
    );
    if (!filteredPokemon) {
      if (!existingPokemon) {
        return { message: `No hay pokemones llamados ${name}` };
      }
    }
    const pokemonResponse = await axios.get(filteredPokemon.url);
    const pokemonData = pokemonResponse.data;
    const formatPokemon = formatPokemonData(pokemonData);
    return formatPokemon;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getPokemonDetail = async (id) => {
  if (id.length <= 4) {
    // console.log(id, 'idvfabgdshrv')
    // const pokemonDetalle = await pokemonData.find(id => id == pokemonData.id);
    const pokemonDetalle = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    let pokemonDetail = pokemonDetalle.data;
    return formatPokemonData(pokemonDetail);
  } else {
    const dbPokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.image,
      health: pokemonData.health,
      attack: pokemonData.attack,
      defense: pokemonData.defense,
      speed: pokemonData.speed,
      height: pokemonData.height,
      weight: pokemonData.weight,
      type: pokemonData.types.map((type) => type.type.name),
    };
    return dbPokemon;
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

//* const createPokemon = async ({pokemonData}) => {
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

const createPokemon = async ({
  name,
  image,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  // type, 
}) => {
  let objPokemon = {
    name,
    image,
    life, 
    attack,
    defense,
    speed,
    height,
    weight,
    // types: type, 
  };

  // let allTypes = [];
  // for (const typeName of type) { 
  //   const newType = await Type.findOne({ where: { name: typeName } });
  //   allTypes.push(newType);
    // console.log('first', first);
  // }

  const newPokemon = await Pokemon.create(objPokemon);
  // await newPokemon.addTypes(allTypes);
  return newPokemon;
};


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

module.exports = {
  getAllPokemons,
  getPokemonName,
  getPokemonDetail,
  createPokemon,
};
