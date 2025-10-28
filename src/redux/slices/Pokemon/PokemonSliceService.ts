import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonApi } from "../../../axios/PokemonApi";

export const fetchPokemon = createAsyncThunk(
    'pokemon/fetchPokemon',
    async (name: string) => {
        return pokemonApi.getPokemonByName(name);
    }
);