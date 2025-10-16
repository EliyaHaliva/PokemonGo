import {FC, useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {pokemonApi} from "../Services/PokemonApi";
import {Pokemon} from "../Types/Pokemon";

interface SearchbarProps {
    setPokemon: (pokemon: Pokemon | null) => void;
}

const Searchbar: FC<SearchbarProps> = ({setPokemon}) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const fetchPokemon = async () => {
        try {
            const searchedPokemon: Pokemon = await pokemonApi.getPokemonDataByName(searchValue)
            setPokemon(searchedPokemon);
        } catch (error) {
            console.error(error);
            setPokemon(null);
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, [searchValue]);

    return (
        <View style={styles.searchWrapper}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.inputContainer}
                    value={searchValue}
                    placeholder={"search pokemon"}
                    onChangeText={setSearchValue}/>
                <MaterialIcons
                    style={styles.icon}
                    name={"search"}
                    size={30}
                    onPress={() => fetchPokemon()}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchWrapper: {
        alignItems: 'center',
        marginTop: 30
    },
    searchContainer: {
        flexDirection: 'row-reverse',
        width: '50%',
        borderStyle: "solid",
        borderBottomWidth: 1,
    },
    inputContainer: {
        flex: 1,
        direction: "ltr",
        fontSize: 20,
    },
    icon: {
        fontSize: 45,
    },
});

export default Searchbar;