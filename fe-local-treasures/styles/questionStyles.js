import { StyleSheet } from "react-native";

const questionStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  controls: { marginTop: 40, marginBottom: 200 },

  flagContainer: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    width: 300,
    height: 150,
  },
});

export { questionStyles };
