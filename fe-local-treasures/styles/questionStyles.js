import { StyleSheet } from "react-native";

const questionStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    backgroundColor: "#efefef",
    borderRadius: 10,
    borderColor: "f5f8fb",
  },

  glowProp: {
    shadowColor: "#A3AD8B",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  questionTextCenter: {
    textAlign: "center",
  },

  questionTextCapital: {
    fontFamily: "OxygenBold",
    color: "#000",
    fontSize: 18,
    alignSelf: "center",
    paddingBottom: 30,
    textDecorationLine: "underline",
  },
  questionText: {
    fontFamily: "OxygenBold",
    color: "#000",
    fontSize: 18,
    alignSelf: "center",
    paddingBottom: 30,
    textAlign: "center",
  },
});

export { questionStyles };
