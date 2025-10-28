import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Header } from "../components/Header/Header";
import { routes } from "../enums/Routes.enum";
import { InventoryScreen } from "../screens/InventoryScreen/InventoryScreen";
import { SearchScreen } from "../screens/SearchScreen/SearchScreen";
import { styles } from "./Styles";

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name={route.name === routes.SearchScreen ? "search" : "backpack"}
              size={30}
              color={color}
            />
          ),
          headerShown: false,
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#808080",
          tabBarShowLabel: false,
          sceneStyle: styles.screen,
        })}
      >
        <Tab.Screen
          name={routes.SearchScreen}
          component={SearchScreen}
          options={{
            tabBarItemStyle: {
              borderRightWidth: 1,
              borderTopWidth: 1,
            },
          }}
        />
        <Tab.Screen
          name={routes.InventoryScreen}
          component={InventoryScreen}
          options={{
            tabBarItemStyle: {
              borderTopWidth: 1,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { Router };
