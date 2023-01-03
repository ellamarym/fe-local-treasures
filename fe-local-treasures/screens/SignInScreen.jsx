import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { styles } from "../styles/signInScreen";
import SigninForm from "./components/SigninForm";

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
      setUserInfo({ ...userInfo, error: "Invalid login credentials" });
    }
  }

  return (
    <View style={styles.container}>
      <SigninForm
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        navigation={navigation}
        signIn={signIn}
      />
      <StatusBar style="auto" />
    </View>
  );
}
