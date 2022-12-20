import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile";

import HomeScreen from "../screens/Home";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
