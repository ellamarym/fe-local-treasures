import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {styles} from '../styles/signInScreen'

const auth = getAuth();

export default function SignInScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (userInfo.email === "" || userInfo.password === "") {
      setUserInfo({ ...userInfo, error: "Email and password are mandatory" });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
    } catch (error) {
      setUserInfo({ ...userInfo, error: 'Invalid login credentials' });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Input
          placeholder="Email"
          containerStyle={styles.control}
          value={userInfo.email}
          onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
          leftIcon={<Icon name="envelope" size={16} />}
        />
        <Input
          placeholder="Password"
          containerStyle={styles.control}
          value={userInfo.password}
          onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={16} />}
        />
        {userInfo.error ? (
          <View style={styles.error}>
            <Text style={styles.error}>{userInfo.error}</Text>
          </View>
        ) : null}
        <Text
          style={styles.forgotPassNav}
          onPress={() => {
            navigation.navigate("Forgot Password");
          }}
        > Forgot password?</Text>
        <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
      </View>      
      <StatusBar style="auto" />
    </View>
  );
}


