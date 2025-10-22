import {Pokemon} from "./Pokemon";

export interface PokemonCaught {
    date: Date,
    data: Pokemon,
    nickname: string,
    isFavorite: boolean,
}