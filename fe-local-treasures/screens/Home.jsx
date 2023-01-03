import React from "react";
import { View, Pressable, Text, Image } from "react-native";
import { styles } from "../styles/home";
import { buttons } from "../styles/buttons";
import { textStyles } from "../styles/textStyles";
import { globalStyles } from "../styles/globalStyles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text style={[styles.title]}>Local Treasures</Text>
      <Text style={[styles.subtitle]}>/insert really good tag line here/</Text>
      <Image
        style={styles.treasuremap}
        source={require("../assets/treasuremap.png")}
      />

      <Pressable
        style={buttons.mustardBtnSolid}
        onPress={() => {
          navigation.navigate("Map");
        }}
      >
        <Text style={[textStyles.oxygenRegDark16]}>See hunts on map</Text>
      </Pressable>

      <Pressable
        style={buttons.mustardBtnSolid}
        onPress={() => {
          navigation.navigate("List");
        }}
      >
        <Text style={[styles.text, textStyles.oxygenRegDark16]}>
          See a list of hunts
        </Text>
      </Pressable>
    </View>
  );
}
