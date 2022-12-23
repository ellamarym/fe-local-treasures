import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  switchButton: {
    padding: 12,
    margin: 8,
    borderRadius: 50,
    backgroundColor: "#EAAA00",
    alignItems: "center",
    justifyContent: "center",
  },
  switchButtonView: {
    position: "absolute",
    bottom: "0%",
    alignSelf: "flex-end",
  },
});

export { globalStyles };
