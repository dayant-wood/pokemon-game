import { createSlice } from '@reduxjs/toolkit';
import FirebaseClass from '../service/firebase';

export const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
    selectedPokemons: {},
    selectedPokemonsEnemy: {},
    winner: null,
  },
  reducers: {
    fetchPokemons: state => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),

    handleSelectedPokemons: (state, { payload: { key, pokemon } }) => {
      const pokemons = { ...state.selectedPokemons };
      if (pokemons[key]) {
        delete pokemons[key];
        return { ...state, selectedPokemons: pokemons };
      }

      pokemons[key] = pokemon;
      return { ...state, selectedPokemons: pokemons };
    },

    handleSelectedPokemonsEnemy: (state, action) => {
      return {
        ...state,
        selectedPokemonsEnemy: { ...action.payload },
      };
    },

    clearState: state => {
      return {
        ...state,
        selectedPokemons: {},
        selectedPokemonsEnemy: {},
      };
    },

    handleSetWinner: (state, action) => {
      return {
        ...state,
        winner: action.payload,
      };
    },
  },
});

export const {
  fetchPokemons,
  fetchPokemonsReject,
  fetchPokemonsResolve,
  selectedPokemons,
  selectedPokemonsEnemy,
  handleSelectedPokemons,
  handleSelectedPokemonsEnemy,
  clearState,
  handleSetWinner,
} = slice.actions;

export const getPokemonsAsync = () => async dispatch => {
  dispatch(fetchPokemons());
  const data = await FirebaseClass.getPokemonsOnce();
  dispatch(fetchPokemonsResolve(data));
};

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;

export const selectedPokemonPlayer1 = state => state.pokemons.selectedPokemons;
export const selectedPokemonPlayer2 = state =>
  state.pokemons.selectedPokemonsEnemy;
export const winner = state => state.pokemons.winner;

export default slice.reducer;
