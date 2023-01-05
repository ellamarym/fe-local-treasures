import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile";
import { UserStatsTable } from "../screens/UserStatsTable";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Profile" component={ProfileScreen} />
      <Stack.Screen name="User stats" component={UserStatsTable} />

    </Stack.Navigator>
  );
}
