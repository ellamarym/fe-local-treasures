import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeTabs from "./HomeTabs";
import { customTheme } from "../styles/customTheme";
import { StartScreen } from "../screens/StartHunt";

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer theme={customTheme}>
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
