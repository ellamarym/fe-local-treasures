import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import HuntScreen from "../screens/Hunt";
import { HuntsTable } from "../screens/HuntsTable";
import MapScreen from "../screens/Map";

const Stack = createStackNavigator();

export default function HuntStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="List" component={HuntsTable} />
      <Stack.Screen name="Hunt" component={HuntScreen} />
    </Stack.Navigator>
  );
}
