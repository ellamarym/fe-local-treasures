import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth } from 'firebase/auth';
import {styles} from '../styles/welcome'

const auth = getAuth();

export default function ProfileScreen() {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email}!</Text>
      <Button
        title="Sign out"
        style={styles.button}
        onPress={() => signOut(auth)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

