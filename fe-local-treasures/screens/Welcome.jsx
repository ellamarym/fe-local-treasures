import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
  },
});
