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
});

export { buttons };
