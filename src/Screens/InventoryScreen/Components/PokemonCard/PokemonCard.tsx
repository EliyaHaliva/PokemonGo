import { FontAwesome, Octicons } from "@expo/vector-icons";
import moment from "moment";
import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../../../redux/slices/Pokemon/pokemonSlice";
import { AppDispatch } from "../../../../redux/store/store";
import { PokemonCaught } from "../../../../types/PokemonCaught";
import { NicknameModal } from "../NicknameModal/NicknameModal";
import { styles } from "./Styles";

interface Props {
  pokemonCaught: PokemonCaught;
}

const PokemonCard: FC<Props> = ({ pokemonCaught }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editNickNameDialog, setEditNickNameDialog] = useState(false);

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
            onPress={() => setEditNickNameDialog(true)}
          />
          <Text style={styles.nickname}>{pokemonCaught.nickname}</Text>
        </View>
        <FontAwesome
          name={pokemonCaught.isFavorite ? "heart" : "heart-o"}
          size={25}
          color={pokemonCaught.isFavorite ? "#FF0000" : "#000000"}
          onPress={() => dispatch(toggleFavorite(pokemonCaught))}
        />
        <Text>
          תאריך תפיסה: {moment(pokemonCaught.date).format("DD.MM.YY")}
        </Text>
      </View>
      <NicknameModal
        pokemonCaught={pokemonCaught}
        isOpen={editNickNameDialog}
        setIsOpen={setEditNickNameDialog}
      />
    </View>
  );
};

export { PokemonCard };
