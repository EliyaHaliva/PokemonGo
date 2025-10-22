import {FC, useEffect, useState} from 'react';
import {TextInput, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store/store";
import {fetchPokemon} from "../../redux/slices/Pokemon/PokemonSliceService";
import {styles} from "./Styles";
import {clearState} from "../../redux/slices/Pokemon/pokemonSlice";

const Searchbar: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const debouncedSearch = setTimeout(() => {
            if (searchValue != '') {
                dispatch(fetchPokemon(searchValue));
            }
        }, 500)


        return () => {
            dispatch(clearState())
            clearTimeout(debouncedSearch);
        };
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
                    onPress={() => dispatch(fetchPokemon(searchValue))}/>
            </View>
        </View>
    );
};


export {Searchbar};