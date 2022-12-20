import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function HomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Button title="Open map" onPress={() => {navigation.navigate("Map")}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});