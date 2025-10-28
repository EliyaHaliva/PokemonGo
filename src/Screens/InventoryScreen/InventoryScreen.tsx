import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import { Animated, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Searchbar } from "../../components/SearchBar/SearchBar";
import { SortType } from "../../enums/SortType.enum";
import { RootState } from "../../redux/store/store";
import { PokemonCaught } from "../../types/PokemonCaught";
import { Sort } from "../../types/Sort";
import { PokemonCard } from "./Components/PokemonCard/PokemonCard";
import { styles } from "./Styles";
import ScrollView = Animated.ScrollView;

const catchGif = require("../../../assets/catch.gif");

const InventoryScreen: FC = () => {
  const pokemons: PokemonCaught[] = useSelector(
    (state: RootState) => state.pokemon.caughtPokemons
  );
  const [filteredPokemons, setFilteredPokemons] =
    useState<PokemonCaught[]>(pokemons);
  const [sort, setSort] = useState<Sort>({
    date: true,
    lexical: true,
  });

  const sortPokemons = (key: SortType) => {
    const storedPokemons = [...filteredPokemons];

    if (storedPokemons) {
      setFilteredPokemons(() => {
        const ascending = sort[key];

        return [...storedPokemons].sort((firstPokemon, secondPokemon) => {
          switch (key) {
            case "lexical":
              return ascending
                ? firstPokemon.nickname.localeCompare(secondPokemon.nickname)
                : secondPokemon.nickname.localeCompare(firstPokemon.nickname);
            case "date":
              return ascending
                ? new Date(firstPokemon.date).getTime() -
                    new Date(secondPokemon.date).getTime()
                : new Date(secondPokemon.date).getTime() -
                    new Date(firstPokemon.date).getTime();
            default:
              return 0;
          }
        });
      });

      setSort((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const filterByNickName = (nickname: string) => {
    if (nickname.trim() !== "") {
      const storedPokemons = pokemons ? [...pokemons] : null;

      if (storedPokemons) {
        setFilteredPokemons(() => {
          return [...storedPokemons].filter((pokemon) =>
            pokemon.nickname.toLowerCase().startsWith(nickname.toLowerCase())
          );
        });
      }
    } else if (pokemons.length) {
      setFilteredPokemons(pokemons);
    }
  };

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  return (
    <>
      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder={"סינון לפי כינוי"}
            onSearch={filterByNickName}
            delay={100}
          />
        </View>
        <MaterialCommunityIcons
          name={
            sort.lexical
              ? "sort-alphabetical-ascending"
              : "sort-alphabetical-descending"
          }
          size={30}
          color="#000"
          onPress={() => sortPokemons(SortType.Lexical)}
        />
        <MaterialCommunityIcons
          name={
            sort.date
              ? "sort-clock-ascending-outline"
              : "sort-clock-descending-outline"
          }
          size={30}
          color="#000"
          onPress={() => sortPokemons(SortType.Date)}
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
