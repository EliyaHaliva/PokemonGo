import React, {FC} from 'react';
import {Image, Pressable, Text, View} from "react-native";
import {Searchbar} from "../../components/Searchbar/Searchbar";
import {SvgUri} from "react-native-svg";
import {PokemonColorType} from "../../enums/PokemonColorType";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/store";
import {styles} from "./Styles";
import {PokemonState} from "../../redux/slices/Pokemon/pokemonSlice";
import {Pokemon} from "../../types/Pokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {routes, TabList} from "../../Router/routes";
import Toast from "react-native-toast-message";

const SearchScreen: FC = () => {
    const pokemonState: PokemonState = useSelector((state: RootState) => state.pokemon);
    const navigation = useNavigation<NavigationProp<TabList>>();

    const addPokemon = async () => {
        const pokemon: Pokemon = pokemonState.data!;
        try {
            const index = (await AsyncStorage.getAllKeys()).length;
            if (Math.floor(Math.random() * (10 + 1)) > 5) {
                await AsyncStorage.setItem(`${index + 1}`, JSON.stringify({
                    date: new Date(),
                    data: pokemon,
                    nickname: pokemon.name,
                    isFavorite: false,
                }));
                Toast.show({
                    type: 'success',
                    text1: `${pokemon.name} Has been caught`,
                    position: 'bottom',
                    visibilityTime: 2000,
                });
                navigation.navigate(routes.InventoryScreen as keyof TabList);
            } else {
                Toast.show({
                    type: 'error',
                    text1: `${pokemon.name} Has run away`,
                    position: 'bottom',
                    visibilityTime: 2000,
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `Error occurred please try again`,
                position: 'bottom',
                visibilityTime: 2000,
            });
        }
    };

    return (
        <View style={styles.screenContainer}>
            <Searchbar/>
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