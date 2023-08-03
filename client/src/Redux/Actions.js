import axios from "axios";
import {
  RESET,
  FETCH,
  TYPES,
  CREATE,
  DELETE,
  DETAIL,
  CHANGE,
} from "./ActionType";

export const change = (id, formEdit) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:3001/pokemons/${id}`, formEdit)
      dispatch({
        type: CHANGE,
        payload: response.data
      })
    } catch (error) {
      alert('Error changing Pokemon')
    }

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
      alert('Error creating Pokemon')
    }
  };
}

export const getPokemonDetail = (id) => {
  try {
    return async (dispatch) => {
      const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
      dispatch({
        type: DETAIL,
        payload: response.data
      })
    }
  } catch (error) {
    alert('Error bringing the requested Pokemon')
  }
}

export function deletePokemon(id) {
  try {
    return async (dispatch) => {
      const response = await axios.delete(`http://localhost:3001/pokemons/${id}`);
      dispatch({
        type: DELETE,
        payload: response.data,
      });
    }
  } catch (error) {
    alert('Error deleting Pokemon')
  }
}


export function getTypes() {
  try {
    return async (dispatch) => {
      const response = await axios.get('http://localhost:3001/types/');
      const typeNames = response.data.map((type) => type.name);
      dispatch({
        type: TYPES,
        payload: typeNames,
      });
    }
  } catch (error) {
    alert('Error bringing the types')
  }
}

export function fetchPokemons(page, pageSize, sort, tipo, source) {
  try {
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
        response = await axios.get(URL);
      }
      if (sort && !tipo && !source) {
        response = await axios.get(`${URL}&sort=${sort}`);
      }
      if (!sort && tipo && !source) {
        response = await axios.get(`${URL}&type=${tipo}`);
      }
      if (!sort && !tipo && source) {
        response = await axios.get(`${URL}&source=${source}`);
      }
      if (sort && tipo && !source) {
        response = await axios.get(`${URL}&sort=${sort}&type=${tipo}`);
      }
      if (sort && !tipo && source) {
        response = await axios.get(`${URL}&sort=${sort}&source=${source}`);
      }
      if (!sort && tipo && source) {
        response = await axios.get(`${URL}&source=${source}&type=${tipo}`);
      }
      if (sort && tipo && source) {
        response = await axios.get(`${URL}&sort=${sort}&type=${tipo}&source=${source}`);
      }
      dispatch({
        type: FETCH,
        payload: response.data.data,
        totalPokemonsCount: response.data.totalPokemons,
      });
    }
  }catch (error) {
    alert('Error bringing the requested Pokemons')
  }
}

export function reset() {
  try {
    return {
    type: RESET,
  };
  } catch (error) {
    alert('Error reseting')
  }
  
}
