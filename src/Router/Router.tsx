import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SearchScreen} from "../Screens/SearchScreen/Index";
import {InventoryScreen} from "../Screens/InventoryScreen/Index";
import {Header} from "../components/Header/Index";
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
                },
                headerShown: false,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#808080',
                tabBarShowLabel: false,
                sceneStyle: styles.screen
            })}>
                <Tab.Screen name={routes.SearchScreen} component={SearchScreen} options={{
                    tabBarItemStyle: {
                        borderRightWidth: 1,
                        borderTopWidth: 1
                    }
                }}/>
                <Tab.Screen name={routes.InventoryScreen} component={InventoryScreen} options={{
                    tabBarItemStyle: {
                        borderTopWidth: 1
                    }
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export {Router}