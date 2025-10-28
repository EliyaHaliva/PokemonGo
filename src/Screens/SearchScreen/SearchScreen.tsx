import React, { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { Searchbar } from "../../components/SearchBar/SearchBar";
import { PokemonColorType } from "../../enums/PokemonColorType.enum";
import { addPokemon } from "../../redux/slices/Pokemon/pokemonSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import { styles } from "./Styles";

const pokeball = require("../../../assets/pokeball.png");

const SearchScreen: FC = () => {
  const { caughtPokemons, currentPokemon } = useSelector(
    (state: RootState) => state.pokemon
  );
  const dispatch = useDispatch<AppDispatch>();

  const catchPokemon = () => {
    if (currentPokemon) {
      dispatch(
        addPokemon({
          date: new Date().toISOString(),
          data: currentPokemon,
          nickname: currentPokemon.name,
          isFavorite: false,
          count: 1,
        })
      );
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchContainer}>
        <Searchbar placeholder={"חיפוש פוקימון"} />
      </View>
      {currentPokemon && (
        <>
          <View style={[styles.imageContainer, styles.centeredFlex]}>
            <Text style={styles.title}>{currentPokemon.name}</Text>
            <SvgUri
              height={200}
              width={300}
              uri={currentPokemon?.sprites?.other?.dream_world?.front_default}
            />
          </View>
          <View style={styles.describeContainer}>
            <Text style={styles.title}>סוג</Text>
            <View style={styles.directionRowContainer}>
              {currentPokemon?.types.map((type, index) => (
                <View
                  key={index}
                  style={[
                    styles.roundedDetails,
                    styles.centeredFlex,
                    {
                      backgroundColor:
                        PokemonColorType[
                          type?.type?.name as keyof typeof PokemonColorType
                        ],
                    },
                  ]}
                >
                  <Text style={styles.detailsText}>{type.type.name}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.describeContainer}>
            <Text style={styles.title}>יכולות</Text>
            <View style={styles.directionRowContainer}>
              <View style={[styles.roundedDetails, styles.centeredFlex]}>
                {currentPokemon?.abilities.map((ability, index) => (
                  <Text key={index} style={styles.detailsText}>
                    {ability.ability.name}
                    {index != 0 ? ", " : ""}
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <View style={[styles.describeContainer, styles.centeredFlex]}>
            <Pressable
              style={[styles.catchContainer, styles.centeredFlex]}
              onPress={() => catchPokemon()}
            >
              <Image style={styles.pokeImage} source={pokeball} />
              <Text style={styles.detailsText}>תפוס!</Text>
            </Pressable>
            <Text style={styles.countText}>
              יש ברשותך פוקימון זה:{" "}
              {caughtPokemons.find(
                (pokemon) => pokemon.data.name == currentPokemon.name
              )?.count || 0}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export { SearchScreen };
