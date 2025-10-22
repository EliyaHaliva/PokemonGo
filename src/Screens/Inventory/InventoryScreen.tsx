import React, {FC, useCallback, useState} from 'react';
import {Animated, Image, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {PokemonCaught} from "../../types/PokemonCaught";
import {PokemonCard} from "../../components/PokemonCard/Index";
import {styles} from "./Styles";
import ScrollView = Animated.ScrollView;


const InventoryScreen: FC = () => {
    const [pokemons, setPokemons] = useState<[string, PokemonCaught][]>([]);
    const catchGif = require('../../../assets/catch.gif');

    const getPokemonsFromAsyncStorage = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const storedPokemons = await AsyncStorage.multiGet(keys);
            const parsedPokemons: [string, PokemonCaught][] = storedPokemons.map(([key, value]) => [key, JSON.parse(value!)]);

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
        <ScrollView contentContainerStyle={styles.screenContainer}>
            {pokemons.length ? pokemons.map(([key, pokemonCaught]) => (
                    <PokemonCard key={key} storageKey={key} pokemonCaught={pokemonCaught}/>
                )) :
                <View>
                    <Text style={styles.noPokemonsTitle}>אין ברשותך פוקימונים</Text>
                    <View>
                        <Image style={styles.catchGif} source={catchGif}/>
                    </View>
                </View>}
        </ScrollView>
    );
};

export {InventoryScreen};