import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  controls: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    paddingTop: 60,
  },
  control: {
    marginTop: 10,
    marginBottom: 20,
  },
  btnUplodImg: {
    marginTop: 10,
    backgroundColor: "#D3D3D3",
  },
  textCenter: {
    alignItems: "center",
  },
  inProgress: {
    color: "#FFA500",
  },
  done: {
    color: "#00FF00",
  },
});

export { styles };
