import React from "react";
import { styles } from "../../styles/signupScreens";
import { textStyles } from "../../styles/textStyles";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

function SignUpForm({ userInfo, setUserInfo, signUp }) {
  return (
    <View style={styles.controls}>
      <Input
        placeholder="Username"
        style={styles.control}
        value={userInfo.username}
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, username: text });
        }}
        leftIcon={
          <Icon name="user" size={16} style={textStyles.oxygenRegLight16} />
        }
      />
      <Input
        placeholder="First Name"
        style={styles.control}
        value={userInfo.firstname}
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, firstname: text });
        }}
        leftIcon={
          <Icon name="user" size={16} style={textStyles.oxygenRegLight16} />
        }
      />
      <Input
        placeholder="Last Name"
        style={styles.control}
        value={userInfo.lastname}
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, lastname: text });
        }}
        leftIcon={
          <Icon name="user" size={16} style={textStyles.oxygenRegLight16} />
        }
      />
      <Input
        placeholder="Email"
        style={styles.control}
        value={userInfo.email}
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, email: text });
        }}
        leftIcon={
          <Icon name="envelope" size={16} style={textStyles.oxygenRegLight16} />
        }
      />
      <Input
        placeholder="Password"
        style={styles.control}
        value={userInfo.password}
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, password: text });
        }}
        secureTextEntry={true}
        leftIcon={
          <Icon name="key" size={16} style={textStyles.oxygenRegLight16} />
        }
      />
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
