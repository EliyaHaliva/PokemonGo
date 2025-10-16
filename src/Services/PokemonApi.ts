import axios from "axios";
import {Pokemon} from "../Types/Pokemon";

const milliSecondsToSeconds: number = 1000;

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 5 * milliSecondsToSeconds,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const pokemonApi = {
    getPokemonDataByName: async (name: string): Promise<Pokemon> => {
        return (await api.get<Pokemon>(`pokemon/${name}`)).data;
    }
}