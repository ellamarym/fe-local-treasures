import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getAllCountries, getAllFlagUrls } from "./api/huntApi";
import { styles } from "../styles/home";
import SvgExternal from "./SvgExternal";
import { textStyles } from "../styles/textStyles";
import { SvgUri } from "react-native-svg";
import { buttons } from "../styles/buttons";

export const FlagQuestions = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [allFlagUrls, setAllFlagUrls] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [flagsLoading, setFlagsLoading] = useState(true);
  const [correctAnswerGiven, setCorrectAnswerGiven] = useState(false);

  let number = Math.floor(Math.random() * 220);
  let random1 = Math.floor(Math.random() * 220);
  let random2 = Math.floor(Math.random() * 220);
  useEffect(() => {
    getAllCountries().then((countries) => {
      setAllCountries(countries);
      setCountriesLoading(false);
    });
    getAllFlagUrls().then((flags) => {
      setAllFlagUrls(flags);
      setFlagsLoading(false);
    });
  }, []);

  let guessArray = [
    allCountries[number],
    allCountries[random1],
    allCountries[random2],
  ];
  guessArray.sort();

  const answerChecker = (answer) => {
    if (answer === allCountries[number]) {
      console.log("correct");
      setCorrectAnswerGiven(true);
    } else {
    }
    //style change for correct or incorrect
    //if wrong, disable button and give another change
    //if correct - action e.g next checkpoint given
  };

  if (correctAnswerGiven) {
    return (
      <View>
        <Text style={textStyles.oxygenRegLight18}>Correct!!!</Text>
      </View>
    );
  } else {
    return (
      <View style={globalStyles.container}>
        <Text style={textStyles.oxygenRegLight18}>hello</Text>

        <SvgUri width={150} height={90} uri={allFlagUrls[number]} />
        <Pressable
          style={buttons.mustardBtnSolid}
          onPress={() => {
            answerChecker(guessArray[0]);
          }}
        >
          <Text>{guessArray[0]}</Text>
        </Pressable>
        <Pressable
          style={buttons.mustardBtnSolid}
          onPress={() => {
            answerChecker(guessArray[1]);
          }}
        >
          <Text>{guessArray[1]}</Text>
        </Pressable>
        <Pressable
          style={buttons.mustardBtnSolid}
          onPress={() => {
            answerChecker(guessArray[2]);
          }}
        >
          <Text>{guessArray[2]}</Text>
        </Pressable>
      </View>
    );
  }
};
