import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { styles } from "../styles/startHunt";
import { textStyles } from "../styles/textStyles";
import * as Location from "expo-location";
import haversine from "haversine-distance";
import { FlagQuestions } from "../utils/questions";
import { globalStyles } from "../styles/globalStyles";
import { buttons } from "../styles/buttons";
import Icon from "react-native-vector-icons/FontAwesome";

export const StartScreen = ({ route, navigation }) => {
  const { hunt } = route.params;
  const [currentCheckpoint, setCurrentCheckpoint] = useState(1);
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  function toggle() {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const timeInMinutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;

  useEffect(() => {
    const interval = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDistance = location
        ? haversine(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            {
              latitude: hunt.checkpoints[currentCheckpoint].lat,
              longitude: hunt.checkpoints[currentCheckpoint].long,
            }
          )
        : null;
      const roundedDistance = Math.round(currentDistance);
      setDistance(roundedDistance);
    }, 2000);
    return () => clearInterval(interval);
  }, [location]);

  const huntMarkers = () => {
    const markers = [];
    for (let i = 1; i <= currentCheckpoint; i++) {
      markers.push(
        <Marker
          key={i}
          coordinate={{
            latitude: hunt.checkpoints[i].lat,
            longitude: hunt.checkpoints[i].long,
          }}
          pinColor={i === currentCheckpoint ? "red" : "green"}
        >
          <Callout style={styles.callout}>
            <Text>{`Checkpoint ${i}`}</Text>
          </Callout>
        </Marker>
      );
    }
    return markers;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={styles.map}
          initialRegion={{
            latitude: hunt.checkpoints[1].lat,
            longitude: hunt.checkpoints[1].long,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {huntMarkers()}
        </MapView>
        <View style={globalStyles.switchButtonCenter}>
          <Pressable
            style={buttons.exitBtnSolid}
            onPress={() => {
              Alert.alert(
                "Exit",
                "Exiting will lose all your progress. Are you sure?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                  },
                  {
                    title: "OK",
                    onPress: () => {
                      navigation.navigate("Home");
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
          >
            <Text style={textStyles.oxygenRegLight16}>Exit</Text>
            <Icon name="close" style={styles.calloutIcon}></Icon>
          </Pressable>
        </View>
        <View>
          <Text style={textStyles.oxygenRegLight18}>
            Distance from next checkpoint:
            {location ? distance : null}m
          </Text>
          <Text style={textStyles.oxygenRegLight18}>
            Time: {timeInMinutes}:{secondsRemaining}
          </Text>
        </View>
        {FlagQuestions()}
      </View>
    </ScrollView>
  );
};
