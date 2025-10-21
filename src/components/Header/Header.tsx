import React from 'react'
import {Image, StatusBar, Text, View} from 'react-native';
import {styles} from './Styles';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
            <StatusBar hidden={true}/>
            <Image style={styles.logo} source={require('../../../assets/logo.png')}/>
            <Text style={styles.text}>שלום, אליה</Text>
        </View>
    )
}

export {Header};
