import { StyleSheet } from "react-native";

const buttons = StyleSheet.create({
  purpleBtnSolid: {
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "#835980",
    justifyContent: "center",
  },

  purpleBtnBorder: {
    borderColor: "#835980",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 60,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  mustardBtnSolid: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "#EAAA00",
    justifyContent: "center",
  },

  questionBtnSolid: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    width: 200,
    marginVertical: 12,
    borderRadius: 50,
    backgroundColor: "#EAAA00",
    justifyContent: "center",
  },

  correctBtnSolid: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "green",
    justifyContent: "center",
  },

  incorrectBtnSolid: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "grey",
    justifyContent: "center",
  },
  exitBtnSolid: {
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "#B43D50",
    justifyContent: "center",
    width: 60,
  },
  mapCallout: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginVertical: 5,
    borderRadius: 50,
    backgroundColor: "#EAAA00",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export { buttons };
