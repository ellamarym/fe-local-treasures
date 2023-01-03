import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getAuth } from "firebase/auth";
import { globalStyles } from "../styles/globalStyles";
import { textStyles } from "../styles/textStyles";
import { buttons } from "../styles/buttons";

const auth = getAuth();

export default function ProfileScreen() {
  const { user } = useAuthentication();

  return (
    <View style={globalStyles.container}>
      <Text style={textStyles.oxygenRegLight18}>Welcome {user?.email}!</Text>
      <Button
        title="Sign out"
        style={buttons.purpleBtnSolid}
        onPress={() => signOut(auth)}
      />
      <StatusBar style="auto" />
    </View>
  );
}
