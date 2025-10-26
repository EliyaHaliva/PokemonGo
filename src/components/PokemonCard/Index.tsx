import React, { FC, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { PokemonCaught } from "../../types/PokemonCaught";
import { styles } from "./Styles";
import { SvgUri } from "react-native-svg";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface FormData {
  nickname: string;
}

const PokemonCard: FC<{ storageKey: string; pokemonCaught: PokemonCaught }> = ({
  storageKey,
  pokemonCaught,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(
    pokemonCaught.isFavorite
  );

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      nickname: pokemonCaught.nickname,
    },
  });

  const handleFavorite = async () => {
    await AsyncStorage.setItem(
      `${storageKey}`,
      JSON.stringify({
        ...pokemonCaught,
        isFavorite: !isFavorite,
      })
    );
    setIsFavorite(!isFavorite);
  };

  const nicknameSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (data.nickname !== pokemonCaught.nickname) {
        await AsyncStorage.setItem(
          `${storageKey}`,
          JSON.stringify({
            ...pokemonCaught,
            nickname: data.nickname,
          })
        );
        Toast.show({
          type: "success",
          text1: "כינוי שונה בהצלחה",
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `אירעה שגיאה אנא נסה שנית`,
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  const nicknameErrors = (errors: FieldErrors<FormData>) => {
    if (errors.nickname) {
      Toast.show({
        type: "error",
        text1: errors.nickname.message,
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.name}>{pokemonCaught.data.name}</Text>
      <SvgUri
        height={80}
        width={90}
        uri={pokemonCaught.data.sprites.other.dream_world.front_default}
      />
      <View style={styles.centeredFlex}>
        <View style={styles.nicknameContainer}>
          <Octicons
            style={styles.editIcon}
            name="pencil"
            size={18}
            color="black"
            onPress={handleSubmit(nicknameSubmit, nicknameErrors)}
          />
          <Controller
            control={control}
            name="nickname"
            rules={{
              required: "חובה להזין שם",
              maxLength: { value: 12, message: "לא יותר מ-12 תווים" },
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={styles.nickname}
                placeholder="הקלד כינוי..."
                keyboardType="default"
                autoCorrect={false}
                textAlign="right"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={12}
              />
            )}
          />
        </View>
        <FontAwesome
          name={isFavorite ? "heart" : "heart-o"}
          size={25}
          color={isFavorite ? "#FF0000" : "#000000"}
          onPress={handleFavorite}
        />
        <Text>
          תאריך תפיסה: {moment(pokemonCaught.date).format("DD.MM.YY")}
        </Text>
      </View>
    </View>
  );
};

export { PokemonCard };
