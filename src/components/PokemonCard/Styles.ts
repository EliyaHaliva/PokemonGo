import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    cardContainer: {
        width: '40%',
        margin: '3%',
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#808080',
        padding: 5,
    },
    centeredFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    name: {
        fontSize: 15,
        color: '#808080',
    },
    nicknameContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        width: '100%',
    },
    editIcon: {
        borderRadius: 25,
        color: '#FFFFFF',
        backgroundColor: '#5385dd',
        padding: 2,
    },
    nickname: {
        fontSize: 20,
    }
})