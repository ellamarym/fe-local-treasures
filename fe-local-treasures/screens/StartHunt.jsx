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

export const StartScreen = ({ route, navigation }) => {
  const { hunt } = route.params;
  const [currentCheckpoint, setCurrentCheckpoint] = useState(1);
  const [distance, setDistance] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [inRange, setInRange] = useState(false);
  const totalCheckpoints = Object.keys(hunt.checkpoints).length;

  useEffect(() => {
    setDistance(null);
    setInRange(false);
  }, [currentCheckpoint]);

  useEffect(() => {
    const interval = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      if (isActive) {
        setSeconds((seconds) => seconds + 1);
        let location = await Location.getCurrentPositionAsync({});
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
        if (distance < 100 && distance) {
          //console.log(distance);

          setInRange(true);
          //console.log('in distance ifffffffffffff');
          //console.log(inRange);
        }
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (secs) => {
    var hours = Math.floor(secs / 3600);
    var minutes = Math.floor(secs / 60) % 60;
    var seconds = secs % 60;

    return [hours, minutes, seconds]
      .map((el) => (el < 10 ? "0" + el : el))
      .filter((el, i) => el !== "00" || i > 0)
      .join(":");
  };

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
                    text: "OK",
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
          </Pressable>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <Text style={textStyles.oxygenRegLight16}>Checkpoint</Text>
            <Text style={textStyles.oxygenBoldLight24}>
              {currentCheckpoint} of {totalCheckpoints}
            </Text>
          </View>
          <View style={styles.stats}>
            <Text style={textStyles.oxygenRegLight16}>Next Stop</Text>
            <Text style={textStyles.oxygenBoldLight24}>
              {distance ? distance : "- "}m
            </Text>
          </View>
          <View style={styles.stats}>
            <Text style={textStyles.oxygenRegLight16}>Time</Text>
            <Text style={textStyles.oxygenBoldLight24}>
              {formatTime(seconds)}
              <Text style={textStyles.oxygenRegLight16}>Z: {inRange}</Text>
            </Text>
          </View>
        </View>
        {FlagQuestions({
          totalCheckpoints,
          currentCheckpoint,
          setCurrentCheckpoint,
          setIsActive,
          inRange,
          setInRange,
          distance,
        })}
      </View>
    </ScrollView>
  );
};
