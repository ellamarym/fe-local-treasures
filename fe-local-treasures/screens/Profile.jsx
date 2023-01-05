import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getAuth } from "firebase/auth";
import { globalStyles } from "../styles/globalStyles";
import { textStyles } from "../styles/textStyles";
import { buttons } from "../styles/buttons";
import { userStatsTable } from "./UserStatsTable";


const auth = getAuth();

export default function ProfileScreen({navigation}) {
  const { user } = useAuthentication();
 
  return (
    <View style={globalStyles.container}>
      <Text style={textStyles.oxygenRegLight18}>Welcome {user?.email}!</Text>
      
      <Pressable
        style={buttons.purpleBtnSolid}
        width={150}
        onPress={() => signOut(auth)}
      >
        <Text style={textStyles.oxygenRegLight16}>Sign out</Text>
      </Pressable>
     <Pressable onPress={()=> {
      navigation.navigate("User stats")
     }}><Text>User stats</Text></Pressable>
    
      <StatusBar style="auto" />
    </View>
  );
}
