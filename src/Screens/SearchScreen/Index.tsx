import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { Searchbar } from "../../components/Searchbar/Index";
import { PokemonColorType } from "../../enums/PokemonColorType.enum";
import {
  catchPokemon,
  PokemonState,
} from "../../redux/slices/Pokemon/pokemonSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import { styles } from "./Styles";

const SearchScreen: FC = () => {
  const pokemonState: PokemonState = useSelector(
    (state: RootState) => state.pokemon
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchContainer}>
        <Searchbar placeholder={"חיפוש פוקימון"} />
      </View>
      {pokemonState.currentPokemon && (
        <>
          <View style={[styles.imageContainer, styles.centeredFlex]}>
            <Text style={styles.title}>{pokemonState.currentPokemon.name}</Text>
            <SvgUri
              height={200}
              width={300}
              uri={
                pokemonState?.currentPokemon?.sprites?.other?.dream_world
                  ?.front_default
              }
            />
          </View>
          <View style={styles.describeContainer}>
            <Text style={styles.title}>סוג</Text>
            <View style={styles.directionRowContainer}>
              {pokemonState?.currentPokemon?.types.map((type, index) => (
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
                {pokemonState?.currentPokemon?.abilities.map(
                  (ability, index) => (
                    <Text key={index} style={styles.detailsText}>
                      {ability.ability.name}
                      {index != 0 ? ", " : ""}
                    </Text>
                  )
                )}
              </View>
            </View>
          </View>
          <View style={[styles.describeContainer, styles.centeredFlex]}>
            <Pressable
              style={[styles.catchContainer, styles.centeredFlex]}
              onPress={() => dispatch(catchPokemon())}
            >
              <Image
                style={styles.pokeImage}
                source={require("../../../assets/pokeball.png")}
              />
              <Text style={styles.detailsText}>תפוס!</Text>
            </Pressable>
            <Text style={styles.countText}>
              יש ברשותך פוקימון זה:{" "}
              {pokemonState.caughtPokemons.find(
                (pokemon) =>
                  pokemon.data.name == pokemonState.currentPokemon?.name
              )?.count || 0}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export { SearchScreen };
