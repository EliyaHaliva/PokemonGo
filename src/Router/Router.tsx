import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SearchScreen} from "../Screens/Search/SearchScreen";
import {InventoryScreen} from "../Screens/Inventory/InventoryScreen";
import {Header} from "../components/Header/Header";
import {MaterialIcons} from "@expo/vector-icons"
import {routes} from "./routes";
import {styles} from "./Styles";

const Tab = createBottomTabNavigator();

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
                }, tabBarItemStyle: {
                    borderTopWidth: 1,
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

export {Router}