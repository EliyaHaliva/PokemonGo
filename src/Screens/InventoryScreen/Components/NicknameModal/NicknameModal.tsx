import { FC } from "react";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { changeNickname } from "../../../../redux/slices/Pokemon/pokemonSlice";
import { AppDispatch } from "../../../../redux/store/store";
import { FormData } from "../../../../types/FormData";
import { PokemonCaught } from "../../../../types/PokemonCaught";
import { errorToast, successToast } from "../../../../utils/Toast";
import { styles } from "./Styles";

interface Props {
  pokemonCaught: PokemonCaught;
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
}

const NicknameModal: FC<Props> = ({ pokemonCaught, isOpen, setIsOpen }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      nickname: pokemonCaught.nickname,
    },
  });

  const nicknameSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.nickname !== pokemonCaught.nickname) {
      dispatch(changeNickname({ pokemonCaught, nickname: data.nickname }));
      successToast("כינוי שונה בהצלחה");
      setIsOpen(false);
    } else {
      errorToast("כינוי חייב להיות שונה");
    }
  };

  const nicknameErrors = (errors: FieldErrors<FormData>) => {
    if (errors.nickname) {
      errorToast(errors.nickname.message || "אירעה שגיאה");
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      onRequestClose={() => setIsOpen(false)}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={() => setIsOpen(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.row}>
            <Text style={styles.title}>כינוי:</Text>
            <Controller
              control={control}
              name="nickname"
              rules={{
                required: "חובה להזין שם",
                maxLength: { value: 12, message: "לא יותר מ-12 תווים" },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  style={styles.input}
                  placeholder=""
                  keyboardType="default"
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  maxLength={12}
                />
              )}
            />
          </View>
          <View style={styles.row}>
            <Pressable
              style={[styles.button, styles.error]}
              onPress={() => setIsOpen(false)}
            >
              <Text>ביטול</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.submit]}
              onPress={handleSubmit(nicknameSubmit, nicknameErrors)}
            >
              <Text>אישור</Text>
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export { NicknameModal };
