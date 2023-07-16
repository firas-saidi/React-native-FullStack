import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteMoviesScreen from "./screens/FavoriteMoviesScreen";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from the "@expo/vector-icons" package

import { FavoriteMoviesProvider } from "./contexts/FavoriteMoviesContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home " component={HomeScreen}  options={{
          headerTitleAlign: "center", // Center aligns the header title
        }}/>
      <Stack.Screen name="Details" component={MovieScreen} options={{
          headerTitleAlign: "center", // Center aligns the header title
        }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <FavoriteMoviesProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStack}  options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Favorites" component={FavoriteMoviesScreen} options={{ headerTitleAlign: "center", // Center aligns the header title
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoriteMoviesProvider>
  );
}
