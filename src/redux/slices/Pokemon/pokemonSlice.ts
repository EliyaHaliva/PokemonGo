import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../../../types/Pokemon";
import { PokemonCaught } from "../../../types/PokemonCaught";
import { fetchPokemon } from "./PokemonSliceService";

export interface PokemonState {
    currentPokemon: Pokemon | null,
    caughtPokemons: PokemonCaught[]
}

const initialState: PokemonState = {
    currentPokemon: null, caughtPokemons: []
};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        clearCurrentPokemon: (state: PokemonState) => {
            state.currentPokemon = null;
        },
        catchPokemon: (state: PokemonState) => {
            const foundPokemon = state.caughtPokemons.find(pokemon => pokemon.data.name === state.currentPokemon?.name);

            if(foundPokemon) {
                foundPokemon.count += 1;
            } else if (state.currentPokemon) {
                state.caughtPokemons.push({
                    date: new Date().toISOString(),
                    data: state.currentPokemon,
                    nickname: state.currentPokemon.name,
                    isFavorite: false,
                    count: 1
                })
            }
        },
        toogleFavorite: (state, action:PayloadAction<Pokemon>) => {
            const foundPokemon = state.caughtPokemons.find(
                pokemon => pokemon.data.name === action.payload.name);

                if(foundPokemon) {
                    foundPokemon.isFavorite = !foundPokemon.isFavorite;
                }
        }
    }, extraReducers: (builder) => {
        builder.addCase(fetchPokemon.fulfilled, (state, action:PayloadAction<Pokemon>) => {
            state.currentPokemon = action.payload
        })
    }
})

export const {clearCurrentPokemon, catchPokemon} = pokemonSlice.actions;
export const pokemonReducer = pokemonSlice.reducer;