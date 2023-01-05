import { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { Pressable, View, Text } from "react-native";
import { styles } from "../styles/huntsTable";
import { globalStyles } from "../styles/globalStyles";
import { textStyles } from "../styles/textStyles";
import { fetchStatsByUser } from "../utils/api/huntApi";


export const UserStatsTable = ()=> {
    const [userStats, setUserStats] = useState([])
    const [isLoading, setIsLoading] = useState(true);

useEffect(()=>{
    fetchStatsByUser('ernie').then((stats)=> {
        setUserStats(stats)
        setIsLoading(false)
    })
},[])

const stats = () => {
    return (
    userStats.map((stat) => {
    return (
    <DataTable.Row key={stat.id}>
          <DataTable.Cell style={styles.widthThree}>
            <Text style={textStyles.oxygenRegLight14}>{stat.hunt}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.widthTwo}>
            <Text style={textStyles.oxygenRegLight14}>{stat.time}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.widthOne}>
            <Text style={textStyles.oxygenRegLight14}>{stat.date}</Text>
          </DataTable.Cell>

          
        </DataTable.Row>)
}))}
return (
    <View style={globalStyles.container} >
    <View><Text>Hello</Text></View>
    <DataTable>
        <DataTable.Header>
            <DataTable.Title color={'white'}>Hunt</DataTable.Title>
            <DataTable.Title color={'white'}>Time</DataTable.Title>
            <DataTable.Title color={'white'}>Date</DataTable.Title>
        </DataTable.Header>
        {stats()}
    </DataTable>
    </View>
)

}