import React, {useState} from 'react'
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from 'react-native'
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

var auth = getAuth();

export default function ForgotPassword (){
 
  const [userEmail, setUserEmail] = useState({
    email: "",
    error: "",
  });
 async function forgotPassword() {
  if (userEmail.email === "") {
        setUserEmail({ ...userEmail, error: "Email is mandatory" });
        return;
      }
      try{
        await sendPasswordResetEmail(auth, userEmail.email).then(()=> {  
          alert(`password reset email sent to ${userEmail.email}`)
          })
      }catch(err){
        setUserEmail({ ...userEmail, error:  "Error: Try again"});
      }
}

    return (
      <View style={styles.container}>
      <View style={styles.controls}>
        <Input
          placeholder="Email"
          containerStyle={styles.control}
          value={userEmail.email}
          onChangeText={(text) => setUserEmail({ ...userEmail, email: text })}
          leftIcon={<Icon name="envelope" size={16} />}
        />
        {userEmail.error ? (
          <View style={styles.error}>
            <Text style={styles.error}>{userEmail.error}</Text>
          </View>
        ) : null}
        <Button title="Send email" buttonStyle={styles.control} onPress={forgotPassword}/>
      </View>      
      <StatusBar style="auto" />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      controls: {
        flex: 1,
        width: "80%",
        justifyContent: "center",
      },
      error: {
        color: 'red',
        alignItems: "center"
      },
      control: {
        marginTop: 10,
      },
})