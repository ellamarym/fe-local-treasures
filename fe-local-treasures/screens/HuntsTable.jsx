import { useEffect, useState } from "react";
import { fetchHunts } from "../utils/api/huntApi";
import { DataTable } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { Pressable, View, Text } from "react-native";
import { styles } from "../styles/huntsTable";
import { globalStyles } from "../styles/globalStyles";

export const HuntsTable = ({ navigation }) => {
  const [hunts, setHunts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHunts().then((hunts) => {
      setHunts(hunts);
      setIsLoading(false);
    });
  }, []);

  const huntRows = () => {
    return hunts.map((hunt) => {
      return (
        <DataTable.Row key={hunt.id}>
          <DataTable.Cell>{hunt.title}</DataTable.Cell>
          <DataTable.Cell>{hunt.location}</DataTable.Cell>
          <DataTable.Cell>{hunt.distance}</DataTable.Cell>
          <DataTable.Cell
            onPress={() => {
              navigation.navigate("Hunt", {
                id: hunt.id,
              });
            }}
          >
            <Icon name="arrow-right"></Icon>
          </DataTable.Cell>
        </DataTable.Row>
      );
    });
  };

  return (
    <View style={styles.view}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title>Location</DataTable.Title>
          <DataTable.Title>Distance</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>

        {isLoading ? null : huntRows()}
      </DataTable>
      <View style={globalStyles.switchButtonView}>
        <Pressable
          style={globalStyles.switchButton}
          onPress={() => {
            navigation.navigate("Map");
          }}
        >
          <Text>View Map</Text>
          <Icon name="map" style={styles.calloutIcon}></Icon>
        </Pressable>
      </View>
    </View>
  );
};
