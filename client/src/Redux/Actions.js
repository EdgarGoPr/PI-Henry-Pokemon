import axios from "axios";
import {
  RESET,
  FETCH,
  TYPES,
  CREATE,
  FILTERED,
  ORDER,
  SET_PAGE,
  SET_PAGE_SIZE,
} from "./ActionType";

export function create(form) {
  return async (dispatch) => {
    const response = await axios.post('http://localhost:3001/pokemons/', form);
    dispatch({
      type: CREATE,
      payload: response.data,
    });
  };
}

export function getTypes() {
  return async (dispatch) => {
    const response = await axios.get('http://localhost:3001/types/');
    const typeNames = response.data.map((type) => type.name);
    dispatch({
      type: TYPES,
      payload: typeNames,
    });
  };
}

export function orderCards(order) {
  return async (dispatch) => {
    if(order === "reset"){
      order = ""
    }
    const response = await axios.get(`http://localhost:3001/pokemons/?sort=${order}`);
    const orderedPokemons = response.data;
    dispatch({
      type: ORDER,
      payload: orderedPokemons,
    });
  };
};

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setPageSize = (pageSize) => ({
  type: SET_PAGE_SIZE,
  payload: pageSize,
});

export function fetchPokemons(page, pageSize, sort, tipo, source) {
  return async (dispatch) => {
    const URL = `http://localhost:3001/pokemons?page=${page}&pageSize=${pageSize}`
    let response = []
    if(sort === "reset") {
      sort = ""
    }
    if(tipo === "reset") {
      tipo = ""
    }
    if(source === "reset") {
      source = ""
    }

    if(!sort && !tipo && !source){
      response = await axios.get(URL); //x-x-x
    }
    if(sort && !tipo && !source) {
      response = await axios.get(`${URL}&sort=${sort}`); // i-x-x
    }
    if(!sort && tipo && !source){
      response = await axios.get(`${URL}&type=${tipo}`); // x-i-x
    }
    if(!sort && !tipo && source){
      response = await axios.get(`${URL}&source=${source}`); // x-x-i
    }
    if(sort && tipo && !source){
      response = await axios.get(`${URL}&sort=${sort}&type=${tipo}`); // i-i-x
    }
    if(sort && !tipo && source){
      response = await axios.get(`${URL}&sort=${sort}&source=${source}`); // i-x-i
    }
    if(!sort && tipo && source){
      response = await axios.get(`${URL}&source=${source}&type=${tipo}`); // x-i-i
    }
    if(sort && tipo && source){
      response = await axios.get(`${URL}&sort=${sort}&type=${tipo}&source=${source}`); // i-i-i
    }
    dispatch({
      type: FETCH,
      payload: response.data.data,
      totalPokemonsCount: response.data.totalPokemons,
    });
  };
}

// export const fetchFilteredPokemons = (filter) => {
//   return async (dispatch) => {
//     const response = await axios.get(`http://localhost:3001/pokemons/?type=${filter}`);
//     const filteredPokemons = response.data;
//     dispatch({
//       type: FILTERED,
//       payload: filteredPokemons,
//     });
//   };
// };

export function reset() {
  return {
    type: RESET,
  };
}
