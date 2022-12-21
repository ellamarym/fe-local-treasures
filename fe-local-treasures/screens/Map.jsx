import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import {styles} from '../styles/map'

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 53.4576,
          longitude: -2.1578,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      />
    </View>
  );
}


