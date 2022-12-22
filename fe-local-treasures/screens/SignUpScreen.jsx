import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import {styles} from '../styles/signupScreens'


import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import "firebase/auth";
import ImageViewer from "./ImageViewer";


const auth = getAuth();

export default function SignUpScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
  });

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  function signUp() {
    if (userInfo.email === "" || userInfo.password === "" || 
    userInfo.username === "", userInfo.firstname === "" || 
    userInfo.lastname === "") {
      setUserInfo({ ...userInfo, error: "All fields are required" });
      return;
    }
    console.log("userInfo", userInfo)
    // try {
    //   await createUserWithEmailAndPassword(
    //     auth,
    //     userInfo.email,
    //     userInfo.password,
    //     userInfo.username,
    //     userInfo.firstname,
    //     userInfo.lastname
    //   );
    //   navigation.navigate("Sign In");
    // } catch (err) {
    //   setUserInfo({ ...userInfo, error: err.message });
    // }

    setUserInfo({ ...userInfo, error: "" });
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.controls}>
      <Input
          placeholder="username"
          containerStyle={styles.control}
          value={userInfo.username}
          onChangeText={(text) => {
            setUserInfo({ ...userInfo, username: text });
          }}
          leftIcon={<Icon name="user" size={16} />}
        />
        <Input
          placeholder="firstname"
          containerStyle={styles.control}
          value={userInfo.firstname}
          onChangeText={(text) => {
            setUserInfo({ ...userInfo, firstname: text });
          }}
          leftIcon={<Icon name="user" size={16} />}
        />
        <Input
          placeholder="lastname"
          containerStyle={styles.control}
          value={userInfo.lastname}
          onChangeText={(text) => {
            setUserInfo({ ...userInfo, lastname: text });
          }}
          leftIcon={<Icon name="user" size={16} />}
        />
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
        <View style={styles.imageContainer}>
        <ImageViewer
          selectedImage={selectedImage}
        />
      </View>
        <Button
          title="Choose photo"
          buttonStyle={styles.btnUplodImg}
          onPress={pickImageAsync}
        ></Button>
        <Text>{console.log("selectedImage", selectedImage)}</Text>
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
      
      <StatusBar style="auto" />
    </View>
    </ScrollView>
  );
}