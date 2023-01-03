import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getAllCountries, getAllFlagUrls } from "./api/huntApi";
import { styles } from "../styles/home";


export const FlagQuestions = () => {
   const [allCountries, setAllCountries] = useState([])
  const [allFlagUrls, setAllFlagUrls] = useState([])
  const [countriesLoading, setCountriesLoading] = useState(true)
  const [flagsLoading, setFlagsLoading] = useState(true)


  const number = Math.floor(Math.random() * 220);
  const random1 = Math.floor(Math.random() * 220)
  const random2 = Math.floor(Math.random() * 220)
  useEffect(()=> {
    getAllCountries().then((countries)=> {
      setAllCountries(countries)
      setCountriesLoading(false)
    })
    getAllFlagUrls().then((flags) => {
        setAllFlagUrls(flags)
      setFlagsLoading(false)
    })
  },[])
  
  const guessArray = [allCountries[number], allCountries[random1], allCountries[random2]]
  guessArray.sort()
 
    return (
    <View style={globalStyles.container}>
    <Text>hello</Text>
    <Image
       
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_the_Turks_and_Caicos_Islands.svg',
        }}
      />
    </View>
  );
  
  
}