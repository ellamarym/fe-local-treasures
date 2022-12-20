import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "firebase/auth";


const auth = getAuth();

export default function SignUpScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function signUp() {
    if (userInfo.email === "" || userInfo.password === "") {
      setUserInfo({ ...userInfo, error: "Email and password are mandatory" });
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
      setUserInfo({ ...userInfo, error: err.message });
    }

    setUserInfo({ ...userInfo, error: "" });
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Input
          placeholder="Email"
          containerStyle={styles.control}
          value={userInfo.email}
          onChangeText={(text) => {
            setUserInfo({ ...userInfo, email: text });
          }}
          leftIcon={<Icon name="envelope" size={16} />}
        />
        <Input
          placeholder="Password"
          containerStyle={styles.control}
          value={userInfo.password}
          onChangeText={(text) => {
            setUserInfo({ ...userInfo, password: text });
          }}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={16} />}
        />
        {userInfo.error ? (
          <View style={styles.error}>
            <Text style={styles.error}>{userInfo.error}</Text>
          </View>
        ) : null}
        <Button
          title="Sign Up"
          buttonStyle={styles.control}
          onPress={signUp}
        ></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  error: {
    alignItems: "center",
    color: "red",
  },
  controls: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
  },
  control: {
    marginTop: 10,
  },
});
