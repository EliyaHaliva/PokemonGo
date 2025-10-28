import { MaterialIcons } from "@expo/vector-icons";
import { FC, useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { clearCurrentPokemon } from "../../redux/slices/Pokemon/pokemonSlice";
import { fetchPokemon } from "../../redux/slices/Pokemon/PokemonSliceService";
import { AppDispatch } from "../../redux/store/store";
import { styles } from "./Styles";

interface Props {
  placeholder?: string;
  onSearch?: (query: string) => void;
  delay?: number;
}

const Searchbar: FC<Props> = ({ onSearch, placeholder, delay }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      if (onSearch) {
        onSearch(searchValue);
      } else if (searchValue.trim() !== "") {
        dispatch(fetchPokemon(searchValue));
      }
    }, delay || 500);

    return () => {
      dispatch(clearCurrentPokemon());
      clearTimeout(debouncedSearch);
    };
  }, [searchValue]);

  return (
    <View style={styles.searchWrapper}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputContainer}
          value={searchValue}
          placeholder={placeholder || "Search Pokemon"}
          onChangeText={setSearchValue}
        />
        <MaterialIcons
          style={styles.icon}
          name={"search"}
          size={30}
          onPress={() => dispatch(fetchPokemon(searchValue))}
        />
      </View>
    </View>
  );
};

export { Searchbar };
