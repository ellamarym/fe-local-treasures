import React from "react";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import Icon from "react-native-vector-icons/FontAwesome";
import { textStyles } from "../styles/textStyles";
import HuntStack from "./HuntStack";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { user } = useAuthentication();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
      }}
    >
      <Tab.Screen
        name="Hunts"
        component={HuntStack}
        options={{
          tabBarIcon: () => (
            <Icon name="map" style={textStyles.oxygenRegLight16} />
          ),
        }}
      ></Tab.Screen>
      {user ? (
        <Tab.Screen
          name="Profile"
          component={UserStack}
          options={{
            tabBarIcon: () => (
              <Icon name="user" style={textStyles.oxygenRegLight16} />
            ),
          }}
        ></Tab.Screen>
      ) : (
        <Tab.Screen
          name="Log in"
          component={AuthStack}
          options={{
            tabBarLabel: "Log in",
            tabBarIcon: () => (
              <Icon name="user" style={textStyles.oxygenRegLight16} />
            ),
          }}
        ></Tab.Screen>
      )}
    </Tab.Navigator>
  );
}
