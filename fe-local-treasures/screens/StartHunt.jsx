import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";


export const StartScreen = () => {
    return (
<View style={globalStyles.container}>
    <View>
        <Text>Map!</Text>
    </View>
    <View>
        <Text>question!</Text>
    </View>
    
</View>
    )
}