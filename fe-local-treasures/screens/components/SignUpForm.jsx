import React from "react";
import { styles } from "../../styles/signupScreens";
import ImageViewer from "../ImageViewer";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

function SignUpForm({
  userInfo,
  setUserInfo,
  uploadProgress,
  progressBar,
  selectedImage,
  pickImage,
  signUp,
}) {
  return (
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
        <View style={styles.textCenter}>
          {uploadProgress ? (
            <Text style={progressBar < 100 ? styles.inProgress : styles.done}>
              {uploadProgress}
            </Text>
          ) : null}
        </View>
        <ImageViewer selectedImage={selectedImage} />
      </View>
      <Button
        title="Choose photo"
        buttonStyle={styles.btnUplodImg}
        onPress={pickImage}
      ></Button>
      {userInfo.error ? (
        <View style={styles.textCenter}>
          <Text style={styles.error}>{userInfo.error}</Text>
        </View>
      ) : null}
      <Button
        title="Sign Up"
        buttonStyle={styles.control}
        onPress={signUp}
      ></Button>
    </View>
  );
}

export default SignUpForm;
