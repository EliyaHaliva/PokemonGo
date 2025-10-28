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
        addPokemon: (state: PokemonState, action: PayloadAction<PokemonCaught>) => {
            const foundPokemon = state.caughtPokemons.find(
                (pokemon) => pokemon.data.name === action.payload.data.name);

            foundPokemon ? foundPokemon.count++ : state.caughtPokemons.push(action.payload);
        },
        toggleFavorite: (state, action:PayloadAction<PokemonCaught>) => {
            const foundPokemon = state.caughtPokemons.find(
                pokemon => pokemon.data.name === action.payload.data.name);

            if(foundPokemon) {
                foundPokemon.isFavorite = !foundPokemon.isFavorite;
            }
        },
        changeNickname: (state, action:PayloadAction<{pokemonCaught: PokemonCaught, nickname: string}>) => {
            const {pokemonCaught, nickname} = action.payload;
            
            const foundPokemon = state.caughtPokemons.find(
                pokemon => pokemon.data.name === pokemonCaught.data.name);

            if(foundPokemon && foundPokemon.nickname !== nickname) {
                foundPokemon.nickname = nickname;
            }
        }
    }, extraReducers: (builder) => {
        builder.addCase(fetchPokemon.fulfilled, (state, action:PayloadAction<Pokemon>) => {
            state.currentPokemon = action.payload
        })
    }
})

export const {clearCurrentPokemon, addPokemon, toggleFavorite, changeNickname} = pokemonSlice.actions;
export const pokemonReducer = pokemonSlice.reducer;