import React, { useEffect, useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import { fetchHuntById } from "../utils/api/huntApi";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { buttons } from "../styles/buttons";
import { textStyles } from "../styles/textStyles";
import { globalStyles } from "../styles/globalStyles";
import { styles } from "../styles/home";
import { huntStyles } from "../styles/hunt";

export default function HuntScreen({ route, navigation }) {
  const { id } = route.params;
  const { user } = useAuthentication();

  const [hunt, setHunt] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHuntById(id).then((fetchedHunt) => {
      setHunt(fetchedHunt);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={huntStyles.container}>
      {isLoading ? null : (
        <View>
          <Image
            style={huntStyles.treasuremap}
            source={require("../assets/treasuremap.png")}
          />
          <Text style={textStyles.titleSmall}>{hunt.title}</Text>
          <Text style={textStyles.oxygenRegLight18}>
            Location: {hunt.location}
          </Text>
          <Text style={textStyles.oxygenRegLight18}>
            Distance: {hunt.distance} checkpoints
          </Text>
          <View height={20}></View>
          <Pressable
            style={buttons.mustardBtnSolid}
            disabled={!user}
            onPress={() => {
              navigation.navigate("StartHunt", { hunt: hunt });
            }}
          >
            <Text style={textStyles.oxygenRegDark18}>
              {user ? "Start!" : "Log in to start"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
