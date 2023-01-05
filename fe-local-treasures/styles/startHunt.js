import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
  },
  map: {
    width: "100%",
    height: 400,
  },
  callout: {
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  calloutIcon: {
    margin: 5,
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
    width: "30%",
  },
});
export { styles };
