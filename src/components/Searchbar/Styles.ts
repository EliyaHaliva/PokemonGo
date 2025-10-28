import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    searchWrapper: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        flexDirection: 'row-reverse',
        width: '50%',
        borderStyle: "solid",
        borderBottomWidth: 1,
    },
    inputContainer: {
        flex: 1,
        direction: "ltr",
        fontSize: 20,
    },
    icon: {
        fontSize: 45,
    },
});