import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { FlagQuestions } from "../utils/questions";


export const StartScreen = () => {
    return (
<View style={globalStyles.container}>
    <View>
        <Text>Map!</Text>
    </View>
    
       {FlagQuestions()}
    
    
</View>
    )
}