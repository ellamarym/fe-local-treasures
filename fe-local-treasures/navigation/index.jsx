import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeTabs from "./HomeTabs";
import { customTheme } from "../styles/customTheme";
import { StartScreen } from "../screens/StartHunt";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer theme={customTheme}>
      <StatusBar style="light" translucent={false} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="StartHunt" component={StartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
