import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { styles } from "../styles/startHunt";
import { textStyles } from "../styles/textStyles";
import * as Location from "expo-location";
import haversine from "haversine-distance";

export const StartScreen = ({ route }) => {
  const { hunt } = route.params;
  const [currentCheckpoint, setCurrentCheckpoint] = useState(1);
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log({ location });
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
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
      <View>
        <Text style={textStyles.oxygenRegLight18}>
          Distance from next checkpoint:
          {location ? distance : null}m
        </Text>
      </View>
    </View>
  );
};
