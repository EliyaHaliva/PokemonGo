import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screenContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: 20,
        paddingBottom: 100,
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        gap: 2
    },
    searchContainer: {
        width: '70%',
        height: 50,
    },
    emptyBagContainer: {
        marginBottom: 200
    },
    catchGif: {
        width: 400,
        height: 400,
    },
    noPokemonsTitle: {
        alignSelf: 'center',
        fontSize: 30,
    }
});