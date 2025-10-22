import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    screenContainer: {
        gap: 20,
    },
    centeredFlex: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        alignSelf: "center",
        fontSize: 30,
    },
    imageContainer: {
        height: 275,
    },
    describeContainer: {
        borderTopWidth: 1,
        borderTopColor: '#808080',
        width: "100%",
        height: 100,
    },
    directionRowContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    roundedDetails: {
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: 20,
        minWidth: 120,
        paddingHorizontal: 10,
        minHeight: 40,
        backgroundColor: "#969696",
    },
    detailsText: {
        fontSize: 25,
        color: "#FFFFFF",
    },
    catchContainer: {
        flexDirection: "row",
        marginTop: 20,
        width: 200,
        height: 65,
        borderRadius: 50,
        gap: 5,
        backgroundColor: "#9dceff",
    },
    pokeImage: {
        width: 40,
        height: 40,
    },
    loader: {
        alignSelf: "center",
        height: 200,
        width: 200
    }
});