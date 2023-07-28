import axios from "axios";
import { FILTER, ORDER, RESET, FETCH } from "./ActionType";

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