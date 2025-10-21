export interface Pokemon {
    name: string,
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            }
        },
    },
    abilities: {
        ability: {
            name: string,
        }
    }[],
    types: {
        type: {
            name: string,
        }
    }[],
}
