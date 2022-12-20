import React from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./HomeStack";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  const { user } = useAuthentication();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarLabelPosition: "beside-icon"}}>
        <Tab.Screen
          name="Treasures"
          component={HomeStack}
          options={{ tabBarIcon: () => <Icon name="map" size={16} /> }}
        ></Tab.Screen>
        {user ? (
          <Tab.Screen
            name="Profile"
            component={UserStack}
            options={{ tabBarIcon: () => <Icon name="user" size={16} /> }}
          ></Tab.Screen>
        ) : (
          <Tab.Screen
            name="Log in"
            component={AuthStack}
            options={{ tabBarLabel: 'Log in', tabBarIcon: () => <Icon name="user" size={16}/> }}
          ></Tab.Screen>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
