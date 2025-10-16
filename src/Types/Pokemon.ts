import {Ability} from "./Ability";

export interface PokemonDtoIn {
    name: string,
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            }
        },
    },
    abilities: Ability[],
}

export interface Pokemon {
    name: string,
    image: string,
    abilities: Ability[],
}
