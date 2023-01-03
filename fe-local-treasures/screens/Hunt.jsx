import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { fetchHuntById } from "../utils/api/huntApi";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { buttons } from "../styles/buttons";
import { textStyles } from "../styles/textStyles";
import { globalStyles } from "../styles/globalStyles";

export default function HuntScreen({ route }) {
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
    <View style={globalStyles.container}>
      {isLoading ? null : (
        <View>
          <Text style={textStyles.titleSmall}>{hunt.title}</Text>
          <Text style={textStyles.oxygenRegLight18}>
            Location: {hunt.location}
          </Text>
          <Text style={textStyles.oxygenRegLight18}>
            Distance: {hunt.distance} miles
          </Text>

          <Pressable style={buttons.purpleBtnSolid} disabled={!user}>
            <Text style={textStyles.oxygenRegLight16}>
              {user ? "Start" : "Log in to start"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
