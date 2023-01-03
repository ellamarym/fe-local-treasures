import "./config/firebase";
import RootNavigation from "./navigation";
import { ThemeProvider } from "react-native-elements";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
let customFonts = {
  AmericanTypewriter: require("./assets/fonts/AmericanTypewriter.ttf"),
  OxygenLight: require("./assets/fonts/Oxygen-Light.ttf"),
  OxygenReg: require("./assets/fonts/Oxygen-Regular.ttf"),
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
