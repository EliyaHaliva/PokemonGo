import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    cardContainer: {
        width: '40%',              // 2 cards per row (with space)
        height: '25%',
        margin: '3%',            // small spacing around cards
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
    },
    centeredFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 15,
        color: '#808080',
    },
    nickname: {
        fontSize: 20,
    }
})