import { FILTER, ORDER, RESET, FETCH, TYPES, CREATE } from "./ActionType";

const initialState = {
  pokemons: [],
  pokemonsOrigin: [],
  types: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE:
      return {
        ...state,
        pokemons: payload,
      }
    case TYPES:
      return {
        ...state,
        types: payload
      }
    case FILTER:
      const newFilter = state.pokemonsOrigin.filter(
        (pk) => pk.type === payload
      );
      return {
        ...state,
        pokemons: newFilter,
      };
    case RESET:
      return {
        ...state,
        pokemons: [...state.pokemonsOrigin],
      };
      case ORDER:
        const sortedPokemons = payload === "asc" ? state.pokemonsOrigin : state.pokemonsOrigin.slice().reverse();
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
