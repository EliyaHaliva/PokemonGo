import { Pokemon } from "./Pokemon";

export interface PokemonCaught {
    date: string,
    data: Pokemon,
    nickname: string,
    isFavorite: boolean,
    count: number
}