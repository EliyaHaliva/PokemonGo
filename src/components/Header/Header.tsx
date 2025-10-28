import React from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { styles } from "./Styles";

const logo = require("../../../assets/logo.png");

const Header = () => (
  <View style={styles.headerContainer}>
    <StatusBar hidden={true} />
    <Image style={styles.logo} source={logo} />
    <Text style={styles.text}>שלום, אליה</Text>
  </View>
);

export { Header };
