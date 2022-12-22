import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import {styles} from '../styles/home'

export default function HomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Button title="Open hunts on map" onPress={() => {navigation.navigate("Map")}}/>
      <Button title="Open hunts on table" onPress={() => {navigation.navigate("HuntsTable")}}/>
    </View>
  );
}

