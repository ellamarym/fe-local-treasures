import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, ScrollView } from "react-native";
import { styles } from "../styles/signupScreens";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/auth";
import SignUpForm from "./components/SignUpForm";

const auth = getAuth();

export default function SignUpScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    imgUrl: "",
  });

  async function signUp() {
    if (
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.username === "" ||
      userInfo.firstname === "" ||
      userInfo.lastname === ""
    ) {
      setUserInfo({ ...userInfo, error: "All fields are required" });
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      navigation.navigate("Sign In");
    } catch (err) {
      if (err) {
        setUserInfo({ ...userInfo, error: err.message.toString() });
        return;
      }
    }
    setUserInfo({ ...userInfo, error: "" });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <SignUpForm
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          signUp={signUp}
        />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
