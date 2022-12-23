import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1C3337",
  },

  title: {
    color: "#d5e1ed",
    fontSize: 42,
    // fontFamily: "American Typewriter",
  },

  subtitle: {
    color: "#ccdef0",
    fontSize: 20,
    // fontFamily: "American Typewriter",
  },

  treasuremap: {
    resizeMode: "contain",
    height: 180,
    width: 180,
    margin: 30,
    // borderRadius: "100%",
    backgroundColor: "white",
  },

  button: {
    paddingVertical: 12,
    marginVertical: 10,
    width: "70%",
    // borderRadius: 50,
    backgroundColor: "#EAAA00",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
});

export { styles };
