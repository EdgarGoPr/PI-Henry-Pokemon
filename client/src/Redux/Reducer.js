// Reducer.js

import { RESET, FETCH, TYPES, CREATE, FILTERED, ORDER, SET_PAGE, SET_PAGE_SIZE, DELETE } from "./ActionType";

const initialState = {
  pokemons: [],
  pokemonsOrigin: [],
  types: [],
  page: 1,
  pageSize: 12,
  totalPokemonsCount: 0,
  sort: null,
  tipo: null,
  source: null,
};

export default function rootReducer(state = initialState, { source, sort, tipo, totalPokemonsCount, type, payload }) {
  switch (type) {
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
    case FILTERED:
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
      return {
        ...state,
        pokemons: payload,
      };
    case FETCH:
      return {
        ...state,
        pokemons: payload,
        totalPokemonsCount: totalPokemonsCount,
        tipo: tipo,
        sort: sort,
        source: source,
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload,
      };
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: payload.totalPokemonsCount,
      };
    case DELETE:
      const deletedPokemonId = payload.id;
      const updatedPokemons = state.pokemons.filter(pokemon => pokemon.id !== deletedPokemonId);
      return {
        ...state,
        pokemons: updatedPokemons,
      };
    default:
      return state;
  }
}
