import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { getAllCapitals } from "./api/huntApi";
import { textStyles } from "../styles/textStyles";
import { SvgUri } from "react-native-svg";
import { buttons } from "../styles/buttons";
import { questionStyles } from "../styles/questionStyles";
import { formatTime } from "./formatTime";

export const FlagQuestions = ({
  totalCheckpoints,
  currentCheckpoint,
  setCurrentCheckpoint,
  setIsActive,
  distance,
  seconds,
  navigation,
  radius,
}) => {
  const [correctAnswerGiven, setCorrectAnswerGiven] = useState(false);
  const [answerGiven, setAnswerGiven] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [totalGameTime, setTotalGameTime] = useState(null);
  const [number, setNumber] = useState(0);
  const [random1, setRandom1] = useState(0);
  const [random2, setRandom2] = useState(0);
  const [allCapitals, setAllCapitals] = useState([]);

  useEffect(() => {
    getAllCapitals().then((capitals) => {
      setAllCapitals(capitals);
    });
  }, []);

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 250));
    setRandom1(Math.floor(Math.random() * 250));
    setRandom2(Math.floor(Math.random() * 250));
  }, [answerGiven]);

  const capitals = allCapitals.map((country) => {
    return country.capital;
  });
  const countries = allCapitals.map((country) => {
    return country.name;
  });

  let multipleChoice = [
    countries[number],
    countries[random1],
    countries[random2],
  ];

  multipleChoice.sort();

  const answerChecker = (answer) => {
    setAnswerGiven(true);
    if (answer === countries[number]) {
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
      setTotalGameTime(seconds);
    }
  }, [currentCheckpoint]);

  if (!distance) {
    return (
      <View>
        <Text style={textStyles.oxygenRegLight18}>Loading...</Text>
      </View>
    );
  }

  if (isGameOver) {
    return (
      <View>
        <Text style={textStyles.oxygenBoldLight32}>Congratulations</Text>
        <Text style={textStyles.oxygenRegLight24}>
          You won in {formatTime(totalGameTime)}
        </Text>
        <Pressable
          style={buttons.mustardBtnSolid}
          onPress={() => {
            navigation.navigate("Map");
          }}
        >
          <Text style={textStyles.oxygenRegDark16}>{"View Map"}</Text>
        </Pressable>
      </View>
    );
  }

  if (distance > radius) {
    return (
      <View>
        <Text style={textStyles.oxygenRegLight18}>
          Continue to the next checkpoint
        </Text>
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
      <View style={[questionStyles.container, questionStyles.glowProp]}>
        <Text style={questionStyles.questionTextCenter}>
          <Text style={questionStyles.questionTextCapital}>
            {capitals[number]}
          </Text>
          <Text style={questionStyles.questionText}>
            {" "}
            is the capital of which country?
          </Text>
        </Text>

        <Pressable
          style={buttons.questionBtnSolid}
          onPress={() => {
            answerChecker(multipleChoice[0]);
          }}
        >
          <Text style={textStyles.oxygenRegDark14}>{multipleChoice[0]}</Text>
        </Pressable>
        <Pressable
          style={buttons.questionBtnSolid}
          onPress={() => {
            answerChecker(multipleChoice[1]);
          }}
        >
          <Text style={textStyles.oxygenRegDark14}>{multipleChoice[1]}</Text>
        </Pressable>
        <Pressable
          style={buttons.questionBtnSolid}
          onPress={() => {
            answerChecker(multipleChoice[2]);
          }}
        >
          <Text style={textStyles.oxygenRegDark14}>{multipleChoice[2]}</Text>
        </Pressable>
      </View>
    );
  }
};
