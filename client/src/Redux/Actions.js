import axios from "axios";
import { FILTER, ORDER, RESET, FETCH, TYPES, CREATE } from "./ActionType";

export function create(form) {
  return async (dispatch) => {
    const response = await axios.post('http://localhost:3001/pokemons/', form)
    dispatch({
      type: CREATE,
      payload: response.data,
    })
  }
}

export function getTypes() {
  return async (dispatch) => {
    const response = await axios.get('http://localhost:3001/types/');
    const typeNames = response.data.map((type) => type.name);
    // console.log(typeNames);
    dispatch({
      type: TYPES,
      payload: typeNames,
    });
  };
}


export function filterCards(type) {
  return {
    type: FILTER,
    payload: type,
  };
}

export function fetchPokemons() {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/pokemons/")
    dispatch({
      type: FETCH,
      payload: response.data,
    })

  };
}




export function orderCards(order) {
  return {
    type: ORDER,
    payload: order,
  };
}

export function reset() {
  return {
    type: RESET
  }
}