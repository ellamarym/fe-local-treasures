import { useEffect, useState } from "react";
import { fetchHunts } from "../utils/api/huntApi";
import { DataTable } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { Pressable, View, Text } from "react-native";
import { styles } from "../styles/huntsTable";
import { globalStyles } from "../styles/globalStyles";
import { textStyles } from "../styles/textStyles";

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
          <DataTable.Cell style={styles.widthThree}>
            <Text style={textStyles.oxygenRegLight14}>{hunt.title}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.widthTwo}>
            <Text style={textStyles.oxygenRegLight14}>{hunt.location}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.widthOne}>
            <Text style={textStyles.oxygenRegLight14}>{hunt.distance}</Text>
          </DataTable.Cell>

          <DataTable.Cell
            style={styles.widthOne}
            onPress={() => {
              navigation.navigate("Hunt", {
                id: hunt.id,
              });
            }}
          >
            <Icon
              style={styles.arrow}
              name="arrow-circle-right"
              size={16}
            ></Icon>
          </DataTable.Cell>
        </DataTable.Row>
      );
    });
  };

  return (
    <View style={styles.view}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.widthThree}>
            <Text style={textStyles.oxygenRegLight14}>Title</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.widthTwo}>
            <Text style={textStyles.oxygenRegLight14}>Location</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.widthOne}>
            <Text style={textStyles.oxygenRegLight14}>Distance</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.widthOne}></DataTable.Title>
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
