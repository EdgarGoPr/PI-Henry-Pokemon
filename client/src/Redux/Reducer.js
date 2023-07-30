// Reducer.js

import { RESET, FETCH, TYPES, CREATE, FILTERED, ORDER, SET_PAGE, SET_PAGE_SIZE} from "./ActionType";

const initialState = {
  pokemons: [],
  pokemonsOrigin: [],
  types: [],
  page: 1,
  pageSize: 12,
  totalPokemonsCount: 0,
};

export default function rootReducer(state = initialState, { totalPokemonsCount, type, payload }) {
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
        totalPokemonsCount: totalPokemonsCount
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
    default:
      return state;
  }
}
