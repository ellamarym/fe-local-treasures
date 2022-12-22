import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useAuthentication } from "../utils/hooks/useAuthentication";

export default function HuntScreen({ route }) {
  const { title, location, distance } = route.params;
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.information}>Location: {location}</Text>
      <Text style={styles.information}>Distance: {distance} miles</Text>
      <Button
        title={user ? "Start" : "Log in to start"}
        disabled={!user}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    margin: 5,
  },
  information: {
    margin: 5,
  },
});
