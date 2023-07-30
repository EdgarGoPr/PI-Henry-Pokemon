// Reducer.js

import { ORDER, RESET, FETCH, TYPES, CREATE, FETCH_FILTERED, FILTER_CARDS } from "./ActionType";

const initialState = {
  pokemons: [],
  pokemonsOrigin: [],
  types: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FILTER_CARDS:
      const filteredPokemons = state.pokemons.filter(pokemon => pokemon.type === payload);
      return {
        ...state,
        pokemons: filteredPokemons,
      };
    case CREATE:
      return {
        ...state,
        pokemons: payload,
      };
    case TYPES:
      return {
        ...state,
        types: payload,
      };
    case FETCH_FILTERED:
      return {
        ...state,
        pokemons: payload,
      };
    case RESET:
      return {
        ...state,
        pokemons: [...state.pokemonsOrigin],
      };
    case ORDER:
      let sortedPokemons;
      if (payload === "asc") {
        sortedPokemons = state.pokemonsOrigin.slice().sort((a, b) => a.name.localeCompare(b.name));
      } else if (payload === "desc") {
        sortedPokemons = state.pokemonsOrigin.slice().sort((a, b) => b.name.localeCompare(a.name));
      } else {
        sortedPokemons = state.pokemonsOrigin;
      }
      return {
        ...state,
        pokemons: sortedPokemons,
      };
    case FETCH:
      return {
        ...state,
        pokemons: payload,
        pokemonsOrigin: payload,
      };
    default:
      return state;
  }
}
