import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  switchButton: {
    padding: 12,
    margin: 20,
    borderRadius: 50,
    backgroundColor: "#EAAA00",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  switchButtonView: {
    position: "absolute",
    bottom: "0%",
    alignSelf: "center",
  },
  switchButtonCenter: {
    position: "absolute",
    bottom: "40%",
    alignSelf: "center",
  },
});

export { globalStyles };
