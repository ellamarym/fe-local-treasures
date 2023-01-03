import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { globalStyles } from "../styles/globalStyles";
import { buttons } from "../styles/buttons";

export default function Welcome({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <StatusBar style="auto" />
      <View>
        <Button
          title="Sign In"
          buttonStyle={buttons.purpleBtnSolid}
          onPress={() => {
            navigation.navigate("Sign In");
          }}
        />

        <Button
          title="Sign Up"
          buttonStyle={buttons.purpleBtnBorder}
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        />
      </View>
    </View>
  );
}
