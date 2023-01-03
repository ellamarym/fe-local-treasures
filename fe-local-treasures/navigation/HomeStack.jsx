import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import MapScreen from "../screens/Map";
import HuntScreen from "../screens/Hunt";
import { HuntsTable } from "../screens/HuntsTable";
import { StartScreen } from "../screens/StartHunt";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="List" component={HuntsTable} />
      <Stack.Screen name="Hunt" component={HuntScreen} />
      <Stack.Screen name="StartHunt" component={StartScreen} />
    </Stack.Navigator>
  );
}
