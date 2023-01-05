import { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { Pressable, View, Text } from "react-native";
import { styles } from "../styles/huntsTable";
import { globalStyles } from "../styles/globalStyles";
import { textStyles } from "../styles/textStyles";
import { fetchStatsByUser } from "../utils/api/huntApi";
import { formatTime } from "../utils/formatTime";

export const UserStatsTable = () => {
  const [userStats, setUserStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStatsByUser("ernie").then((stats) => {
      setUserStats(stats);
      setIsLoading(false);
    });
  }, []);

  const stats = () => {
    return userStats.map((stat) => {
      return (
        <DataTable.Row key={stat.id}>
          <DataTable.Cell style={styles.widthTwo}>
            <Text style={textStyles.oxygenRegLight14}>{stat.hunt}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.widthOneAlignRight}>
            <Text style={textStyles.oxygenRegLight14}>
              {formatTime(stat.time)}
            </Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.widthTwoAlignCenter}>
            <Text style={textStyles.oxygenRegLight14}>{stat.date}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      );
    });
  };
  return (
    <View style={globalStyles.container}>
      <View>
        <Text>
          <Text style={textStyles.oxygenBoldLight24}>Your hunt stats </Text>
          <Text style={textStyles.oxygenRegLight14}>(smashed it...)</Text>
        </Text>
      </View>
      <View height={20}></View>
      <DataTable>
        <DataTable.Header style={styles.headerRow}>
          <DataTable.Title style={styles.widthTwo}>
            <Text style={textStyles.oxygenBoldLight14}>Hunt</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.widthOneAlignRight}>
            <Text style={textStyles.oxygenBoldLight14}>Time</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.widthTwoAlignCenter}>
            <Text style={textStyles.oxygenBoldLight14}>Date</Text>
          </DataTable.Title>
        </DataTable.Header>
        {stats()}
      </DataTable>
    </View>
  );
};
