import axios from "axios";
import {
  ORDER,
  RESET,
  FETCH,
  TYPES,
  CREATE,
  FETCH_FILTERED,
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

export const fetchFilteredPokemons = (filter) => {
  return async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/pokemons/?type=${filter}`);
    const filteredPokemons = response.data;
    dispatch({
      type: FETCH_FILTERED,
      payload: filteredPokemons,
    });
  };
};

export function fetchPokemons() {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/pokemons/");
    // console.log(response.data)
    dispatch({
      type: FETCH,
      payload: response.data,
    });
  };
}

// export function orderCards(order) {
//   return (dispatch, getState) => {
//     if (order === "reset") {
//       const originalOrder = getState().pokemonsOrigin;
//       dispatch({ type: RESET, payload: originalOrder });
//     } else {
//       dispatch({ type: ORDER, payload: order });
//     }
//   };
// }

export function orderCards(order) {
  return (dispatch, getState) => {
    if (order === "reset") {
      const originalOrder = getState().pokemonsOrigin;
      dispatch({ type: RESET, payload: originalOrder });
    } else {
      dispatch({ type: ORDER, payload: order });
    }
  };
}

// export const fetchFilteredPokemons = (filter) => {
//   return async (dispatch) => {
//     const response = await axios.get(`http://localhost:3001/pokemons/?type=${filter}`);
//     const filteredPokemons = response.data;
//     dispatch({
//       type: FETCH_FILTERED,
//       payload: filteredPokemons,
//     });
//   };
// };

export function reset() {
  return {
    type: RESET,
  };
}
