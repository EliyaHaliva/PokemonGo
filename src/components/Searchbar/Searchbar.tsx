import {FC, useEffect, useState} from 'react';
import {TextInput, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store/store";
import {fetchPokemon} from "../../redux/slices/Pokemon/PokemonSliceService";
import {styles} from "./Styles";

const Searchbar: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (searchValue != '') {
            dispatch(fetchPokemon(searchValue));
        }
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