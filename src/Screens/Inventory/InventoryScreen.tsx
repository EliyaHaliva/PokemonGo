import React, {FC, useCallback, useState} from 'react';
import {View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {PokemonCaught} from "../../types/PokemonCaught";
import {PokemonCard} from "../../components/PokemonCard/Index";
import {styles} from "./Styles";

const InventoryScreen: FC = () => {
    const [pokemons, setPokemons] = useState<PokemonCaught[]>([]);

    const getPokemonsFromAsyncStorage = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const storedPokemons = await AsyncStorage.multiGet(keys);
            const parsedPokemons: PokemonCaught[] = storedPokemons.map(([_, value]) => JSON.parse(value!));

            setPokemons(parsedPokemons);
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getPokemonsFromAsyncStorage();
        }, []));

    return (
        <View style={styles.screenContainer}>
            {pokemons.length && pokemons.map((pokemonCaught, index) => (
                <PokemonCard pokemonCaught={pokemonCaught} key={index}/>
            ))}
        </View>
    );
};

export {InventoryScreen};