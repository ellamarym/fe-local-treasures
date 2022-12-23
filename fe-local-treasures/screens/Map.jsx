import { styles } from "../styles/map";
import { globalStyles } from "../styles/globalStyles";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { fetchHunts } from "../utils/api/huntApi";
import * as Location from "expo-location";

export default function MapScreen({ navigation }) {
  const [hunts, setHunts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState({
    latitude: 53.4576,
    longitude: -2.1578,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });

  useEffect(() => {
    fetchHunts().then((fetchedHunts) => {
      setHunts(fetchedHunts);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const huntMarkers = () => {
    return hunts.map((hunt) => (
      <Marker
        key={hunt.id}
        coordinate={{
          latitude: hunt.startPoint.lat,
          longitude: hunt.startPoint.long,
        }}
      >
        <Callout
          onPress={() =>
            navigation.navigate("Hunt", {
              id: hunt.id,
            })
          }
          style={styles.callout}
        >
          <Text>{hunt.title}</Text>
          <Icon name="arrow-right" style={styles.calloutIcon}></Icon>
        </Callout>
      </Marker>
    ));
  };

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
        initialRegion={region}
      >
        {isLoading ? null : huntMarkers()}
      </MapView>
      <View style={globalStyles.switchButtonView}>
        <Pressable
          style={globalStyles.switchButton}
          onPress={() => {
            navigation.navigate("List");
          }}
        >
          <Text>View List</Text>
          <Icon name="list" style={styles.calloutIcon}></Icon>
        </Pressable>
      </View>
    </View>
  );
}
