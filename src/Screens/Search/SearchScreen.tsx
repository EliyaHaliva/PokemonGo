import React, {FC} from 'react';
import {Image, Pressable, Text, ToastAndroid, View} from "react-native";
import {Searchbar} from "../../components/Searchbar/Searchbar";
import {SvgUri} from "react-native-svg";
import {PokemonColorType} from "../../enums/PokemonColorType";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/store";
import {styles} from "./Styles";
import {PokemonState} from "../../redux/slices/Pokemon/pokemonSlice";
import {Pokemon} from "../../types/Pokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen: FC = () => {
    const pokemonState: PokemonState = useSelector((state: RootState) => state.pokemon);
    const loadingGif = require('../../../assets/loading.gif');

    const addPokemon = async () => {
        const pokemon: Pokemon = pokemonState.data!;
        try {
            const index = (await AsyncStorage.getAllKeys()).length;
            if (Math.floor(Math.random() * (10 + 1)) > 5) {
                await AsyncStorage.setItem(`${index + 1}`, JSON.stringify(pokemon));
                ToastAndroid.show(`${pokemon.name} Has been caught`, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(`${pokemon.name} Has run away`, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show(`Bad`, ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.screenContainer}>
            <Searchbar/>
            {pokemonState.isLoading
                && (
                    <View>
                        <Image style={styles.loader} source={loadingGif}/>
                    </View>)}
            {pokemonState.data
                && (
                    <>
                        <View style={[styles.imageContainer, styles.centeredFlex]}>
                            <Text style={styles.title}>{pokemonState?.data?.name}</Text>
                            <SvgUri height={200} width={300}
                                    uri={pokemonState?.data?.sprites?.other?.dream_world?.front_default}/>
                        </View>
                        <View style={styles.describeContainer}>
                            <Text style={styles.title}>סוג</Text>
                            <View style={styles.directionRowContainer}>
                                {pokemonState?.data?.types.map((type, index) => (
                                    <View key={index} style={[styles.roundedDetails, styles.centeredFlex, {
                                        backgroundColor:
                                            PokemonColorType[type?.type?.name as keyof typeof PokemonColorType]
                                    }]}>
                                        <Text style={styles.detailsText}>
                                            {type.type.name}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.describeContainer}>
                            <Text style={styles.title}>יכולות</Text>
                            <View style={styles.directionRowContainer}>
                                <View style={[styles.roundedDetails, styles.centeredFlex]}>
                                    {pokemonState?.data?.abilities.map((ability, index) => (
                                        <Text key={index} style={styles.detailsText}>
                                            {ability.ability.name}{index != 0 ? ', ' : ''}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View style={[styles.describeContainer, styles.centeredFlex]}>
                            <Pressable style={[styles.catchContainer, styles.centeredFlex]}
                                       onPress={() => addPokemon()}>
                                <Image style={styles.pokeImage} source={require('../../../assets/pokeball.png')}/>
                                <Text style={styles.detailsText}>תפוס!</Text>
                            </Pressable>
                        </View>
                    </>)}
        </View>
    );
};

export {SearchScreen};