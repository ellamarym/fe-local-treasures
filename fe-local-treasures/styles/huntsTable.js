import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  view: { height: "100%" },
  calloutIcon: {
    margin: 5,
  },

  headerRow: {
    backgroundColor: "rgba(231,238,245,0.2)",
  },

  widthOne: {
    flex: 1,
    justifyContent: "center",
  },
  widthTwo: { flex: 2 },
  widthOneAlignRight: { flex: 1, justifyContent: "flex-end" },
  widthTwoAlignCenter: { flex: 2, justifyContent: "center" },
  widthThree: { flex: 3 },
  arrow: {
    color: "#EAAA00",
    fontSize: 18,
  },
});
export { styles };
