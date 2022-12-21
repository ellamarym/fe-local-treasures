import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import {styles} from '../styles/welcome'

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.buttons}>
        <Button
          title="Sign In"
          buttonStyle={styles.button}
          onPress={() => {
            navigation.navigate("Sign In");
          }}
        />
        <Button
          title="Sign Up"
          type="outline"
          buttonStyle={styles.button}
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        />
      </View>
    </View>
  );
}


