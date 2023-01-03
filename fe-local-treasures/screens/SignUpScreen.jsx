import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles/signupScreens";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import SignUpForm from "./components/SignUpForm";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export default function SignUpScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    imgUrl: "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", selectedImage, true);
        xhr.send(null);
      });

      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      const storageRef = ref(storage, "User/" + Date.now());
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress("Upload is " + progress + "% done");
          setProgressBar(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            // ...
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUserInfo({ ...userInfo, imgUrl: downloadURL });
            console.log("File available at", downloadURL);
          });
        }
      );
    };

    if (selectedImage !== null) {
      uploadImage();
    }
  }, [selectedImage]);

  async function signUp() {
    if (
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.username === "" ||
      userInfo.firstname === "" ||
      userInfo.lastname === "" ||
      userInfo.imgUrl === ""
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
      setUserInfo({ ...userInfo, error: err.message });
    }
    setUserInfo({ ...userInfo, error: "" });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <SignUpForm
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          uploadProgress={uploadProgress}
          progressBar={progressBar}
          selectedImage={selectedImage}
          pickImage={pickImage}
          signUp={signUp}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        ></View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
