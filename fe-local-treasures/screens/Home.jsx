import React from "react";
import { View, Pressable, Text, Image } from "react-native";
import { Button } from "react-native-elements";

import { styles } from "../styles/home";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Button
        title="Open hunts on map"
        onPress={() => {
          navigation.navigate("Map");
        }}
      />
      <Button
        title="Open hunts on table"
        onPress={() => {
          navigation.navigate("HuntsTable");
        }}
      /> */}
      <Text style={styles.title}>Local Treasures</Text>
      <Text style={styles.subtitle}>/insert really good tag line here/</Text>
      <Image
        style={styles.treasuremap}
        source={require("../assets/treasuremap.png")}
      />

      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("Map");
        }}
      >
        <Text style={styles.text}>See hunts on map</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("HuntsTable");
        }}
      >
        <Text style={styles.text}>See a list of hunts</Text>
      </Pressable>
    </View>
  );
}
