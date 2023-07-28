import { FILTER, ORDER, RESET, FETCH } from "./ActionType";

const initialState = {
  pokemons: [],
  pokemonsOrigin: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
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
      const newOrder = state.pokemonsOrigin.slice().sort((a, b) => {
        if (a.id > b.id) {
          return "Asc" === payload ? 1 : -1;
        }
        if (a.id < b.id) {
          return "Des" === payload ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        pokemons: newOrder,
      };
    case FETCH: // Agrega el caso para FETCH
      return {
        ...state,
        pokemons: payload, // Actualiza los pokémones
        pokemonsOrigin: payload, // Actualiza los pokémones originales
      };
    default:
      return state;
  }
}
