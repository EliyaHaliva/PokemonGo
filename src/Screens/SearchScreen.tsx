import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Searchbar} from "../components/Searchbar";
import {Pokemon} from "../Types/Pokemon";
import {SvgUri} from "react-native-svg";
import {PokemonColorType} from "../enums/PokemonColorType";

const SearchScreen: FC = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    return (
        <View style={styles.screenContainer}>
            <Searchbar setPokemon={setPokemon}/>
            {pokemon
                && (
                    <>
                        <View style={styles.imageContainer}>
                            <Text style={styles.title}>{pokemon?.name}</Text>
                            <SvgUri height={200} width={300}
                                    uri={pokemon?.sprites?.other?.dream_world?.front_default}/>
                        </View>
                        <View style={styles.describeContainer}>
                            <Text style={styles.title}>סוג</Text>
                            <View style={styles.directionRowContainer}>
                                {pokemon?.types.map((type, index) => (
                                    <View key={index} style={[styles.roundedDetails, {
                                        backgroundColor:
                                            PokemonColorType[type?.type?.name as keyof typeof PokemonColorType]
                                    }]}>
                                        <Text key={index} style={styles.detailsText}>
                                            {type.type.name}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.describeContainer}>
                            <Text style={styles.title}>סוג</Text>
                        </View>
                        <View style={styles.describeContainer}>
                            <Text style={styles.title}>סוג</Text>
                        </View>
                    </>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        gap: 20,
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        alignSelf: "center",
        fontSize: 30,
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        height: 300,
        width: '100%',
    },
    describeContainer: {
        borderTopWidth: 1,
        borderTopColor: '#808080',
        display: "flex",
        width: "100%",
        height: 100,
    },
    directionRowContainer: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 20,
    },
    roundedDetails: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        width: 120,
        height: 40,
    },
    detailsText: {
        fontSize: 20,
        color: "#FFFFFF",
    }
});

export {SearchScreen};