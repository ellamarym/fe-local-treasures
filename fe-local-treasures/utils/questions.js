import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getAllCountries, getAllFlagUrls } from "./api/huntApi";
import { styles } from "../styles/home";
import SvgExternal from "./SvgExternal";
import { textStyles } from "../styles/textStyles";
import { SvgUri } from "react-native-svg";
import { buttons } from "../styles/buttons";
import { questionStyles } from "../styles/questionStyles";

export const FlagQuestions = ({
  totalCheckpoints,
  currentCheckpoint,
  setCurrentCheckpoint,
  setIsActive,
}) => {
  const [allCountries, setAllCountries] = useState([]);
  const [allFlagUrls, setAllFlagUrls] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [flagsLoading, setFlagsLoading] = useState(true);
  const [correctAnswerGiven, setCorrectAnswerGiven] = useState(false);
  const [answerGiven, setAnswerGiven] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [number, setNumber] = useState(0);
  const [random1, setRandom1] = useState(0);
  const [random2, setRandom2] = useState(0);

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

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 220));
    setRandom1(Math.floor(Math.random() * 220));
    setRandom2(Math.floor(Math.random() * 220));
  }, [answerGiven]);

  let guessArray = [
    allCountries[number],
    allCountries[random1],
    allCountries[random2],
  ];
  guessArray.sort();

  const answerChecker = (answer) => {
    setAnswerGiven(true);
    if (answer === allCountries[number]) {
      setCorrectAnswerGiven(true);
    } else {
    }
    //style change for correct or incorrect
    //if wrong, disable button and give another change
    //if correct - action e.g next checkpoint given
  };

  useEffect(() => {
    if (currentCheckpoint === totalCheckpoints) {
      setIsActive(false);
      setIsGameOver(true);
    }
  }, [currentCheckpoint]);

  if (isGameOver) {
    return (
      <View>
        <Text style={textStyles.oxygenRegLight18}>You win!</Text>
      </View>
    );
  }

  if (answerGiven) {
    return (
      <View>
        <Text style={textStyles.oxygenRegLight18}>
          {correctAnswerGiven ? "Correct!" : "Incorrect"}
        </Text>
        <Pressable
          style={buttons.mustardBtnSolid}
          onPress={() => {
            if (correctAnswerGiven) {
              setCurrentCheckpoint((curr) => curr + 1);
            }

            setAnswerGiven(false), setCorrectAnswerGiven(false);
          }}
        >
          <Text>{correctAnswerGiven ? "Next Checkpoint" : "New Question"}</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={questionStyles.container}>
        <Text style={textStyles.oxygenBoldLight18}>Whose flag is this?</Text>
        <SvgUri
          width={150}
          height={90}
          marginVertical={20}
          uri={allFlagUrls[number]}
        />
        <Pressable
          style={buttons.questionBtnSolid}
          onPress={() => {
            answerChecker(guessArray[0]);
          }}
        >
          <Text style={textStyles.oxygenRegDark14}>{guessArray[0]}</Text>
        </Pressable>
        <Pressable
          style={buttons.questionBtnSolid}
          onPress={() => {
            answerChecker(guessArray[1]);
          }}
        >
          <Text style={textStyles.oxygenRegDark14}>{guessArray[1]}</Text>
        </Pressable>
        <Pressable
          style={buttons.questionBtnSolid}
          onPress={() => {
            answerChecker(guessArray[2]);
          }}
        >
          <Text style={textStyles.oxygenRegDark14}>{guessArray[2]}</Text>
        </Pressable>
      </View>
    );
  }
};
