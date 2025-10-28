import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Animated, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Searchbar } from "../../components/SearchBar/SearchBar";
import { SortType } from "../../enums/SortType.enum";
import { useFilter } from "../../hooks/useFilter";
import { useSort } from "../../hooks/useSort";
import { RootState } from "../../redux/store/store";
import { PokemonCaught } from "../../types/PokemonCaught";
import { PokemonCard } from "./Components/PokemonCard/PokemonCard";
import { styles } from "./Styles";
import ScrollView = Animated.ScrollView;

const catchGif = require("../../../assets/catch.gif");

const InventoryScreen: FC = () => {
  const { sorts, sortData } = useSort();
  const pokemons: PokemonCaught[] = useSelector(
    (state: RootState) => state.pokemon.caughtPokemons
  );
  const { filters, setFilters, filteredPokemons } = useFilter(pokemons);

  return (
    <>
      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder={"לפי כינוי"}
            onSearch={(value) =>
              setFilters((prev) => {
                return {
                  ...prev,
                  nickname: value,
                };
              })
            }
            delay={100}
          />
        </View>
        <MaterialCommunityIcons
          name={filters.isFavorite ? "heart" : "heart-outline"}
          size={30}
          color={filters.isFavorite ? "#FF0000" : "#000000"}
          onPress={() =>
            setFilters((prev) => {
              return {
                ...prev,
                isFavorite: !prev.isFavorite,
              };
            })
          }
        />
        <MaterialCommunityIcons
          name={
            sorts.lexical
              ? "sort-alphabetical-ascending"
              : "sort-alphabetical-descending"
          }
          size={30}
          color="#000000"
          onPress={() =>
            sortData(filteredPokemons, SortType.Lexical, "nickname")
          }
        />
        <MaterialCommunityIcons
          name={
            sorts.date
              ? "sort-clock-ascending-outline"
              : "sort-clock-descending-outline"
          }
          size={30}
          color="#000000"
          onPress={() => sortData(filteredPokemons, SortType.Date, "date")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.screenContainer}>
        {filteredPokemons.length
          ? filteredPokemons.map((pokemonCaught, index) => (
              <PokemonCard key={index} pokemonCaught={pokemonCaught} />
            ))
          : null}
      </ScrollView>
      {!pokemons.length && (
        <View style={styles.emptyBagContainer}>
          <Text style={styles.noPokemonsTitle}>אין ברשותך פוקימונים</Text>
          <View>
            <Image style={styles.catchGif} source={catchGif} />
          </View>
        </View>
      )}
    </>
  );
};

export { InventoryScreen };
