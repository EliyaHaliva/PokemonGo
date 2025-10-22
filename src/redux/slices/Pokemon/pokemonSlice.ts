import {Pokemon} from "../../../types/Pokemon";
import {fetchPokemon} from "./PokemonSliceService";
import {createSlice} from "@reduxjs/toolkit";

export interface PokemonState {
    data: Pokemon | null;
    isLoading: boolean;
    isError: boolean;
}

const initialState: PokemonState = {data: null, isLoading: false, isError: false};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        clearState: (state: PokemonState) => {
            state.data = null;
            state.isLoading = false;
            state.isError = false;
        }
    }, extraReducers: (builder) => {
        builder.addCase(fetchPokemon.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(fetchPokemon.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.isError = false;
        }).addCase(fetchPokemon.rejected, (state) => {
            state.data = null;
            state.isLoading = false;
            state.isError = true;
        });
    }
})

export const {clearState} = pokemonSlice.actions;
export const pokemonReducer = pokemonSlice.reducer;