import axios from "axios";
import {
  RESET,
  FETCH,
  TYPES,
  CREATE,
  SET_PAGE,
  SET_PAGE_SIZE,
  DELETE,
  DETAIL,
  CHANGE,
} from "./ActionType";

export const change = (id, formEdit) => {
  return async (dispatch) => {
    const response = await axios.put(`http://localhost:3001/pokemons/${id}`, formEdit)
    dispatch({
      type: CHANGE,
      payload: response.data
    })
  }
}

export function create(form) {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/pokemons/', form);
    dispatch({
      type: CREATE,
      payload: response.data,
    });
    } catch (error) {
      throw new Error ({error: error.message})
    }
    
  };
}

export const getPokemonDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
    dispatch({
      type: DETAIL,
      payload: response.data
    })
  }
}

export function deletePokemon(id) {
  return async (dispatch) => {
    const response = await axios.delete(`http://localhost:3001/pokemons/${id}`);
    dispatch({
      type: DELETE,
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
    if (sort === "reset") {
      sort = ""
    }
    if (tipo === "reset") {
      tipo = ""
    }
    if (source === "reset") {
      source = ""
    }

    if (!sort && !tipo && !source) {
      response = await axios.get(URL); //x-x-x
    }
    if (sort && !tipo && !source) {
      response = await axios.get(`${URL}&sort=${sort}`); // i-x-x
    }
    if (!sort && tipo && !source) {
      response = await axios.get(`${URL}&type=${tipo}`); // x-i-x
    }
    if (!sort && !tipo && source) {
      response = await axios.get(`${URL}&source=${source}`); // x-x-i
    }
    if (sort && tipo && !source) {
      response = await axios.get(`${URL}&sort=${sort}&type=${tipo}`); // i-i-x
    }
    if (sort && !tipo && source) {
      response = await axios.get(`${URL}&sort=${sort}&source=${source}`); // i-x-i
    }
    if (!sort && tipo && source) {
      response = await axios.get(`${URL}&source=${source}&type=${tipo}`); // x-i-i
    }
    if (sort && tipo && source) {
      response = await axios.get(`${URL}&sort=${sort}&type=${tipo}&source=${source}`); // i-i-i
    }
    dispatch({
      type: FETCH,
      payload: response.data.data,
      totalPokemonsCount: response.data.totalPokemons,
    });
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
