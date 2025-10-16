import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            <Text style={styles.text}>שלום, אליה</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#9dceff',
        width: '100%',
        height: '10%',
    },
    logo: {
        marginRight: 10,
        width: 50,
        height: 50,
    },
    text: {
        fontSize: 20,
    }
})

export default Header;
