import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { fetchHuntById } from "../utils/api/huntApi";
import { useAuthentication } from "../utils/hooks/useAuthentication";

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
    <View style={styles.container}>
      {isLoading ? null : (
        <View>
          <Text style={styles.title}>{hunt.title}</Text>
          <Text style={styles.information}>Location: {hunt.location}</Text>
          <Text style={styles.information}>
            Distance: {hunt.distance} miles
          </Text>
          <Button
            title={user ? "Start" : "Log in to start"}
            disabled={!user}
          ></Button>
        </View>
      )}
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
