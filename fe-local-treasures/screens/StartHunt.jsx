import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { styles } from "../styles/startHunt";
import { textStyles } from "../styles/textStyles";
import * as Location from "expo-location";
import haversine from "haversine-distance";
import { FlagQuestions } from "../utils/questions";
import { globalStyles } from "../styles/globalStyles";
import { buttons } from "../styles/buttons";
import { formatTime } from "../utils/formatTime";
import ConfettiCannon from "react-native-confetti-cannon";

export const StartScreen = ({ route, navigation }) => {
  const { hunt } = route.params;
  const [currentCheckpoint, setCurrentCheckpoint] = useState(1);
  const [distance, setDistance] = useState(null);
  const [position, setPosition] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const totalCheckpoints = Object.keys(hunt.checkpoints).length;

  const radius = 15;

  useEffect(() => {
    const currentDistance = position
      ? haversine(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          {
            latitude: hunt.checkpoints[currentCheckpoint].lat,
            longitude: hunt.checkpoints[currentCheckpoint].long,
          }
        )
      : null;
    const roundedDistance = Math.round(currentDistance);
    setDistance(roundedDistance);
  }, [currentCheckpoint, position]);

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
        setPosition(() => location);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

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
          <Callout tooltip>
            <View style={buttons.mapCallout}>
              <Text
                style={textStyles.oxygenRegDark14}
              >{`Checkpoint ${i}`}</Text>
            </View>
          </Callout>
        </Marker>
      );
    }
    return markers;
  };

  const circles = () => {
    const circles = [];
    for (let i = 1; i <= currentCheckpoint; i++) {
      circles.push(
        <Circle
          key={i}
          center={{
            latitude: hunt.checkpoints[i].lat,
            longitude: hunt.checkpoints[i].long,
          }}
          radius={radius}
          fillColor={"rgba(50,133,200,0.2)"}
          strokeColor={"rgba(50,133,200,1)"}
        ></Circle>
      );
    }
    return circles;
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
          {circles()}
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
            </Text>
          </View>
        </View>
        {FlagQuestions({
          totalCheckpoints,
          currentCheckpoint,
          setCurrentCheckpoint,
          setIsActive,
          distance,
          seconds,
          navigation,
          radius,
        })}
      </View>
    </ScrollView>
  );
};
