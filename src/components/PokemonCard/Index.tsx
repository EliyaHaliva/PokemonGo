import React, {FC, useState} from 'react';
import {Text, View} from "react-native";
import {PokemonCaught} from "../../types/PokemonCaught";
import {styles} from "./Styles";
import {SvgUri} from "react-native-svg";
import {FontAwesome} from '@expo/vector-icons';
import moment from "moment";


const PokemonCard: FC<{ pokemonCaught: PokemonCaught }> = ({pokemonCaught}) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(pokemonCaught.isFavorite);

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.name}>{pokemonCaught.data.name}</Text>
            <SvgUri height={80} width={90}
                    uri={pokemonCaught.data.sprites.other.dream_world.front_default}/>
            <View style={styles.centeredFlex}>
                <Text style={styles.nickname}>{pokemonCaught.nickname}</Text>
                <FontAwesome
                    name={isFavorite ? 'heart' : 'heart-o'}
                    size={25}
                    color={isFavorite ? 'red' : 'black'}
                    onPress={handleFavorite}
                />
                <Text>תאריך תפיסה: {moment(pokemonCaught.date).format('DD.MM.YY')}</Text>
            </View>
        </View>
    );
};

export {PokemonCard};
