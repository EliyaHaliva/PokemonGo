import axios from "axios";
import {Pokemon} from "../types/Pokemon";

const milliSecondsToSeconds: number = 1000;

export const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 5 * milliSecondsToSeconds,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const pokemonApi = {
    getPokemonByName: async (name: string) => {
        return (await api.get<Pokemon>(`pokemon/${name}`)).data;
    }
}