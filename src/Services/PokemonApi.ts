import axios from "axios";
import {Pokemon, PokemonDtoIn} from "../Types/Pokemon";

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
        const pokemonDtoIn: PokemonDtoIn = (await api.get<PokemonDtoIn>(`pokemon/${name}`)).data;

        return {...pokemonDtoIn, image: pokemonDtoIn.sprites.other.dream_world.front_default};
    }
}