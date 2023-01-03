import React from "react";
import { styles } from "../../styles/signInScreen";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

function SigninForm({ userInfo, navigation, setUserInfo, signIn }) {
  return (
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
      >
        Forgot password?
      </Text>
      <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
    </View>
  );
}

export default SigninForm;
