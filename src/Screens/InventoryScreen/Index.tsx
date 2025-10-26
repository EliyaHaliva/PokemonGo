import React, { FC, useCallback, useState } from "react";
import { Animated, Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { PokemonCaught } from "../../types/PokemonCaught";
import { PokemonCard } from "../../components/PokemonCard/Index";
import { styles } from "./Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Searchbar } from "../../components/Searchbar/Index";
import { Sort } from "../../types/Sort";
import { SortType } from "../../enums/SortType";
import ScrollView = Animated.ScrollView;

const getPokemonsFromAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const storedPokemons = await AsyncStorage.multiGet(keys);
    const parsedPokemons: [string, PokemonCaught][] = storedPokemons.map(
      ([key, value]) => [key, JSON.parse(value!)]
    );

    return parsedPokemons || [];
  } catch (error) {
    console.error(error);
  }
};

const InventoryScreen: FC = () => {
  const [pokemons, setPokemons] = useState<[string, PokemonCaught][]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<
    [string, PokemonCaught][]
  >([]);
  const [sort, setSort] = useState<Sort>({
    date: { ascending: true },
    lexical: { ascending: true },
  });
  const catchGif = require("../../../assets/catch.gif");

  useFocusEffect(
    useCallback(() => {
      const fetchPokemons = async () => {
        const pokemons = await getPokemonsFromAsyncStorage();
        if (pokemons) {
          const defaultSortedPokemons = [...pokemons].sort(
            ([, firstPokemon], [, secondPokemon]) =>
              secondPokemon.nickname.localeCompare(firstPokemon.nickname)
          );
          setPokemons(defaultSortedPokemons);
          setFilteredPokemons(defaultSortedPokemons);
        } else {
          setPokemons([]);
          setFilteredPokemons([]);
        }
      };

      fetchPokemons();
    }, [])
  );

  const sortPokemons = (key: SortType) => {
    const storedPokemons = [...filteredPokemons];

    if (storedPokemons) {
      setFilteredPokemons(() => {
        const ascending = sort[key].ascending;

        return [...storedPokemons].sort(
          ([, firstPokemon], [, secondPokemon]) => {
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
          }
        );
      });

      setSort((prev) => ({
        ...prev,
        [key]: { ascending: !prev[key].ascending },
      }));
    }
  };

  const filterByNickName = (nickname: string) => {
    if (nickname.trim() !== "") {
      const storedPokemons = pokemons ? [...pokemons] : null;

      if (storedPokemons) {
        setFilteredPokemons(() => {
          return [...storedPokemons].filter(([, pokemon]) =>
            pokemon.nickname.toLowerCase().startsWith(nickname.toLowerCase())
          );
        });
      }
    } else if (pokemons.length) {
      setFilteredPokemons(pokemons);
    }
  };

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
            sort.lexical.ascending
              ? "sort-alphabetical-ascending"
              : "sort-alphabetical-descending"
          }
          size={30}
          color="#000"
          onPress={() => sortPokemons(SortType.Lexical)}
        />
        <MaterialCommunityIcons
          name={
            sort.date.ascending
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
          ? filteredPokemons.map(([key, pokemonCaught]) => (
              <PokemonCard
                key={key}
                storageKey={key}
                pokemonCaught={pokemonCaught}
              />
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

export { InventoryScreen, getPokemonsFromAsyncStorage };
