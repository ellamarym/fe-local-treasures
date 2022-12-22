import {styles} from '../styles/map'
import React, { useEffect } from "react";
import {View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { fetchHunts } from "../utils/api/huntApi";
import { useState } from "react";
import { Button } from 'react-native-elements';


export default function MapScreen({ navigation }) {
  const [hunts, setHunts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHunts().then((fetchedHunts) => {
      setHunts(fetchedHunts);
      setIsLoading(false);
    });
  }, []);

  const huntMarkers = () => {
    return hunts.map((hunt) => (
      <Marker
        key={hunt._id}
        coordinate={{
          latitude: hunt.checkpoints[1].lat,
          longitude: hunt.checkpoints[1].long,
        }}
      >
        <Callout
          onPress={() =>
            navigation.navigate("Hunt", {
              id: hunt.title,
              title: hunt.title,
              location: hunt.location,
              distance: hunt.distance,
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
      <Button title="Switch to table view" onPress={() => {navigation.navigate("HuntsTable")}}/>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
        initialRegion={{
          latitude: 53.4576,
          longitude: -2.1578,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {isLoading ? null : huntMarkers()}
      </MapView>
    </View>
  );
}
