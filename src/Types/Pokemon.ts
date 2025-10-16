import {Ability} from "./Ability";

export interface Pokemon {
    name: string,
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            }
        },
    },
    abilities: Ability[],
    types: {
        type: {
            name: string,
        }
    }[],
}
