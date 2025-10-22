import {createAsyncThunk} from "@reduxjs/toolkit";
import {api} from "../../../axios/PokemonApi";
import {Pokemon} from "../../../types/Pokemon";

export const fetchPokemon = createAsyncThunk(
    'pokemon/fetchPokemon',
    async (name: string) => {
        console.log(name);
        return (await api.get<Pokemon>(`pokemon/${name}`)).data;
    }
);