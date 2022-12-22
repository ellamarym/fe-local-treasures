import { useEffect, useState } from "react"
import { Button, Text } from "react-native-elements"
import { fetchHunts } from "../utils/api/huntApi"
import { DataTable } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";

export const HuntsTable = ({navigation})=> {
    const [hunts, setHunts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        fetchHunts().then((hunts)=> {
            setHunts(hunts);
            setIsLoading(false);
        })
    },[])

    const huntRows = ()=> {
        
        return hunts.map((hunt)=> {
           
       return <DataTable.Row>
          <DataTable.Cell >{hunt.title}</DataTable.Cell>
          <DataTable.Cell>{hunt.location}</DataTable.Cell>
          <DataTable.Cell>{hunt.distance}</DataTable.Cell>
          <DataTable.Cell onPress={()=> {navigation.navigate("Hunt", {id: hunt.title,
              title: hunt.title,
              location: hunt.location,
              distance: hunt.distance})}}><Icon name="arrow-right" ></Icon></DataTable.Cell>
        </DataTable.Row>
       
       
        })
        
    }

    return (
       <View>
          <Button title="Open hunts on map" onPress={() => {navigation.navigate("Map")}}/>
    <DataTable >
        <DataTable.Header >
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title>Location</DataTable.Title>
          <DataTable.Title>Distance</DataTable.Title> 
          <DataTable.Title></DataTable.Title>
    </DataTable.Header>
        

        
        {isLoading ? null : huntRows()}
        
      </DataTable></View>)
}