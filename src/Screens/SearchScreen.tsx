import React, {useState} from 'react';
import {Image, StyleSheet, View} from "react-native";
import Searchbar from "../components/Searchbar";
import {Pokemon} from "../Types/Pokemon";

const SearchScreen = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    return (
        <View style={styles.screenContainer}>
            <Searchbar setPokemon={setPokemon}/>
            {pokemon && (
                <View>
                    <Image resizeMode={"contain"} style={styles.pokemonImage}
                           source={{uri: pokemon.image}}/>
                </View>)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    pokemonImage: {
        width: 600,
        height: 600,
    }
});

export default SearchScreen;