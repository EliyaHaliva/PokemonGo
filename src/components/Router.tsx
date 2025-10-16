import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SearchScreen} from "../Screens/SearchScreen";
import {InventoryScreen} from "../Screens/InventoryScreen";
import {Header} from "./Header";
import {MaterialIcons} from "@expo/vector-icons"
import {StyleSheet} from "react-native";

const Tab = createBottomTabNavigator();

enum routes {
    SearchScreen = "SearchScreen",
    InventoryScreen = "InventoryScreen",
}

const Router = () => {
    return (
        <NavigationContainer>
            <Header/>
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                    let iconName: "search" | "backpack" = "search";

                    switch (route.name) {
                        case routes.InventoryScreen:
                            iconName = "backpack"
                            break;
                    }

                    return <MaterialIcons name={iconName} size={30} color={color}/>
                },
                headerShown: false,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#808080',
                tabBarShowLabel: false,
                sceneStyle: styles.screen
            })}>
                <Tab.Screen name={routes.SearchScreen} component={SearchScreen}/>
                <Tab.Screen name={routes.InventoryScreen} component={InventoryScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#FFFFFF',
    },
});

export {Router}